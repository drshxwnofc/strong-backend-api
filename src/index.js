
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let apps = [];

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Strong API running" });
});

// Create app
app.post("/apps", (req, res) => {
  const { name, repo } = req.body;

  const appData = {
    id: uuid(),
    name,
    repo,
    status: "created",
    url: `https://${name}.stringapp.com`
  };

  apps.push(appData);
  res.json(appData);
});

// List apps
app.get("/apps", (req, res) => {
  res.json(apps);
});

// Deploy app (mock)
app.post("/apps/:id/deploy", (req, res) => {
  const appItem = apps.find(a => a.id === req.params.id);
  if (!appItem) return res.status(404).json({ error: "App not found" });

  appItem.status = "deploying";

  setTimeout(() => {
    appItem.status = "running";
  }, 3000);

  res.json({ message: "Deployment started", app: appItem });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Strong API running on port", PORT);
});
