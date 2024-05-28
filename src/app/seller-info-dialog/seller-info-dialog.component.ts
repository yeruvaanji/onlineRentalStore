import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-seller-info-dialog',
  templateUrl: './seller-info-dialog.component.html',
  styleUrls: ['./seller-info-dialog.component.scss'],
})
export class SellerInfoDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
