package com.studentperformance.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record StudentProfileRequest(
		@Min(0) @Max(80) Double studyHours,
		@Min(0) @Max(100) Double attendance,
		@Min(0) @Max(100) Double previousScore,
		@Min(0) @Max(24) Double sleepHours,
		String motivation,
		Boolean internetAccess,
		Boolean extracurriculars) {
}
