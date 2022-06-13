const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const { toJSON, paginate } = require("./plugins");

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    priceOld: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
    },
    contact: {
      type: String,
    },
    address: [
      {
        type: String,
        trim: true,
      },
    ],
    phone: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    slug: {
      type: String,
      slug: "title",
      unique: true,
      lowercase: true,
      index: true,
    },
    isHidden: {
      type: Boolean,
      default: true,
    },
    isStill: {
      type: Boolean,
      default: true,
    },
    hashTags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    idCatogory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

// Add plugin that converts mongoose to json
newsSchema.plugin(toJSON);
newsSchema.plugin(paginate);
newsSchema.plugin(slug);

const News = mongoose.model("News", newsSchema);

module.exports = News;
