import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Seller } from '../shared/seller';  // Seller data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // Inject AngularFireDatabase Dependency in Constructor
  constructor( private db: AngularFirestore) {

   }

  // Create an Item
  addItem(collName: string, item: any) {
    return this.db.collection(collName).add({...item, createdOn: new Date()});
  }

  // Update an Item
  updateItem(collName: string, item: any) {
    return this.db.collection(collName).doc(item._id).update({...item, updatedON: new Date()});
  }

  // Fetch all Items List
  getItemsList(collName: string) {
    return this.db.collection(collName).get();
  }  

    // Fecth an Item
  getItemById(collName: string ,id: any) {
      return this.db.collection(collName).doc(id).get().toPromise();
    } 

  // Fecth an Item
  getItem(collName: string ,item: any) {
    return this.db.collection(collName).doc(item._id).get();
  }  

  // Delete an Item
  deleteItem(collName: string, item: any) { 
    return this.db.collection(collName).doc(item.$key).delete()
  }
  
}