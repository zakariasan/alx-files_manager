// utils/db.js
import { MongoClient } from 'mongodb';
import loadEnvironmentVariables from './env_loader';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
   */
  constructor() {
    loadEnvironmentVariables();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${dbName}`;

    this.client = new MongoClient(dbURL, { useUnifiedTopology: true });
    this.connected = false;

    // Connect to the MongoDB server
    this.client.connect()
      .then(() => {
        this.connected = true;
        console.log('MongoDB client connected successfully');
      })
      .catch((err) => {
        this.connected = false;
        console.error('MongoDB client connection error:', err);
      });
  }

  /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean} True if connected, false otherwise.
   */
  isAlive() {
    return this.connected;
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<number>} The number of users.
   */
  async nbUsers() {
    try {
      return await this.client.db().collection('users').countDocuments();
    } catch (err) {
      console.error('Error getting number of users:', err);
      throw err;
    }
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<number>} The number of files.
   */
  async nbFiles() {
    try {
      return await this.client.db().collection('files').countDocuments();
    } catch (err) {
      console.error('Error getting number of files:', err);
      throw err;
    }
  }

  /**
   * Retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>} The users collection.
   */
  async usersCollection() {
    try {
      return this.client.db().collection('users');
    } catch (err) {
      console.error('Error getting users collection:', err);
      throw err;
    }
  }

  /**
   * Retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>} The files collection.
   */
  async filesCollection() {
    try {
      return this.client.db().collection('files');
    } catch (err) {
      console.error('Error getting files collection:', err);
      throw err;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
export { dbClient };
