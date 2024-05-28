import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerInfoDialogComponent } from './seller-info-dialog.component';

describe('SellerInfoDialogComponent', () => {
  let component: SellerInfoDialogComponent;
  let fixture: ComponentFixture<SellerInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
