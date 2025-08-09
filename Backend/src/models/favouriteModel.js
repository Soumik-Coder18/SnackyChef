import mongoose from 'mongoose';
const { Schema } = mongoose;

const favouriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipeId: { type: String, required: true },  // or ObjectId if recipes are stored in DB
  createdAt: { type: Date, default: Date.now },
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;