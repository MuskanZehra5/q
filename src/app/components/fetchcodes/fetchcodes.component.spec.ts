import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchcodesComponent } from './fetchcodes.component';

describe('FetchcodesComponent', () => {
  let component: FetchcodesComponent;
  let fixture: ComponentFixture<FetchcodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FetchcodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FetchcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
