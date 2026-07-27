package com.studentperformance.backend.controller;

import com.studentperformance.backend.dto.PredictionResponse;
import com.studentperformance.backend.dto.StudentProfileRequest;
import com.studentperformance.backend.service.PredictionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PredictionController {
	private final PredictionService predictionService;

	public PredictionController(PredictionService predictionService) {
		this.predictionService = predictionService;
	}

	@GetMapping("/health")
	public Map<String, String> health() {
		return Map.of("status", "ok", "service", "student-performance-backend");
	}

	@PostMapping("/predict")
	public PredictionResponse predict(@Valid @RequestBody StudentProfileRequest request) {
		return predictionService.predict(request);
	}

	@PostMapping("/insights/report")
	public Map<String, String> report(@RequestBody Map<String, String> request) {
		String category = request.getOrDefault("category", "General");
		String cohort = request.getOrDefault("studentCohort", "Current Cohort");
		return Map.of("report", predictionService.generateReport(category, cohort));
	}
}
