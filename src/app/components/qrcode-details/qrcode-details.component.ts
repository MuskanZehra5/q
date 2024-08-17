import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { QrcodeService } from '../../services/Qrcode/qrcode.service';
import { Qrcode } from '../../models/qrcode.model';

@Component({
  selector: 'app-qrcode-details',
  templateUrl: './qrcode-details.component.html',
  styleUrls: ['./qrcode-details.component.css']
})
export class QrcodeDetailsComponent implements OnInit, OnChanges {
  @Input() Qrcode?: Qrcode;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentQrcode: Qrcode = {
    message: '',
    organization: '',
    creationDate: ''
  };
  message = '';

  constructor(private QrcodeService: QrcodeService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentQrcode = { ...this.Qrcode };
  }

  updateQrcode(): void {
    const data = {
      message: this.currentQrcode.message,
      organization: this.currentQrcode.organization
    };

    if (this.currentQrcode.key) {
      this.QrcodeService.update(this.currentQrcode.key, data)
        .then(() => this.message = 'The Qrcode was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteQrcode(): void {
    if (this.currentQrcode.key) {
      this.QrcodeService.delete(this.currentQrcode.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The Qrcode was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}