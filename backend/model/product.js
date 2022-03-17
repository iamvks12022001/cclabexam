var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(productSchema = new Schema({
  empId: String,
  misnumber: String,
  job: String,
  month_salary: String,
  yearly_salary: String,
  // desc: String,
  // price: Number,
  // image: String,
  // discount: Number,
  // user_id: Schema.ObjectId,
  // is_delete: { type: Boolean, default: false },
  //   date: { type: Date, default: Date.now },
})),
  (product = mongoose.model("salary_Vikash_111915138", productSchema));

module.exports = product;
