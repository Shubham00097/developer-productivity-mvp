const express = require("express");
const cors = require("cors");

const metricsRoute = require("./routes/metrics");
const managerRoute = require("./routes/manager");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/metrics", metricsRoute);
app.use("/api/manager", managerRoute);
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});