package com.studentperformance.backend.dto;

import java.util.List;

public record PredictionResponse(
		double predictedScore,
		double confidenceScore,
		int percentile,
		String grade,
		String summary,
		List<String> recommendations,
		List<FactorImpact> factorsImpact,
		boolean modelUsed) {
}
