import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import Queue from 'bull';
import dbClient from '../utils/db';
import userUtils from '../utils/user';

const userQueue = new Queue('userQueue');

class UsersController {
  /**
   * Creates a user using email and password.
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  static async postNew(request, response) {
    const { email, password } = request.body;

    // Validate email and password
    if (!email) return response.status(400).json({ error: 'Missing email' });
    if (!password) return response.status(400).json({ error: 'Missing password' });

    try {
      // Check if email already exists
      const existingUser = await dbClient.usersCollection.findOne({ email });
      if (existingUser) return response.status(400).json({ error: 'Already exists' });

      // Hash the password
      const hashedPassword = sha1(password);

      // Create the new user
      const result = await dbClient.usersCollection.insertOne({
        email,
        password: hashedPassword,
      });

      // Queue a task for the new user
      await userQueue.add({ userId: result.insertedId.toString() });

      // Respond with the new user
      const newUser = {
        id: result.insertedId,
        email,
      };
      return response.status(201).json(newUser);

    } catch (err) {
      // Handle unexpected errors
      console.error('Error creating user:', err);
      return response.status(500).json({ error: 'Error creating user' });
    }
  }

  /**
   * Retrieves the user based on the token used.
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  static async getMe(request, response) {
    try {
      const { userId } = await userUtils.getUserIdAndKey(request);
      const user = await userUtils.getUser({ _id: ObjectId(userId) });

      if (!user) return response.status(401).json({ error: 'Unauthorized' });

      // Return user object without sensitive fields
      const { _id, password, ...userData } = user;
      return response.status(200).json({ id: _id, ...userData });

    } catch (err) {
      // Handle unexpected errors
      console.error('Error retrieving user:', err);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
