import mongoose from 'mongoose';
import promptData from '../models/promptData.js';
import usersData from '../models/usersData.js';
import bcrypt from 'bcrypt';

// Route to handle POST requests containing data to write to the database
const pushToDb = async (prompt, response, date) => {
    try {
        // Create an instance of promptData with the extracted data
        const newData = new promptData({
            prompt,
            response,
            date
        });

        // Save the data to the database
        await newData.save();
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

const registerUser = async (email, password) => {
  try {
      // Check if the email already exists
      const existingUser = await usersData.findOne({ email });

      if (existingUser) {
          throw new Error('Email already registered');
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create an instance of users with the extracted data
      const newUser = new usersData({
          email,
          password: hashedPassword
      });

      // Save the data to the database
      await newUser.save();
  } catch (error) {
      console.error('Error saving data:', error);
      throw error; // Re-throw the error to be handled by the calling function
  }
};

const authenticateUser = async (email, password) => {
  try {
      // Find the user by email
      const user = await usersData.findOne({ email });
      
      if (!user) {
          throw new Error('User not found');
      }

      // Compare the provided password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(user.password);
      if (!isMatch) {
          throw new Error('Invalid password');
      }

      // Return user data if authentication is successful
      return user;
  } catch (error) {
      console.error('Error during authentication:', error);
      throw error;
  }
};


export { pushToDb, registerUser ,authenticateUser};
