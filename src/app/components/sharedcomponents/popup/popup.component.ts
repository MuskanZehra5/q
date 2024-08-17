import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() showPopup: boolean = false;
  @Input() title: string = '';
  @Input() color: string = '';
  @Input() backgroundcolor: string = '';
  
  closePopup() {
    this.showPopup = false;
  }
}
