import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodesListComponent } from './qrcodes-list.component';

describe('QrcodesListComponent', () => {
  let component: QrcodesListComponent;
  let fixture: ComponentFixture<QrcodesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrcodesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrcodesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
