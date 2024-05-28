import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  apiUrl: any;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }
  getPropertiesById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + `property/${id}`);
  }

  addProperty(property: any): Observable<any> {
    console.log('property', property);
    return this.http.post<any>(this.apiUrl + '/newProperty', property);
  }

  updateProperty(id: string, property: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + `/updateProperty/${id}`, property);
  }

  deleteProperty(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteProperty/${id}`);
  }
  getAllProperties(): Observable<any> {
    return this.http.get(this.apiUrl + '/list-properties');
  }

  getSellerInfoByPropertyId(emailId: any): Observable<any> {
    console.log('emailId', emailId);
    // Use HttpParams to append the emailId as a query parameter
    let params = new HttpParams().set('email', emailId);
    return this.http.get(this.apiUrl + '/getSellerInfo', { params });
  }

  updateLikes(id: string, property: number): Observable<any> {
    return this.http.put(this.apiUrl + `/updateLike/${id}`, property);
  }

  sendSellerDetailsToBuyer(buyerData: any, sellerData:any,propertyDetails:any): void {
    const email = {
      // to: localStorage.getItem('UserEmail'), // Replace with actual buyer's email
      // from: property?.selleremail,
      // subject: 'Property Details',
      // body: `Seller details for property: ${JSON.stringify(property)}`,
      buyerName: `${buyerData.firstName},${buyerData.lastName}`,
      buyerEmail: buyerData.email,
      sellerName: `${sellerData.firstName},${sellerData.lastName}`,
      sellerEmail: sellerData.email,
      propertyDetails: propertyDetails,
    };
    this.http.post(`${this.apiUrl}/sendEmail`, email).subscribe();
  }

  // sendBuyerDetailsToSeller(property: any): void {
  //   const email = {
  //     to: property?.sellerEmail, // Replace with actual seller's email
  //     from: localStorage.getItem('UserEmail'),
  //     subject: 'Buyer Interested in Your Property',
  //     body: `Buyer is interested in your property.Below buyer details: ${JSON.stringify(property)}`,
  //   };
  //   this.http.post(`${this.apiUrl}/sendEmail`, email).subscribe();
  // }
}
