import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, SelectMultipleControlValueAccessor, Validators } from '@angular/forms';
import { PropertyService } from '../property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss'],
})
export class PropertyFormComponent implements OnInit {
  propertyForm: FormGroup;
  propertyData: any;
  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<PropertyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.propertyForm = this.fb.group({
      proprtyType: [data ? data.proprtyType : '', Validators.required],
      area: [data ? data.area : '', Validators.required],
      location: [data ? data?.location : '', Validators.required],
      bedrooms: [data ? data?.bedrooms : '', Validators.required],
      bathrooms: [data ? data?.bathrooms : '', Validators.required],
      hospitalsNearByKM: [data ? data?.hospitalsNearByKM : ''],
      collegesNearByKM: [data ? data?.collegesNearByKM : ''],
      likes:[data?data?.likes:''],
      sellerEmail: localStorage.getItem('UserEmail'),
    });
  }

  // onSubmit() {
  //   if (this.propertyForm.valid && !this.propertyData) {
  //     this.propertyService.addProperty(this.propertyForm.value).subscribe(
  //       (response) => {
  //         this.router.navigate(['/properties']);
  //       },
  //       (error) => {
  //         console.error('Failed to add property', error);
  //       }
  //     );
  //   } else {
  //     this.propertyService
  //       .updateProperty(this.propertyData?._id, this.propertyForm)
  //       .subscribe(() => {
  //         this.router.navigate(['/properties']);
  //       });
  //   }
  // }
  onSubmit(): void {
    if (this.propertyForm.valid) {
      this.dialogRef.close(this.propertyForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
   // this.propertyForm = this.data;
    console.log("this.data", this.data);
  }
}
