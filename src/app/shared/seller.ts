export interface Seller {
   $key: string;
   name: string;
   mobileNumber: Number;
   products: [{
      name: string;
      category: string;
      quantity: number;
      balance: number;
      sellingPrice: number;
      buyingPrice: number;
   }]
}