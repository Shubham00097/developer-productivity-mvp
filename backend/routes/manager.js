const express = require("express");
const router = express.Router();

const developers = require("../data/developers.json");
const metrics = require("../data/metrics.json");

router.get("/", (req, res) => {
  const totalDevelopers = developers.length;

  const avgLeadTime =
    metrics.reduce(
      (sum, m) => sum + m.metrics.leadTime,
      0
    ) / totalDevelopers;

  const avgBugRate =
    metrics.reduce(
      (sum, m) => sum + m.metrics.bugRate,
      0
    ) / totalDevelopers;

  const avgDeploymentFrequency =
    metrics.reduce(
      (sum, m) =>
        sum + m.metrics.deploymentFrequency,
      0
    ) / totalDevelopers;

  const topPerformer = metrics.reduce((best, current) =>
    current.metrics.prThroughput >
    best.metrics.prThroughput
      ? current
      : best
  );

  const topDeveloper = developers.find(
    (d) => d.id === topPerformer.developerId
  );

  res.json({
    totalDevelopers,

    avgLeadTime: avgLeadTime.toFixed(1),

    avgBugRate: (
      avgBugRate * 100
    ).toFixed(0),

    avgDeploymentFrequency:
      avgDeploymentFrequency.toFixed(1),

    topPerformer: topDeveloper?.name || "N/A",
  });
});

module.exports = router;