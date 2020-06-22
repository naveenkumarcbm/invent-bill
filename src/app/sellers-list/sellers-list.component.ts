import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  // CRUD API service class
import { Seller } from '../shared/seller';   // Seller interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr


@Component({
  selector: 'app-sellers-list',
  templateUrl: './sellers-list.component.html',
  styleUrls: ['./sellers-list.component.css']
})

export class SellersListComponent implements OnInit {
  p: number = 1;                      // Fix for AOT compilation error for NGX pagination
  Seller: Seller[];                 // Save sellers data in Seller's array.
  hideWhenNoSeller: boolean = false; // Hide sellers data table when no seller.
  noData: boolean = false;            // Showing No Seller Message, when no seller in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  

  constructor(
    public crudApi: CrudService, // Inject seller CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    ){ }


  ngOnInit() {
    this.dataState(); // Initialize seller's list, when component is ready
    this.getList();
  }

  getList() {
    let s = this.crudApi.getItemsList('seller'); 
    s.subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Seller = [];
      data.forEach(item => {
        let a = item.data()
        a['$key'] = item.id;
        this.Seller.push(a as Seller);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of sellers data. It updates the state of hideWhenNoSeller, noData & preLoader variables when any changes occurs in seller data list in real-time.
  dataState() {     
    this.crudApi.getItemsList('seller').subscribe(data => {
      this.preLoader = false;
      if(data.empty){
        this.hideWhenNoSeller = false;
        this.noData = true;
      } else {
        this.hideWhenNoSeller = true;
        this.noData = false;
      }
    })
  }

  // Method to delete seller object
  async deleteSeller(seller) {
    if (window.confirm('Are sure you want to delete this seller ?')) { // Asking from user before Deleting seller data.
      const delSeller = await this.crudApi.deleteItem('seller', seller) // Using Delete seller API to delete seller.
      this.toastr.success(seller.name + ' successfully deleted!'); // Alert message will show up when seller successfully deleted.
      this.getList();
    }
  }

}