import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { QrcodeService } from '../../services/Qrcode/qrcode.service';
import { Qrcode } from '../../models/qrcode.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-codes',
  templateUrl: './verify-codes.component.html',
  styleUrls: ['./verify-codes.component.css']
})
export class VerifyCodesComponent implements OnInit {
  key: string = '';
  searchResults?: Qrcode | null;
  keyExists: boolean = false;
  title: string = "";
  show: boolean = false;
  alertClass = 'alert-info';
  animationClass: string = '';

  @Output() searchByKey: EventEmitter<string> = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private QrcodeService: QrcodeService) { }

  ngOnInit(): void {
    // Get the 'code' parameter from the URL
    this.route.queryParams.subscribe(params => {
      const codeFromUrl = params['code'] || '';  // Get the code from the URL
      if (codeFromUrl) {
        this.key = codeFromUrl;
        // Set the value of the textbox with ID 'search'
        const searchTextbox = document.getElementById('search') as HTMLInputElement;
        if (searchTextbox) {
          searchTextbox.value = this.key;
        }
      }
    });
  }

  onSearchByKey(): void {
    this.show = true;
    this.animationClass = 'slide-in';
    if (this.key.trim() !== '') {
      this.QrcodeService.searchByKey(this.key.trim()).subscribe(
        (results) => {
          this.keyExists = results != null && results != undefined;
          this.searchResults = results;
          this.updateOpened();
          this.updateTitle();
        },
        (error) => {
          console.error('Error searching by key:', error);
          this.searchResults = {};
          this.keyExists = false;
        }
      );
    } else {
      this.searchResults = {};
      this.keyExists = false;
    }
  }

  updateOpened(): void {
    const data = {
      opened: (this.searchResults?.opened ?? 0) + 1,
    }
    if (this.searchResults?.key) {
      this.QrcodeService.update(this.searchResults.key, data)
        .catch(err => console.log(err));
    }
  }

  updateTitle(): void {
      switch(this.searchResults?.opened) {
        case 0:
          this.title = "This Product is Original";
          this.alertClass = "alert-primary";
          break;
        case 1:
          this.title = `Verified once`;
          this.alertClass = "alert-info";
          break;
        case 2:
          this.title = `Verified twice`;
          this.alertClass = "alert-secondary";
          break;
        default:
          this.title = "The maximum number of verifications for this code has been reached";
          this.alertClass = "alert-warning";
          break;
      }
    }
}
