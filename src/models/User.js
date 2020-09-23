const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "You must have an email",
    },
    password: {
      type: String,
      required: "You need a password",
      minlength: 8,
    },

    dateOfBirth: {
      type: Date,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["customer", "admin"],
      default: "customer",
    },
    defaultCard: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
    status: {
      type: String,
      enum: ["active", "deactivated", "suspended"],
      default: "deactivated",
    },
    currentSubscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
    },
    subscriptionDateStarted: {
      type: Date,
    },
    subscriptionDateEnded: {
      type: Date,
    },
    hasActiveSubscription: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    facebook: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.index({ "$**": "text" });

/**
 *
 *
 * @param {function} next
 * @returns {function} next
 */
function softDeleteMiddleware(next) {
  const filter = this.getQuery();
  if (filter.isDeleted == null) {
    filter.isDeleted = false;
  }
  next();
}

userSchema.pre("find", softDeleteMiddleware);
userSchema.pre("findOne", softDeleteMiddleware);

userSchema.statics.findByUsername = function (username, cb) {
  return this.findOne({ username }, cb);
};

export const User = mongoose.model("User", userSchema);
