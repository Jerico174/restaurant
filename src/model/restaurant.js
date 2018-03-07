import mongoose from 'mongoose';
import MichelinStars  from './michelinStars';
let Schema = mongoose.Schema;

let restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  text: String,
  michelinStars: {
    type: Schema.Types.ObjectId,
    ref: 'MichelinStars'
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);