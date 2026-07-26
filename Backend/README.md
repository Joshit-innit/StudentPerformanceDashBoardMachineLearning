# Student Performance Backend

Spring Boot REST API for the React student performance dashboard.

## Run

Install the Python dependency needed to load the trained pickle:

```bash
python3 -m venv Backend/.venv
Backend/.venv/bin/python -m pip install -r Backend/requirements.txt
```

Start the backend:

```bash
cd Backend
./gradlew bootRun
```

The API runs at `http://localhost:8080`.

If you want to use a different Python interpreter, set `PREDICT_PYTHON` before
starting Spring Boot.

## Endpoints

- `GET /api/health`
- `POST /api/predict`

The prediction endpoint loads `../models/student_performance_model.pkl` through
`src/main/python/predict.py`, so the saved machine-learning model is used for
website predictions.
