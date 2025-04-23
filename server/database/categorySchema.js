const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, unique: true },
  order: { type: Number, required: true, unique: true },
  status: { type: String, required: true, enum: ['Available', 'Not Available'] },
  priceCol: [{ type: String }], // <-- array of strings
  dishes: { type: Number }
}, {
  timestamps: true
});

module.exports = categorySchema;
