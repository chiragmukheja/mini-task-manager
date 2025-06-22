const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(tasks);
  } catch (error) {
    console.error('GET /tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create task
router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newTask = await prisma.task.create({ data: { title } });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('POST /tasks error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Get single task
router.get('/:id', async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(`GET /tasks/${req.params.id} error:`, error);
    res.status(500).json({ error: 'Failed to get task' });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  const { title, status } = req.body;
  if (!title || title.trim() === '' || !['pending', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Valid title and status required' });
  }

  try {
    const updated = await prisma.task.update({
      where: { id: Number(req.params.id) },
      data: { title, status },
    });
    res.json(updated);
  } catch (error) {
    console.error(`PUT /tasks/${req.params.id} error:`, error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ deleted: true });
  } catch (error) {
    console.error(`DELETE /tasks/${req.params.id} error:`, error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
