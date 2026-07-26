export type TabType = 'home' | 'analytics' | 'predict' | 'insights' | 'about';

export interface StudentProfile {
  studyHours: number;
  attendance: number;
  previousScore: number;
  sleepHours: number;
  motivation: 'Low' | 'Medium' | 'High';
  internetAccess: boolean;
  extracurriculars: boolean;
}

export interface FactorImpact {
  name: string;
  impact: string;
  value: number;
}

export interface PredictionResult {
  predictedScore: number;
  confidenceScore: number;
  percentile: number;
  grade: string;
  summary: string;
  recommendations: string[];
  factorsImpact: FactorImpact[];
}

export interface CohortMetrics {
  totalStudents: number;
  avgExamScore: number;
  avgAttendance: number;
  predAccuracy: number;
}
