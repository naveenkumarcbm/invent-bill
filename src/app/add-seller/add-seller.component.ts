import { AngularFirestore } from "@angular/fire/firestore";
import { Component, OnInit } from "@angular/core";
import { CrudService } from "../shared/crud.service"; // CRUD services API
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms"; // Reactive form services
import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr

@Component({
  selector: "app-add-seller",
  templateUrl: "./add-seller.component.html",
  styleUrls: ["./add-seller.component.css"],
})
export class AddSellerComponent implements OnInit {
  public sellerForm: FormGroup; // Define FormGroup to seller's form

  constructor(
    public crudApi: CrudService, // CRUD API services
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService, // Toastr service for alert message
    public store: AngularFirestore
  ) {}

  ngOnInit() {
    this.crudApi.getItemsList("seller"); // Call GetSellersList() before main form is being called
    this.framsellerForm(); // Call seller form when component is ready
    this.addProduct()
  }

  // Reactive seller form
  framsellerForm() {
    this.sellerForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      mobileNumber: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      products: this.fb.array([]),
    });
  }

  // Accessing form control using getters
  get name() {
    return this.sellerForm.get("name");
  }

  get mobileNumber() {
    return this.sellerForm.get("mobileNumber");
  }

  get productsForms() {
    return this.sellerForm.get("products") as FormArray;
  }

  addProduct() {
    const products = this.fb.group({
      productName: ["", [Validators.required, Validators.minLength(2)]],
      category: [""],
      quantity: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      // balance: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      sellingPrice: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      buyingPrice: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
    });

    this.productsForms.push(products);
  }

  deleteProduct(i) {
    this.productsForms.removeAt(i);
  }

  // Reset seller form's values
  ResetForm() {
    this.sellerForm.reset();
  }

  async submitSellerData() {
    const { name, mobileNumber, products } = this.sellerForm.value;

    const record = await this.crudApi.addItem("seller", { name, mobileNumber }); // Submit seller data using CRUD API
    console.log(record);
    let prdAry = [];
    products.forEach(
      async (prd) =>{
        prd.balance = prd.quantity;
        await prdAry.push(
          this.store.collection('seller').doc(record.id).collection("products").add(prd)
        )
    });
    this.toastr.success(
      this.sellerForm.controls["name"].value + " successfully added!"
    ); // Show success message when data is successfully submited
    this.ResetForm(); // Reset form when clicked on reset button
  }
}
