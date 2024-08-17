import { Component, EventEmitter, Output } from '@angular/core';
import { Qrcode } from '../../models/qrcode.model';
import { QrcodeService } from '../../services/Qrcode/qrcode.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  organization: string = '';
  searchResults?: Qrcode[];
  show: boolean = false;
  showSpinner: boolean = false;

  @Output() searchByOrganization: EventEmitter<string> = new EventEmitter<string>();

  constructor(private qrcodeService: QrcodeService) { }

  onSearchByOrganization(): void {
    this.showSpinner = true;
    this.show = true;
    if (this.organization.trim() !== '') {
      this.qrcodeService.searchByOrganization(this.organization.trim()).subscribe(
        (results) => {
          this.searchResults = results;
          this.showSpinner = false;
        },
        (error) => {
          console.error('Error searching by organization:', error);
          this.searchResults = [];
          this.showSpinner = false;
        }
      );
    } else {
      this.searchResults = [];
      this.showSpinner = false;
    }
  }

  deleteQrCodesByOrganization(): void {
    this.showSpinner = true;
    this.qrcodeService.deleteAllByOrganization(this.organization)
      .then(() => {
        console.log('Deletion By Organization Successful');
        this.showSpinner = false;
      })
      .catch(err => {
        console.error('Error deleting QR codes by organization:', err);
        this.showSpinner = false;
      });
  }
}
