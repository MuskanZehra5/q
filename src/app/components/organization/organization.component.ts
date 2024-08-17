import { Component, OnInit } from '@angular/core';
import { QrcodeService } from '../../services/Qrcode/qrcode.service';
import { Qrcode } from '../../models/qrcode.model';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  uniqueOrganizations: string[] = [];
  Qrcodes?: Qrcode[];
  selectedOrganization: string = '';

  constructor(private qrcodeService: QrcodeService) { }

  ngOnInit(): void {
    this.getUniqueOrganizations();
  }

  setOrganization(organization: string): void {
    this.selectedOrganization = organization;
  }

  getUniqueOrganizations(): void {
    this.qrcodeService.getUniqueOrganizationNames()
      .subscribe(organizations => {
        this.uniqueOrganizations = organizations;
      });
  }

  generateExcelFile(organization: string): void {
    this.setOrganization(organization)
    if (this.selectedOrganization !== '') {
      this.qrcodeService.searchByOrganization(this.selectedOrganization.trim()).subscribe(
        (results) => {
          this.Qrcodes = results;

          if (this.Qrcodes && this.Qrcodes.length > 0) {
            const data = this.Qrcodes.map(qr => [qr.message]);

            console.log('data',data);

            const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'QR Codes');

            // Convert the workbook to an array buffer
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, (this.selectedOrganization ?? 'qrcodes').toLowerCase() + '.xlsx');
            
            console.log('Download successful');
          } else {
            console.error('No QR codes found to export.');
          }
        },
        (error) => {
          console.error('Error searching by organization:', error);
          this.Qrcodes = [];
        }
      );
    } else {
      console.error('No organization selected.');
    }
  }
}
