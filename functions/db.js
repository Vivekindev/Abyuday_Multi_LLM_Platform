import mongoose from 'mongoose';
import promptData from '../models/promptData.js'

// Route to handle POST requests containing data to write to the database
const pushToDb = async (prompt,response,date)=> {
    try {
        // Create an instance of ExampleModel with the extracted data
        const newData = new promptData({
         prompt,
         response,
         date
        });
    
        // Save the data to the database
        await newData.save();
      }
       catch (error) {
        console.error('Error saving data:', error);
      }
}

export default pushToDb;
  

