import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountAmount: { type: Number, required: false },
  quantity: { type: Number, required: true },
  collection_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: true,
  },
  isReturn: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
  start_date: { type: Date },
  end_date: { type: Date },
  thumbnail: {
    filename: { type: String },
    url: { type: String },
  },
  media: [
    {
      filename: { type: String },
      url: { type: String },
    }
  ],
}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema);
