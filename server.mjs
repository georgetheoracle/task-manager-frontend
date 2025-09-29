import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import tasksRouter from './routes/tasks.mjs';

const app = express();
const db = new Database('tasks.db');

// middlewares
app.use(cors());
app.use(express.json());
// create table if not exists
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    completed INTEGER DEFAULT 0
  )
`
).run();
app.use('/tasks', tasksRouter(db));

// start server
app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});
