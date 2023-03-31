import { Schema, model } from "mongoose";

interface User {
  phone: string;
  password: string;
  username: string;
}

interface Seller extends User {
  items: Item[];
}

interface Transporter extends User {
  vehicles: Vehicle[];
}

interface Vehicle {
  name: string;
  weightLimit: number;
  pricePerKg: number;
  //TODO: find a way to add price wrt both weight and distance
}

interface Item {
  name: string;
  quantity: number;
  weightPerKg: number;
}

const ItemSchema = new Schema<Item>({
  name: { required: true, type: String },
  quantity: { required: true, type: Number },
  weightPerKg: { required: true, type: Number },
});

const VehicleSchema = new Schema<Vehicle>({
  name: { type: String, required: true },
  pricePerKg: { type: Number, required: true },
  weightLimit: { type: Number, required: true },
});

const userSchema = new Schema<User>(
  {
    phone: { required: true, type: String, unique: true },
    password: { required: true, type: String },
    username: { required: true, type: String },
  },
  {
    discriminatorKey: "kind",
  }
);

const sellerSchema = new Schema<Seller>(
  {
    items: { type: [ItemSchema], default: [] },
  },
  { discriminatorKey: "kind" }
);

const transporterSchema = new Schema<Transporter>(
  {
    vehicles: { type: [VehicleSchema], default: [] },
  },
  { discriminatorKey: "kind" }
);

export const USER_MODEL_NAME = "User";

const UserModel = model(USER_MODEL_NAME, userSchema);

export const SELLER_MODEL_NAME = "Seller";
export const TRANSPORTER_MODEL_NAME = "Transporter";

export const SellerModel = UserModel.discriminator(
  SELLER_MODEL_NAME,
  sellerSchema
);
export const TransporterModel = UserModel.discriminator(
  TRANSPORTER_MODEL_NAME,
  transporterSchema
);

export default UserModel;
