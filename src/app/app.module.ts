import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AddSellerComponent } from './add-seller/add-seller.component';
import { SellersListComponent } from './sellers-list/sellers-list.component';
import { EditSellerComponent } from './edit-seller/edit-seller.component';

// Reactive Form Module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Firebase Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

// Router Module
import { AppRoutingModule } from './/app-routing.module';

// Toaster for Alert Messages
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent,
    AddSellerComponent,
    SellersListComponent,
    EditSellerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), // Main Angular fire module 
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,  // Firebase database module 
    ReactiveFormsModule,        // Reactive forms module
    AppRoutingModule,           // Main routing module
    BrowserAnimationsModule,    // Required animations module for Toastr
    ToastrModule.forRoot({      // Register NgxToast NPM module
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,      
    }),
    NgxPaginationModule  // NGX pagination module
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
