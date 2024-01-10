// Import required modules
import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';

import { GoogleGenerativeAI } from "@google/generative-ai";


// Configure dotenv
config();
const api_key=process.env.API_KEY;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Create an instance of express
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Add middleware
app.use(json()); // for parsing application/json
app.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.post('/',async  (req, res) => {
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const inputs = req.body;
    const prompt = `Write a 3 times ${inputs.cuisine} ${inputs.diet} meal plan for 1 day for person with age of ${inputs.age} and want to have an  ${inputs.cuisine}diet with total calories ${inputs.calories} for a day `+
    `do not add description or any recipe`

    const response = model.generateContent(prompt);

    const result = await response;

    const response2 =  result.response;

    const text = response2.text();


    const generate = text.split("\n");

    res.send(generate );
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});