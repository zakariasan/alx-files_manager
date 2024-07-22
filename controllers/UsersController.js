import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import Queue from 'bull';
import dbClient from '../utils/db';
import userUtils from '../utils/user';

const userQueue = new Queue('userQueue');

class UsersController {
  /**
   * Creates a user using email and password.
   * - Email and password are required.
   * - If the email already exists, return an error.
   * - Password must be hashed with SHA1 before storing.
   * - Returns the created user with email and auto-generated id.
   */
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      const existingUser = await dbClient.usersCollection.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = sha1(password);
      const result = await dbClient.usersCollection.insertOne({
        email,
        password: hashedPassword,
      });

      const newUser = {
        id: result.insertedId.toString(),
        email,
      };

      // Add user creation event to queue
      await userQueue.add({ userId: newUser.id });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      await userQueue.add({ error: 'User creation failure' });
      return res.status(500).json({ error: 'Error creating user' });
    }
  }

  static async getMe(req, res) {
    try {
      const { userId } = await userUtils.getUserIdAndKey(req);

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await userUtils.getUser({ _id: ObjectId(userId) });

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { _id, password, ...userData } = user;
      return res.status(200).json({ id: _id.toString(), ...userData });
    } catch (error) {
      console.error('Error retrieving user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
