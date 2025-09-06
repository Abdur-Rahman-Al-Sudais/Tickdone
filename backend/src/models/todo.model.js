import { model, Schema } from "mongoose";

const todoSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Todo Content is required"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
  },
  { timestamps: true }
);

export const Todo = model("Todo", todoSchema);
