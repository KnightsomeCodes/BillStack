require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { GoogleGenerativeAI } = require('@google/generative-ai')

const app = express()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' })

app.use(cors())
app.use(express.json())

const upload = multer({ dest: 'uploads/' })

app.get('/', (req, res) => {
  res.send('BillStack backend is running')
})

app.post('/upload', upload.single('bill'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No bill uploaded' })
  }

  try {
    console.log('Bill received:', req.file.originalname)

    const [result] = await client.textDetection(req.file.path)

    const text = result.fullTextAnnotation?.text || ''

    console.log('OCR text:')
    console.log(text)

    const prompt = `
    You are a bill and receipt data extraction system.

    Extract structured information from the following OCR text.

    Return ONLY valid JSON in this exact format:

    {
    "vendor": "",
    "invoiceNumber": "",
    "date": "",
    "items": [],
    "totalAmount": "",
    "category": "",
    "warranty": "",
    "returnPolicy": ""
    }

    Rules:
    - Do not invent information.
    - If a field is not present, use an empty string.
    - items should contain the product names found in the bill.
    - category should be a simple category such as Electronics, Food, Clothing, Grocery, Travel, etc.

    OCR TEXT:
    ${text}
    `

    const aiResult = await model.generateContent(prompt)
    const aiResponse = aiResult.response.text()
    const cleanedResponse = aiResponse
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()

    const extractedData = JSON.parse(cleanedResponse)

    console.log('Gemini response:')
    console.log(aiResponse)

    res.json({
    message: 'Bill processed successfully',
    filename: req.file.originalname,
    text,
    extractedData
    })
    
  } catch (error) {
    console.error('OCR failed:', error.message)

    res.status(500).json({
      error: 'OCR failed'
    })
  }
})

const vision = require('@google-cloud/vision')

const client = new vision.ImageAnnotatorClient()

console.log('Google Vision client created successfully')

app.listen(5000, '0.0.0.0', () => {
  console.log('BillStack backend running on port 5000')
})