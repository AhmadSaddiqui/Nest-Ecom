// src/products/schemas/product.schema.ts
import { Schema, Document } from 'mongoose';

export const ProductSchema = new Schema({
  sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  name: { 
    type: String, 
    required: true 
  },
  description: { type: String },
  price: { 
    type: Number, 
    required: true, 
    min: [0, 'Price must be a positive number'] 
  },
  stock: { 
    type: Number, 
    required: true, 
    min: [0, 'Stock must be a non-negative number'] 
  },
  category: { 
    type: String, 
    enum: ['Electronics', 'Clothing', 'Books', 'Home'], // Example categories
  },
  image: { type: String },
}, {
  timestamps: true,
});

export interface Product extends Document {
  sellerId: Schema.Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  image?: string;
}
