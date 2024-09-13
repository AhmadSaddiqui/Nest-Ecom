// src/sellers/schemas/seller.schema.ts
/*import { Schema, Document } from 'mongoose';
import  * as bcrypt from 'bcrypt'

export const SellerSchema = new Schema({
  // userId: { 
   // type: Schema.Types.ObjectId, 
    //ref: 'User', 
    //required: true 
  //},
 
  shopName: { 
    type: String, 
    required: true, 
    minlength: [3, 'Shop name too short'], 
    maxlength: [100, 'Shop name too long']
  },
  shopDescription: { 
    type: String, 
    maxlength: [500, 'Shop description too long'] 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  }
}, {
  timestamps: true, 
});
SellerSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  console.log(password,this.password)
  return bcrypt.compare(password, this.password);
};

SellerSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
export interface Seller extends Document {
  userId: Schema.Types.ObjectId;
  shopName: string;
  shopDescription?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}
*/
import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const SellerSchema = new Schema({
  role: { type: String, required: true }, // Ensure role is included
  shopName: { 
    type: String, 
    required: true, 
    minlength: [3, 'Shop name too short'], 
    maxlength: [100, 'Shop name too long']
  },
  shopDescription: { 
    type: String, 
    maxlength: [500, 'Shop description too long'] 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  }
}, {
  timestamps: true, 
});

// Hash the password before saving it to the database
SellerSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare hashed passwords
SellerSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export interface Seller extends Document {
  shopName: string;
  shopDescription?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string; // Ensure role is included
  comparePassword(password: string): Promise<boolean>;
}
