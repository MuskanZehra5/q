import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQrcodeComponent } from './add-qrcode.component';

describe('AddQrcodeComponent', () => {
  let component: AddQrcodeComponent;
  let fixture: ComponentFixture<AddQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddQrcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
