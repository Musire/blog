import { Schema, models, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 300,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);


export default models.Post || model("Post", PostSchema);
