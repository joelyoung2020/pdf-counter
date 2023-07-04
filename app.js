import express from "express";
import bodyParser from 'body-parser';
import processPDF from "./wordCount.js";
import upload from "./multer.js";

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/analyze-pdf", 
  upload.single('file'), 
  async (req, res) => {
    try {
      const file = req.file;
      const data = await processPDF(file.path);
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

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})