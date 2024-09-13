// src/users/schemas/user.schema.ts
/*import { Schema, Document } from 'mongoose';
import * as validator from 'validator';

export const UserSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: [validator.isEmail, 'Invalid email address'] 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: [6, 'Password too short'] 
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
  },
  role: { 
    type: String, 
    enum: ['Admin', 'Seller', 'Buyer'], 
    required: true 
  },
}, {
  timestamps: true,
});

// No password hashing or comparison method
export interface User extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
}

export type UserDocument = User;
*/
// src/users/schemas/user.schema.ts
// src/users/schemas/user.schema.ts
import { Schema, Document } from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: [validator.isEmail, 'Invalid email address'] 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: [6, 'Password too short'] 
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
  },
  role: { 
    type: String, 
    enum: ['Admin', 'Seller', 'Buyer'], 
    required: true 
  },
}, {
  timestamps: true,
});

// Add a method to compare passwords
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  console.log(password,this.password)
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export interface User extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = User;
