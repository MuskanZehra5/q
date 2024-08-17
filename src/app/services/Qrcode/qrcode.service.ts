import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Qrcode } from '../../models/qrcode.model';
import { Observable, from, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  private dbPath = '/Qrcodes';
  QrcodesRef: AngularFireList<Qrcode>;

  constructor(private db: AngularFireDatabase) {
    this.QrcodesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Qrcode> {
    return this.QrcodesRef;
  }

  create(qrcode: Qrcode): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.QrcodesRef.push(qrcode)
        .then(ref => {
          const key = ref.key;
          if (key !== null) {
            const message = `https://sekuverify.com/verification?code=${encodeURIComponent(key)}`;
            this.update(key, { message: message })
              .then(() => resolve(key))
              .catch(error => reject(error));
          } else {
            reject(new Error('Key is null'));
          }
        })
        .catch(error => reject(error));
    });
  }

  update(key: string, value: any): Promise<void> {
    return this.QrcodesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.QrcodesRef.remove(key);
  }

  deleteAllByOrganization(organization: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.list<Qrcode>(this.dbPath, ref => ref.orderByChild('organization').equalTo(organization))
        .snapshotChanges()
        .pipe(
          take(1),
          map(changes => changes.map(c => c.payload.key)),
          catchError(error => {
            console.error('Error fetching data for deletion:', error);
            return of([]);
          })
        )
        .subscribe(keys => {
          const deletePromises = keys.map(key => key ? this.QrcodesRef.remove(key) : Promise.resolve());
          Promise.all(deletePromises)
            .then(() => resolve())
            .catch(error => reject(error));
        });
    });
  }

  deleteAll(): Promise<void> {
    return this.QrcodesRef.remove();
  }

  searchByKey(key: string): Observable<Qrcode | null> {
    return this.db.list<Qrcode>(this.dbPath, ref => ref.orderByKey().equalTo(key))
      .snapshotChanges()
      .pipe(
        take(1),
        map(changes => changes.length > 0 ? { key: changes[0].payload.key || '', ...changes[0].payload.val() } as Qrcode : null),
        catchError(error => {
          console.error('Error fetching data by key:', error);
          return of(null);
        })
      );
  }

  searchByOrganization(organization: string): Observable<Qrcode[]> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('organization').equalTo(organization))
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({
          key: c.payload.key || '',
          ...c.payload.val() as Qrcode
        }))),
        catchError(error => {
          console.error('Error fetching data by organization:', error);
          return of([]);
        })
      );
  }

  getUniqueOrganizationNames(): Observable<string[]> {
    return this.db.list<Qrcode>(this.dbPath)
      .snapshotChanges()
      .pipe(
        map(changes => {
          const organizations: string[] = [];
          changes.forEach(c => {
            const organization = (c.payload.val() as Qrcode).organization;
            if (organization && !organizations.includes(organization)) {
              organizations.push(organization);
            }
          });
          return organizations;
        }),
        catchError(error => {
          console.error('Error fetching unique organizations:', error);
          return of([]);
        })
      );
  }

  createBatch(qrcodes: Qrcode[], batchSize: number = 500, delayMs: number = 1000): Promise<void> {
    const totalBatches = Math.ceil(qrcodes.length / batchSize);
    let currentBatch = 0;

    return new Promise<void>((resolve, reject) => {
      const processBatch = () => {
        if (currentBatch >= totalBatches) {
          resolve();
          return;
        }

        const batchStart = currentBatch * batchSize;
        const batchEnd = Math.min(batchStart + batchSize, qrcodes.length);
        const batchQrcodes = qrcodes.slice(batchStart, batchEnd);

        const createPromises = batchQrcodes.map(qrcode => this.create(qrcode));
        Promise.all(createPromises)
          .then(() => {
            currentBatch++;
            setTimeout(processBatch, delayMs);
          })
          .catch(error => {
            console.error('Batch creation error:', error);
            setTimeout(processBatch, delayMs); // Continue with the next batch even if an error occurs
          });
      };

      processBatch();
    });
  }
  async fetchGeneratedQrcodes(organization: string, count: number, limit: number = 100): Promise<Qrcode[]> {
    const qrcodes: Qrcode[] = [];
    let lastKey: string | null = null;

    while (qrcodes.length < count) {
        const query = this.db.list<Qrcode>(this.dbPath, ref => {
            let queryRef = ref.orderByChild('organization').equalTo(organization);
            if (lastKey) {
                queryRef = queryRef.startAt(lastKey);
            }
            return queryRef.limitToFirst(limit);
        });

        const batch = await query.snapshotChanges().pipe(
            take(1),
            map(changes => changes.map(c => ({
                key: c.payload.key || '',
                ...c.payload.val() as Qrcode
            }))),
            catchError(error => {
                console.error('Error fetching data:', error);
                return of([]);
            })
        ).toPromise();

        // Check if batch is undefined or null
        if (!batch || batch.length === 0) {
            break;
        }

        qrcodes.push(...batch);
        lastKey = batch[batch.length - 1].key; // Set the last key for pagination

        if (qrcodes.length >= count) {
            break;
        }
    }

    return qrcodes;
}

}
