import mongoose, { Schema } from "mongoose";

export interface IUser {
  username: string;
  passwordHash: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
