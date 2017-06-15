const mongoose = require('mongoose');
const slug = require('slugs');

const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: {
    type: String,
    // required: true,
    required: 'Please enter the store name!',
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
});

storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  this.slug = slug(this.name);
  next();
  // TODO moke more resiliant so slugs are unique
});

module.exports = mongoose.model('Store', storeSchema);
