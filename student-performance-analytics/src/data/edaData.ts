export const cohortMetrics = {
  totalStudents: 6607,
  avgExamScore: 67.2,
  avgAttendance: 80.0,
  avgStudyHours: 20.0,
  avgPreviousScore: 75.1,
  avgSleepHours: 7.0,
  scoreMin: 55,
  scoreMax: 101,
};

export const scoreDistribution = [
  { range: '55-59', count: 68, percent: 1.0 },
  { range: '60-64', count: 1384, percent: 20.9 },
  { range: '65-69', count: 3530, percent: 53.4 },
  { range: '70-74', count: 1501, percent: 22.7 },
  { range: '75-79', count: 76, percent: 1.2 },
  { range: '80+', count: 48, percent: 0.7 },
];

export const edaScatter = {
  hoursStudied: [
    [23, 67], [34, 69], [22, 66], [17, 67], [35, 72], [26, 69],
    [20, 63], [20, 67], [30, 74], [14, 62], [31, 74], [26, 72],
    [31, 67], [17, 66], [27, 66], [22, 65], [23, 74], [16, 66],
    [16, 66], [22, 72], [23, 66], [17, 69], [15, 62], [18, 71],
    [16, 64], [24, 72], [17, 69], [12, 61], [21, 66], [32, 73],
  ],
  attendance: [
    [84, 67], [77, 69], [74, 66], [93, 67], [72, 72], [80, 69],
    [68, 63], [93, 67], [96, 74], [75, 62], [91, 74], [86, 72],
    [71, 67], [82, 66], [62, 66], [71, 65], [97, 74], [85, 66],
    [86, 66], [99, 72], [72, 66], [83, 69], [62, 62], [91, 71],
    [67, 64], [91, 72], [93, 69], [66, 61], [72, 66], [94, 73],
  ],
};

export const correlationLabels = [
  'Study Hrs',
  'Attendance',
  'Sleep',
  'Previous',
  'Exam',
];

export const correlationMatrix = [
  [1.0, -0.01, 0.01, 0.02, 0.45],
  [-0.01, 1.0, -0.02, -0.02, 0.58],
  [0.01, -0.02, 1.0, -0.02, -0.02],
  [0.02, -0.02, -0.02, 1.0, 0.18],
  [0.45, 0.58, -0.02, 0.18, 1.0],
];

export const groupedScoreAverages = [
  {
    factor: 'Motivation Level',
    values: [
      { name: 'Low', count: 1937, avgScore: 66.8 },
      { name: 'Medium', count: 3351, avgScore: 67.3 },
      { name: 'High', count: 1319, avgScore: 67.7 },
    ],
  },
  {
    factor: 'Teacher Quality',
    values: [
      { name: 'Low', count: 657, avgScore: 66.8 },
      { name: 'Medium', count: 4003, avgScore: 67.1 },
      { name: 'High', count: 1947, avgScore: 67.7 },
    ],
  },
  {
    factor: 'Family Income',
    values: [
      { name: 'Low', count: 2672, avgScore: 66.8 },
      { name: 'Medium', count: 2666, avgScore: 67.3 },
      { name: 'High', count: 1269, avgScore: 67.8 },
    ],
  },
  {
    factor: 'School Type',
    values: [
      { name: 'Public', count: 4598, avgScore: 67.2 },
      { name: 'Private', count: 2009, avgScore: 67.3 },
    ],
  },
];

export const examScoreCorrelations = [
  { feature: 'Attendance', value: 0.58 },
  { feature: 'Hours Studied', value: 0.45 },
  { feature: 'Previous Scores', value: 0.18 },
  { feature: 'Tutoring Sessions', value: 0.16 },
  { feature: 'Peer Influence', value: 0.10 },
  { feature: 'Learning Disabilities', value: -0.09 },
];
