import mongoose from 'mongoose';

// Define schema for your data
const exampleSchema = new mongoose.Schema({
  prompt: String,
  response: String
});

// Define a model based on the schema
const ExampleModel = mongoose.model('Example', exampleSchema);

const uri = "mongodb+srv://Cluster0:EPo4F0M5pOUN7wxg@cluster0.y6cbdhr.mongodb.net/?retryWrites=true&w=majority";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Connect to MongoDB
mongoose.connect(uri, clientOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));


// Route to handle POST requests containing data to write to the database
const pushToDb = async (prompt,response)=> {
    try {
        // Create an instance of ExampleModel with the extracted data
        const newData = new ExampleModel({
         prompt,
         response
        });
    
        // Save the data to the database
        await newData.save();
      }
       catch (error) {
        console.error('Error saving data:', error);
      }
}

export default pushToDb;
  

