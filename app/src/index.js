const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = process.env.PORT || 3000;

// Example route
app.get('/', (req, res) => {
  res.send('Hello DevSecOps World!');
});

// Prometheus metrics
const counter = new promClient.Counter({
  name: 'requests_total',
  help: 'Total requests',
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Export the app for testing
module.exports = app;

// Start the server only if not in test
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}