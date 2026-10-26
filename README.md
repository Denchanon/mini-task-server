# Mini Task Server

A REST API for a simple task tracker, built with **Node.js**, **Express** and **MongoDB** (Mongoose).
It is the backend for [mini-task-client](https://github.com/Denchanon/mini-task-client).

## Tech stack
Node.js · Express 5 · MongoDB · Mongoose · dotenv · CORS

## API
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | List all tasks |
| `POST` | `/tasks` | Create a task. Body: `{ "name": "Buy milk" }` |
| `PATCH` | `/tasks/:id` | Toggle a task between `done` and `not done` |
| `DELETE` | `/tasks/:id` | Delete a task |

A task looks like this:
```json
{ "_id": "6650f1c2a1b2c3d4e5f60718", "name": "Buy milk", "status": "not done" }
```

## Getting started
```bash
npm install
```

Create a `.env` file in the project root:
```env
MONGO_URI=<your MongoDB connection string>
PORT=3000
```

Run the server:
```bash
npm run dev   # with auto-reload (nodemon)
npm start     # plain node
```

The API is then available at `http://localhost:3000`.

## Project structure
```
index.js         Express app, routes and MongoDB connection
models/Tasks.js  Mongoose schema for a task
```
