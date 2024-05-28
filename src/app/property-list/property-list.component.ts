import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PropertyFormComponent } from '../property-form/property-form.component';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnInit {
  properties: any;
  displayedColumns: string[] = [
    'place',
    'area',
    'location',
    'bedrooms',
    'bathrooms',
    'hospitals',
    'colleges',
    'likes',
    'actions',
  ];
  usertype: any;
  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProperties();
    this.usertype = localStorage.getItem('userType');

  }
  loadProperties() {
    this.propertyService.getAllProperties().subscribe(
      (data) => {
        this.properties = new MatTableDataSource(data);
      },
      (error) => {
        console.error('Failed to fetch properties', error);
      }
    );
  }
  deleteProperty(id: string) {
    this.propertyService.deleteProperty(id).subscribe(() => {
      this.loadProperties();
    });
  }
  editProperty(property: any) {
    // Implement edit functionality
    // this.router.navigate(['/add-property'], {
    //       queryParams: { data: property },
    //     });
    const dialogAction = this.dialog.open(PropertyFormComponent, {
      data: property,
    });
    dialogAction.afterClosed().subscribe((result) => {
      if (property && result) {
        // Update existing property
        this.updateProperty(property._id, result);
      }
    });
  }
  createNewProperty() {
    //   this.router.navigate(['/add-property'], {
    //     queryParams: { data: '' },
    //   });

    // // this.router.navigateByUrl('/add-property', {
    // //   queryParams: { data: additionalData },
    // // });
    const dialogAction = this.dialog.open(PropertyFormComponent, { data: '' });
    dialogAction.afterClosed().subscribe((result) => {
      // Add new property
      if (result) {
        this.addProperty(result);
      }
    });
  }
  updateProperty(id: any, property: any) {
    this.propertyService.updateProperty(id, property).subscribe(() => {
      this.loadProperties();
    });
  }
  addProperty(property:any) {
      this.propertyService.addProperty(property).subscribe(
        (response) => {
        this.loadProperties();
        },
        (error) => {
          console.error('Failed to add property', error);
        }
      );
  }
}
