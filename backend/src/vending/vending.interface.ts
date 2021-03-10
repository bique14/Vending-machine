import { Document } from 'mongoose';

export interface Vending extends Document {
  readonly location: String;
  readonly id: String;
  readonly name: String;
  readonly image: String;
  readonly price: String;
  readonly quantity: {
    readonly remaining: Number;
    readonly total: Number;
  };
}
