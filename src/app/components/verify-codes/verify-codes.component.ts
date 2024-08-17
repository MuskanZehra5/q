import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { QrcodeService } from '../../services/Qrcode/qrcode.service';
import { Qrcode } from '../../models/qrcode.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-codes',
  templateUrl: './verify-codes.component.html',
  styleUrl: './verify-codes.component.css'
})
export class VerifyCodesComponent{
  key: string = '';
  searchResults?: Qrcode | null;
  keyExists: boolean = false;
  title: string = "";
  show: boolean = false;
  color = '#155724';
  backgroundcolor = '#d4edda';

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
    if (this.key.trim() !== '') {
      this.QrcodeService.searchByKey(this.key.trim()).subscribe(
        (results) => {
          this.keyExists = results != null && results != undefined;
          this.searchResults = results;
          this.updateOpened();
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
  

  updateOpened(): void{
   const data ={
      opened: (this.searchResults?.opened ?? 0) + 1,
    }
    this.updateTitle()

    if (this.searchResults?.key) {
      this.QrcodeService.update(this.searchResults.key, data)
        .catch(err => console.log(err));
    }
  }

  updateTitle(): void{
    switch(this.searchResults?.opened){
      case 0:
          this.title = "This Product is Original";
          this.color = '#155724';
          this.backgroundcolor = '#d4edda';
          break;
      case 1:
          this.title = `Already Verified ${this.searchResults?.opened} time`;
          this.color = '#d4d8ed';
          this.backgroundcolor = '#151957';
          break;
      case 2: 
          this.title = `Already Verified ${this.searchResults?.opened} times`;
          this.backgroundcolor = '#edead4';
          this.color ='yellow';
          break;
      default:
        this.title = "Verified Multiple Times Can Not Verify Anymore";
        this.color = '#a10f0f';
        this.backgroundcolor = '#edd4d4';
          break;
  }
  
  }
}
