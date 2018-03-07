import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const MichelinStarsSchema = new Schema({
  count: {
    type: Number,
    default: 3
  },
  text: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  }
});

module.exports = mongoose.model('MichelinStars', MichelinStarsSchema);