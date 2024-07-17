import express from "express";
import mongoose from "mongoose";
import ItemModel from "./models/Items.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://stormaker777:iSdkp4uwF2hy95ak@cluster0.csl8val.mongodb.net/MERN_Tutorial?retryWrites=true&w=majority&appName=Cluster0"
);

app.get("/getItems", async (req, res) => {
    try {
        const items = await ItemModel.find();
        res.json(items)
    } catch (error) {
        res.json("Error Found...")
    }
})

app.post("/createItem", async (req, res) => {
    const item = req.body;
    const newItem = new ItemModel(item);
    await newItem.save();

    res.json(item);
})

app.delete("/deleteItem/:id", async (req, res) => {
    try{
        const itemId = req.params.id;
        const deletedItem = await ItemModel.findByIdAndDelete(itemId);
        deletedItem ? res.json("Item deleted...") : res.json("Item not deteled: ", id)
    } catch (error) {
        res.json("Error Occured...")
    }
})

app.put("/updateItem/:id", async (req, res) => {
    try {
        const itemId = req.params.id;
        const updateItem = req.body;
        const updatedItem = await ItemModel.findByIdAndUpdate(itemId, updateItem);
        updatedItem ? res.json("Item Updated...") : res.json("Item didn't udpate...")
    } catch (error) {
        res.json("Error Occured...")
    }
})

app.listen(3001, () => console.log("Server is running...."));
