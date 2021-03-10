import { Document } from 'mongoose';

export interface Vending extends Document {
  readonly location: String;
  readonly id: String;
  readonly name: String;
  readonly image: String;
  readonly price: String;
  readonly remaining: number;
  readonly total: number;
}

export interface Purchase extends Document {
  readonly _id: String;
}
