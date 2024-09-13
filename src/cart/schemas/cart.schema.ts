// src/cart/schemas/cart.schema.ts
import { Schema, Document } from 'mongoose';

export const CartSchema = new Schema({
  buyerId: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },  // Added sellerId
    quantity: { 
      type: Number, 
      required: true, 
      min: [1, 'Quantity must be at least 1'] 
    }
  }],
}, {
  timestamps: true,
});

export interface Cart extends Document {
  buyerId: Schema.Types.ObjectId;
  products: { 
    productId: Schema.Types.ObjectId; 
    sellerId: Schema.Types.ObjectId;  // Added sellerId
    quantity: number 
  }[];
}
