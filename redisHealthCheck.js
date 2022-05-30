import express from 'express';
import { createClient } from 'redis';

const app = express()
const port = 9091
const client = createClient({
  socket: {
    host: "127.0.0.1"
  }
});

client.on('error', (err) => console.log('Redis Client Error', err));

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const ping = await client.ping()
    res.send("OK")
    await client.quit()
  } catch (error) {
    res.status(500).send('Cannot connect to the backend')
    await client.disconnect();
    console.log(error);
  }
})

app.listen(port, () => {
  console.log(`Healthcheck listening on port ${port}`)
})