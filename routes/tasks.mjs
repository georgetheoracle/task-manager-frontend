import express from 'express';

export default function tasksRouter(db) {
  const router = express.Router();

  router.get('/', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks);
  });

  router.post('/', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const result = db
      .prepare('INSERT INTO tasks (title) VALUES (?)')
      .run(title);
    res.json({ id: result.lastInsertRowid, title, completed: 0 });
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    db.prepare('UPDATE tasks SET completed = ? WHERE id = ?').run(
      completed,
      id
    );
    res.json({ success: true });
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    res.json({ success: true });
  });

  return router;
}
