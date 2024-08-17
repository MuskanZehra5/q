import { Component, OnInit } from '@angular/core';
import { QrcodeService } from '../../services/Qrcode/qrcode.service';
import { Qrcode } from '../../models/qrcode.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-qrcodes-list',
  templateUrl: './qrcodes-list.component.html',
  styleUrls: ['./qrcodes-list.component.css']
})
export class QrcodesListComponent implements OnInit {
  Qrcodes?: Qrcode[];
  currentQrcode?: Qrcode;
  currentIndex = -1;
  title = '';

  constructor(private QrcodeService: QrcodeService) { }

  ngOnInit(): void {
    this.retrieveQrcodes();
  }

  refreshList(): void {
    this.currentQrcode = undefined;
    this.currentIndex = -1;
    this.retrieveQrcodes();
  }

  retrieveQrcodes(): void {
    this.QrcodeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const key = c.payload.key || ''; // Use empty string as default if key is null
          return { key, ...c.payload.val() };
        })
      )
    ).subscribe(data => {
      this.Qrcodes = data;
    });
  }
  
  setActiveQrcode(Qrcode: Qrcode, index: number): void {
    this.currentQrcode = Qrcode;
    this.currentIndex = index;
  }

  removeAllQrcodes(): void {
    this.QrcodeService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

}