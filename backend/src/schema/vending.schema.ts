import * as mongoose from 'mongoose';

export const VendingSchema = new mongoose.Schema({
  location: String,
  id: String,
  name: String,
  image: String,
  price: String,
  quantity: {
    remaining: Number,
    total: Number,
  },
});
