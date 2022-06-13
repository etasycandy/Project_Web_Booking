const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const bcrypt = require("bcryptjs");

const { toJSON, paginate } = require("./plugins");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email!"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      match: [
        /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one letter and one number!",
      ],
      private: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
    avt: {
      type: String,
      trim: true,
    },
    poster: {
      type: String,
      trim: true,
    },
    description: String,
    role: {
      type: String,
      lowercase: true,
      enum: ["user", "admin"],
      default: "user",
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
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
userSchema.plugin(slug);

/**
 *
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
