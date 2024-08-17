import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Seku QrCode Verification';

  ngOnInit() {
    // Initial check to show the footer if needed
    this.showFooter();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showFooter();
  }

  @HostListener('window:mouseleave', [])
  onMouseLeave() {
    this.hideFooter();
  }

  showFooter() {
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.classList.add('show');
    }
  }

  hideFooter() {
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.classList.remove('show');
    }
  }
}
