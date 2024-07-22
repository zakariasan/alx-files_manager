// utils/db.js
import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

/**
 * Class for performing operations with Mongo service
 */
class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.db = null;
    this.usersCollection = null;
    this.filesCollection = null;

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(DB_DATABASE);
      this.usersCollection = this.db.collection('users');
      this.filesCollection = this.db.collection('files');
      console.log('Connected successfully to MongoDB server');
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
    }
  }

  /**
   * Checks if connection to MongoDB is alive
   * @return {boolean} true if connection alive or false if not
   */
  isAlive() {
    return Boolean(this.db);
  }

  /**
   * Returns the number of documents in the collection users
   * @return {Promise<number>} amount of users
   */
  async nbUsers() {
    if (!this.isAlive()) {
      throw new Error('MongoDB connection is not alive');
    }
    return this.usersCollection.countDocuments();
  }

  /**
   * Returns the number of documents in the collection files
   * @return {Promise<number>} amount of files
   */
  async nbFiles() {
    if (!this.isAlive()) {
      throw new Error('MongoDB connection is not alive');
    }
    return this.filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
