import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCodesComponent } from './verify-codes.component';

describe('VerifyCodesComponent', () => {
  let component: VerifyCodesComponent;
  let fixture: ComponentFixture<VerifyCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyCodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
