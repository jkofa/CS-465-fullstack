// app_api/reset_user.js
const mongoose = require("mongoose");

// load the User model the same way your API does
require("./models/user");
const User = mongoose.model("User");

// use the same DB your server uses
const DB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/travlr";

// change this if you want a different test user
const EMAILS_TO_DELETE = ["test@test.com", "test2@test.com"];

(async () => {
  try {
    await mongoose.connect(DB_URI);
    const result = await User.deleteMany({ email: { $in: EMAILS_TO_DELETE } });
    console.log("✅ Deleted users:", result.deletedCount);
  } catch (err) {
    console.error("❌ Reset error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();