import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { QrcodeService } from '../../services/Qrcode/qrcode.service';
import { Qrcode } from '../../models/qrcode.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-fetchcodes',
  templateUrl: './fetchcodes.component.html',
  styleUrl: './fetchcodes.component.css'
})
export class FetchcodesComponent implements OnInit, OnChanges {
  @Input() organization: string = ''; 
  Qrcodes?: Qrcode[];
  currentQrcode?: Qrcode;
  currentIndex = -1;
  title = '';
  show: boolean = false;
  isLoading: boolean = false;

  constructor(private QrcodeService: QrcodeService) { }

  ngOnInit(): void {
    this.retrieveQrcodes();
  }

  ngOnChanges(): void {
      this.retrieveQrcodes();
  }

  refreshList(): void {
    this.currentQrcode = undefined;
    this.currentIndex = -1;
    this.retrieveQrcodes();
  }

  onSearchByOrganization(): void {
    this.show = true;
    if (this.organization !== '') {
      this.QrcodeService.searchByOrganization(this.organization.trim()).subscribe(
        (results) => {
          this.Qrcodes = results;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error searching by organization:', error);
          this.Qrcodes = [];
          this.isLoading = false;
        }
      );
    } else {
      this.Qrcodes = [];
      this.isLoading = false;
    }
  }

  retrieveAllQrcodes(): void {
    this.isLoading = true;
    this.QrcodeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const key = c.payload.key || 'no id'; // Use empty string as default if key is null
          return { key, ...c.payload.val() };
        })
      )
    ).subscribe(data => {
      this.Qrcodes = data;
      this.isLoading = false;
    });
  }

  retrieveQrcodes(): void {
    if (!this.organization) {
      this.retrieveAllQrcodes();
      return; 
    }
    else{
      this.onSearchByOrganization();
    }
  }
  
}
