const mongoose = require("mongoose");

const { toJSON, paginate } = require("./plugins");

const bannerSchema = mongoose.Schema(
  {
    uri: {
      type: String,
      required: true,
      trim: true,
    },
    position: Number,
    isHidden: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

// Add plugin that converts mongoose to json
bannerSchema.plugin(toJSON);
bannerSchema.plugin(paginate);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
