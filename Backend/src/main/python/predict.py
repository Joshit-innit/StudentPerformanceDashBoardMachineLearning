#!/usr/bin/env python3
import argparse
import csv
import json
import math
import pickle
import statistics
import sys
from pathlib import Path

NUMERIC_COLUMNS = [
    "Hours_Studied",
    "Attendance",
    "Previous_Scores",
    "Tutoring_Sessions",
    "Sleep_Hours",
    "Physical_Activity",
    "Study_Efficiency",
    "Academic_Engagement",
    "Lifestyle_Score",
]

FEATURE_COLUMNS = [
    "Hours_Studied",
    "Attendance",
    "Parental_Involvement",
    "Access_to_Resources",
    "Extracurricular_Activities",
    "Sleep_Hours",
    "Previous_Scores",
    "Motivation_Level",
    "Internet_Access",
    "Tutoring_Sessions",
    "Family_Income",
    "Teacher_Quality",
    "School_Type",
    "Peer_Influence",
    "Physical_Activity",
    "Learning_Disabilities",
    "Parental_Education_Level",
    "Distance_from_Home",
    "Gender",
    "Study_Efficiency",
    "Academic_Engagement",
    "Lifestyle_Score",
]

INPUT_TO_DATASET = {
    "studyHours": "Hours_Studied",
    "attendance": "Attendance",
    "previousScore": "Previous_Scores",
    "sleepHours": "Sleep_Hours",
    "motivation": "Motivation_Level",
    "internetAccess": "Internet_Access",
    "extracurriculars": "Extracurricular_Activities",
}


def read_rows(path):
    with path.open(newline="") as file:
        return list(csv.DictReader(file))


def build_category_maps(cleaned_rows, preprocessed_rows):
    maps = {}
    for clean_row, encoded_row in zip(cleaned_rows, preprocessed_rows):
        for column, raw_value in clean_row.items():
            if column not in encoded_row or column == "Exam_Score":
                continue
            encoded_value = encoded_row[column]
            if raw_value and not _is_float(raw_value) and encoded_value:
                maps.setdefault(column, {})[raw_value.strip().lower()] = float(encoded_value)
    return maps


def dataset_defaults(preprocessed_rows):
    defaults = {}
    columns = [col for col in preprocessed_rows[0].keys() if col != "Exam_Score"]
    for column in columns:
        values = [float(row[column]) for row in preprocessed_rows if row[column] != ""]
        if not values:
            defaults[column] = 0.0
        elif column in NUMERIC_COLUMNS:
            defaults[column] = statistics.median(values)
        else:
            defaults[column] = max(set(values), key=values.count)
    return defaults


def numeric_scaler(preprocessed_rows):
    rows = [with_engineered_features(row) for row in preprocessed_rows]
    scaler = {}
    for column in NUMERIC_COLUMNS:
        values = [float(row[column]) for row in rows if row[column] != ""]
        mean = sum(values) / len(values)
        variance = sum((value - mean) ** 2 for value in values) / len(values)
        scaler[column] = (mean, math.sqrt(variance) or 1.0)
    return scaler


def with_engineered_features(row):
    engineered = dict(row)
    hours = float(engineered["Hours_Studied"])
    attendance = float(engineered["Attendance"])
    tutoring = float(engineered["Tutoring_Sessions"])
    sleep = float(engineered["Sleep_Hours"])
    activity = float(engineered["Physical_Activity"])
    engineered["Study_Efficiency"] = hours * attendance / 100.0
    engineered["Academic_Engagement"] = (attendance + hours + tutoring) / 3.0
    engineered["Lifestyle_Score"] = (sleep + activity) / 2.0
    return engineered


def build_feature_row(payload, defaults, category_maps, scaler):
    row = dict(defaults)

    for input_name, dataset_column in INPUT_TO_DATASET.items():
        if input_name not in payload or payload[input_name] is None:
            continue
        value = payload[input_name]
        if isinstance(value, bool):
            value = "Yes" if value else "No"
        if isinstance(value, str):
            mapped = category_maps.get(dataset_column, {}).get(value.strip().lower())
            if mapped is None and _is_float(value):
                mapped = float(value)
            if mapped is not None:
                row[dataset_column] = mapped
        else:
            row[dataset_column] = float(value)

    row["Study_Efficiency"] = row["Hours_Studied"] * row["Attendance"] / 100.0
    row["Academic_Engagement"] = (
        row["Attendance"] + row["Hours_Studied"] + row["Tutoring_Sessions"]
    ) / 3.0
    row["Lifestyle_Score"] = (row["Sleep_Hours"] + row["Physical_Activity"]) / 2.0

    for column, (mean, std) in scaler.items():
        row[column] = (row[column] - mean) / std

    return [[row[column] for column in FEATURE_COLUMNS]]


def _is_float(value):
    try:
        float(value)
        return True
    except (TypeError, ValueError):
        return False


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--project-root", required=True)
    args = parser.parse_args()

    project_root = Path(args.project_root)
    payload = json.load(sys.stdin)

    preprocessed_rows = read_rows(project_root / "data" / "Preprocessed_StudentPerformanceFactors.csv")
    cleaned_rows = read_rows(project_root / "data" / "Cleaned_StudentPerformanceFactors.csv")
    defaults = dataset_defaults(preprocessed_rows)
    category_maps = build_category_maps(cleaned_rows, preprocessed_rows)
    scaler = numeric_scaler(preprocessed_rows)
    features = build_feature_row(payload, defaults, category_maps, scaler)

    with (project_root / "models" / "student_performance_model.pkl").open("rb") as file:
        model = pickle.load(file)

    prediction = float(model.predict(features)[0])
    print(json.dumps({"predictedScore": prediction, "modelUsed": True}))


if __name__ == "__main__":
    main()
