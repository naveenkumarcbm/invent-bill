import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddSellerComponent } from './add-seller/add-seller.component';
import { SellersListComponent } from './sellers-list/sellers-list.component';
import { EditSellerComponent } from './edit-seller/edit-seller.component';
import { LoginComponent } from './login/login.component';

// Routes array define component along with the path name for url
const routes: Routes = [
  { path: '', redirectTo: '/register-seller', pathMatch: 'full' },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-seller', component: AddSellerComponent },
  { path: 'view-sellers', component: SellersListComponent },
  { path: 'edit-seller/:id', component: EditSellerComponent }
];

// Import RouterModule and inject routes array in it and dont forget to export the RouterModule
@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
