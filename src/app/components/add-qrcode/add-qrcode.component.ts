import { Component } from '@angular/core';
import { QrcodeService } from '../../services/Qrcode/qrcode.service';
import { Qrcode } from '../../models/qrcode.model';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-qrcode',
  templateUrl: './add-qrcode.component.html',
  styleUrls: ['./add-qrcode.component.css']
})
export class AddQrcodeComponent {

  Qrcode: Qrcode = new Qrcode();
  Qrcodes: string[] = [];
  submitted = false;
  number = 1;

  constructor(private QrcodeService: QrcodeService) { }

  async saveQrcode(): Promise<void> {
    const qrcodesToCreate: Qrcode[] = [];

    for (let i = 0; i < this.number; i++) {
      const newQrcode = new Qrcode();
      const date = new Date();
      newQrcode.creationDate = date.toISOString();
      newQrcode.opened = 0;
      newQrcode.organization = this.Qrcode.organization;
      qrcodesToCreate.push(newQrcode);
    }

    try {
      await this.QrcodeService.createBatch(qrcodesToCreate);
      const generatedQrcodes = await this.QrcodeService.fetchGeneratedQrcodes(this.Qrcode.organization!, qrcodesToCreate.length);
      generatedQrcodes.forEach(qrcode => {
        this.Qrcodes.push(`${qrcode.message}`);
      });

      console.log('Created new items successfully!');
      this.generateExcelFile();
    } catch (error) {
      console.error('Error creating QR codes:', error);
    }
  }

  generateExcelFile(): void {
    const data = this.Qrcodes.map(qr => [qr]);

    console.log(data);

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'QR Codes');

    // Convert the workbook to an array buffer
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, (this.Qrcode.organization ?? 'qrcodes').toLowerCase() + '.xlsx');
  }

  newQrcode(): void {
    this.submitted = false;
    this.Qrcode = new Qrcode();
  }
}
