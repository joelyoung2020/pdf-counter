import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from 'body-parser';
import processPDF from "./wordCount.js";
import upload from "./multer.js";
import fs from "fs";

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.post("/analyze-pdf", 
  upload.single('file'), 
  async (req, res) => {
    try {
      const file = req.file;
      const data = await processPDF(file.path);
      // const result = await JSON.stringify(data)
      return res.status(200).json({
        success: true,
        result: data,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
})

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/wordcount")
    app.listen(PORT, () => {
      console.log(`Running on ${PORT}`)
    })
  } catch (error) {
    console.log(error.message)
  }
}

connect();