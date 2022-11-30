import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    isCredentials: {
      type: Boolean,
    },
    password: {
      type: String,
      required: function () {
        return this.isCredentials === true;
      },
      trim: true,
    },
    emailVerified: {
      type: Date,
      default: new Date(),
    },
    image: {
      type: String,
      default: "https://i.pravatar.cc/300",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("User", UserSchema);
