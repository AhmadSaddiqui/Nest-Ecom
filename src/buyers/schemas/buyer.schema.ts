// src/buyers/schemas/buyer.schema.ts
/*import { Schema, Document } from 'mongoose';

export const BuyerSchema = new Schema({
  //userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: false },  // Optional field
  phoneNumber: { 
    type: String,
    required: false,  // Optional field
    validate: {
      validator: (v: string) => /^[0-9]{10}$/.test(v),
      message: 'Invalid phone number format. It should be 10 digits long.'
    }
  },
}, {
  timestamps: true,
});

export interface Buyer extends Document {
  userId: Schema.Types.ObjectId;
  address?: string;
  phoneNumber?: string;
}
*/
import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const BuyerSchema = new Schema({
  role: { type: String, required: true }, // Ensure role is included
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  firstname: { 
    type: String, 
    required: true, 
    
  },
  lastname: { 
    type: String, 
    required: true, 
    
  },
  username: { 
    type: String, 
    required: true, 
    unique : true
    
  },
  
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  address: { 
    type: String, 
    required: false 
  },  // Optional field
  phoneNumber: { 
    type: String, 
    required: false,  // Optional field
    validate: {
      validator: (v: string) => /^[0-9]{10}$/.test(v),
      message: 'Invalid phone number format. It should be 10 digits long.'
    }
  }
}, {
  timestamps: true,
});

// Hash password before saving
BuyerSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare entered password with the stored hashed password
BuyerSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export interface Buyer extends Document {
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  role: string; // Ensure role is included

  
  comparePassword(password: string): Promise<boolean>;
}
