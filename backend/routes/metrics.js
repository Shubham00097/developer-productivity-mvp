const express = require("express");
const router = express.Router();

const metrics = require("../data/metrics.json");
const developers = require("../data/developers.json");

const generateInsights = require("../services/insightService");

router.get("/:id", (req, res) => {

    const id = req.params.id;

    const developer = developers.find(
        (d) => d.id === id
    );

    const developerMetrics = metrics.find(
        (m) => m.developerId === id
    );

    const insightData = generateInsights(
        developerMetrics.metrics
    );

    res.json({
        developer: {
            ...developer,
            role: developer.level,        
            status: developer.serviceType 
        },
        metrics: developerMetrics.metrics,
        insights: insightData.insights,
        suggestions: insightData.suggestions,
    });
});

module.exports = router;