import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeDetailsComponent } from './qrcode-details.component';

describe('QrcodeDetailsComponent', () => {
  let component: QrcodeDetailsComponent;
  let fixture: ComponentFixture<QrcodeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrcodeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrcodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
