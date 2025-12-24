import { Schema, models, model } from "mongoose";

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 350,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CategorySchema.virtual("postCount", {
  ref: "Post",
  localField: "_id",
  foreignField: "category",
  count: true,
});

export default models.Category || model("Category", CategorySchema);
