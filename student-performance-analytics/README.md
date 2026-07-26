# Student Performance Analytics Frontend

## Run Locally

**Prerequisites:** Node.js and the Spring Boot backend in `../Backend`.

1. Start the backend:

```bash
cd ../Backend
./gradlew bootRun
```

2. Install frontend dependencies:

```bash
npm install
```

3. Run the website:

```bash
npm run dev
```

The website runs at `http://localhost:5173` and proxies `/api` requests to the
Spring Boot backend at `http://localhost:8080`.
