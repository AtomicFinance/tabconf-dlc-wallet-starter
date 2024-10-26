import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import Bottleneck from 'bottleneck';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;

app.use(cors());
app.use(express.json());

// Initialize Bottleneck for rate limiting and backoff
const limiter = new Bottleneck({
  minTime: 4, // Minimum time between requests in ms
  maxConcurrent: 5, // Maximum number of concurrent requests
  reservoir: 5, // Number of requests that can be sent in a short burst
  reservoirRefreshAmount: 5,
  reservoirRefreshInterval: 4, // Refresh reservoir every minute
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Forward requests to mempool.space/testnet/api
app.get('/signet/*', async (req, res) => {
  console.log('Forwarding request to mempool.space/signet');
  const mempoolBaseUrl = 'https://mempool.space';
  const url = `${mempoolBaseUrl}${req.path}`;

  console.log('url', url);

  try {
    const response = await limiter.schedule(() =>
      axios({
        method: req.method,
        url,
        params: req.query,
        data: req.body,
        headers: {
          'Accept': 'application/json', // Request JSON response
        },
      })
    );
    res.json(response.data);
  } catch (error: any) {
    console.error('Error forwarding request:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error forwarding request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
