var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(userSchema = new Schema({
  empId: String,
  first_name: String,
  last_name: String,
  dob: String,
  contact_number: String,
  username: String,
  misnumber: String,
  password: String,
})),
  (user = mongoose.model("employees_vikash_111915138", userSchema));

module.exports = user;
