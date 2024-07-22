// server.js
// server.js
import express from 'express';
import controllerRouting from './routes/index.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Load all routes
controllerRouting(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
