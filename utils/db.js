// utils/db.js
import { MongoClient } from 'mongodb';
import loadEnvironmentVariables from './env_loader';

/**
 * Represents a MongoDB client.
 */
class DatabaseClient {
  /**
   * Creates a new DatabaseClient instance.
   */
  constructor() {
    loadEnvironmentVariables();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const databaseName = process.env.DB_DATABASE || 'files_manager';
    const connectionString = `mongodb://${host}:${port}/${databaseName}`;

    this.client = new MongoClient(connectionString, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async getUserCount() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
  async getFileCount() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>}
   */
  async getUsersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>}
   */
  async getFilesCollection() {
    return this.client.db().collection('files');
  }
}

const databaseClient = new DatabaseClient();
export default databaseClient;
export { databaseClient };
