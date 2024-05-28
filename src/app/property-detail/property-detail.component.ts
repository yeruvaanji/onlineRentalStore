import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../property.service';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { SellerInfoDialogComponent } from '../seller-info-dialog/seller-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent implements OnInit {
  property: any;
  isLoggedIn = false;
  filteredProperties: any[] = [];
  filterForm: any;
  usersList: any;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.loadProperties();
    this.isLoggedIn = !!localStorage.getItem('userType');
    this.filterForm = this.fb.group({
      proprtyType: [''],
      area: [''],
      location: [''],
      bedrooms: [''],
      bathrooms: [''],
      hospitalsNearByKM: [''],
      collegesNearByKM: [''],
    });
  }
  loadProperties() {
    this.propertyService.getAllProperties().subscribe(
      (data) => {
        this.property = data;
        this.filteredProperties = data;
        console.log('this.filteredProperties', this.filteredProperties);
      },
      (error) => {
        console.error('Failed to fetch property details', error);
      }
    );
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    this.filteredProperties = this.property.filter((property: any) => {
      return Object.keys(filters).every((key) => {
        return (
          !filters[key] ||
          property[key]
            .toString()
            .toLowerCase()
            .includes(filters[key].toLowerCase())
        );
      });
    });
  }
  showInterest(property: any) {
    let id,buyerDetails,sellerDetails:any;
    if (this.isLoggedIn) {
      // Logic to send email and show seller details
      this.propertyService
        .getSellerInfoByPropertyId(property?.sellerEmail)
        .subscribe((res) => {
          // this.loadProperties(id);
          console.log('result', res);
          sellerDetails = res;
          // this.propertyService.sendSellerDetailsToBuyer(res);
          this.openSellerInfoDialog(res);
          // alert(`Contact the seller at: ${res}`);
        });
      this.propertyService
        .getSellerInfoByPropertyId(localStorage.getItem('UserEmail'))
        .subscribe((res) => {
          // this.loadProperties(id);
          console.log('result', res);
          buyerDetails = res;
           this.propertyService.sendSellerDetailsToBuyer(buyerDetails,sellerDetails,property);
          // alert(`Contact the seller at: ${res}`);
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
  onLike(property: any): void {
    property.likes = (property.likes || 0) + 1;
    // Update likes count in backend
    this.propertyService.updateLikes(property?._id, property).subscribe((res) => {
      console.log("res",res)
      this.loadProperties();
    });
  }
  openSellerInfoDialog(sellerInfo: any): void {
    this.dialog.open(SellerInfoDialogComponent, {
      width: '400px',
      data: sellerInfo,
    });
  }
}
