function generateInsights(metrics) {
  const insights = [];
  const suggestions = [];

  if (metrics.leadTime > 4) {
    insights.push(
      "Lead time is higher than expected. PR reviews or deployments may be slowing delivery."
    );

    suggestions.push(
      "Break large PRs into smaller changes for faster reviews."
    );
  }

  if (metrics.bugRate > 0.1) {
    insights.push(
      "Bug rate is increasing, indicating possible testing gaps."
    );

    suggestions.push(
      "Improve automated testing before deployment."
    );
  }

  if (metrics.deploymentFrequency < 10) {
    insights.push(
      "Deployment frequency is low, which may slow feature delivery."
    );

    suggestions.push(
      "Increase release frequency with smaller deployments."
    );
  }

  return {
    insights,
    suggestions,
  };
}

module.exports = generateInsights;