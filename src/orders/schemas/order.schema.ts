// src/orders/schemas/order.schema.ts
import { Schema, Document } from 'mongoose';

export const OrderSchema = new Schema({
  buyerId: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },  // Added sellerId
  products: [{ 
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { 
      type: Number, 
      required: true, 
      min: [1, 'Quantity must be at least 1'] 
    }
  }],
  totalAmount: { 
    type: Number, 
    required: true, 
    min: [0, 'Total amount must be a positive number'] 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
}, {
  timestamps: true,
});

export interface Order extends Document {
  buyerId: Schema.Types.ObjectId;
  sellerId: Schema.Types.ObjectId;  // Added sellerId
  products: { productId: Schema.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  status: string;
}
