// utils/db.js
import mongodb from 'mongodb';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.db = this.client.db(database);
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
    });
  }

  /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client && this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    await this.ensureConnection();
    return this.db.collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    await this.ensureConnection();
    return this.db.collection('files').countDocuments();
  }

  /**
   * Ensures the database connection is established.
   * @returns {Promise<void>}
   */
  async ensureConnection() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(process.env.DB_DATABASE || 'files_manager');
    }
  }
}

export const dbClient = new DBClient();
export default dbClient;

