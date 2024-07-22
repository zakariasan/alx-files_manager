// controllers/AppController.js
// controllers/AppController.js
// controllers/AppController.js
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  static async getStats(req, res) {
    try {
      const users = await dbClient.nbUsers();
      const files = await dbClient.nbFiles();
      res.status(200).json({
        users,
        files,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default AppController;
