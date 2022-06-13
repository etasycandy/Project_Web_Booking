const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const { toJSON, paginate } = require("./plugins");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

// Add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);
categorySchema.plugin(slug);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
