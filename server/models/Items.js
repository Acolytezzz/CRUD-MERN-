import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
});

const ItemModel = mongoose.model("items", ItemSchema);

export default ItemModel;