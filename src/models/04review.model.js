const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const { toJSON, paginate } = require("./plugins");

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    idNews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

// Add plugin that converts mongoose to json
reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);
reviewSchema.plugin(slug);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
