import { AngularFirestore } from "@angular/fire/firestore";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CrudService } from "../shared/crud.service";
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from "@angular/common"; // Location service is used to go back to previous component
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-seller",
  templateUrl: "./edit-seller.component.html",
  styleUrls: ["./edit-seller.component.css"],
})
export class EditSellerComponent implements OnInit {
  editForm: FormGroup; // Define FormGroup to seller's edit form
  preLoader: boolean;

  constructor(
    private crudApi: CrudService, // Inject CRUD API in constructor
    private fb: FormBuilder, // Inject Form Builder service for Reactive forms
    private location: Location, // Location service to go back to previous component
    private actRoute: ActivatedRoute, // Activated route to get the current component's inforamation
    private router: Router, // Router service to navigate to specific component
    private toastr: ToastrService, // Toastr service for alert message
    private store: AngularFirestore
  ) {}

  async ngOnInit() {
    this.preLoader = true;
    this.updateSellerData(); // Call updateSellerData() as soon as the component is ready
    const id = this.actRoute.snapshot.paramMap.get("id"); // Getting current component's id or information using ActivatedRoute service
    const sellerObj = await this.crudApi.getItemById("seller", id);
    const productsObj = await this.store
      .collection("seller")
      .doc(id)
      .collection("products")
      .get();
    let products = [];
    productsObj.subscribe((data) => {
      data.forEach((item) => {
        let a = item.data();
        a["$key"] = item.id;
        delete a.createdOn;
        products.push(a);
      });
      products.forEach((it) => this.addProduct());
      const seller = sellerObj.data();
      delete seller.createdOn;
      this.editForm.setValue({ ...seller, products });
      this.preLoader = false;
    });
    //          // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
  }

  // Accessing form control using getters
  get name() {
    return this.editForm.get("name");
  }

  get mobileNumber() {
    return this.editForm.get("mobileNumber");
  }

  get productsForms() {
    return this.editForm.get("products") as FormArray;
  }

  addProduct() {
    const products = this.fb.group({
      productName: ["", [Validators.required, Validators.minLength(2)]],
      category: [""],
      quantity: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      balance: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      sellingPrice: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      buyingPrice: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      $key: []
    });

    this.productsForms.push(products);
  }

  deleteProduct(i) {
    this.productsForms.removeAt(i);
  }

  // Contains Reactive Form logic
  updateSellerData() {
    this.editForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      mobileNumber: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      products: this.fb.array([]),
    });
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    this.crudApi.updateItem("seller", this.editForm.value); // Update seller data using CRUD API
    this.toastr.success(
      this.editForm.controls["name"].value + " updated successfully"
    ); // Show succes message when data is successfully submited
    this.router.navigate(["view-sellers"]); // Navigate to seller's list page when seller data is updated
  }
}
