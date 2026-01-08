const express = require("express");
const client = require("prom-client");
require("dotenv").config();

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
});

app.get("/", (req, res) => {
  httpRequestCounter.inc();
  res.send("🚀 Node.js App with Monitoring");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
