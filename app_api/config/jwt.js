module.exports = {
  secret: process.env.JWT_SECRET || "travlr-secret-change-me",
  expiresIn: "2h"
};