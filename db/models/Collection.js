import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  collection_parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    default: null,
  },
  isActive: { type: Boolean, default: true },
  thumbnail: { type: String },
}, {
  timestamps: true
});

export const Collection = mongoose.model('Collection', collectionSchema);
