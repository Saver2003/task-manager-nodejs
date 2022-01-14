const express = require('express')
const router = express.Router()

const Task = require('../models/Task')

const createRouter = () => {
  router.get('/', (req, res) => {
    Task.find()
      .then(results => res.send(results))
      .catch(() => res.sendStatus(500))
  })

  router.get('/:id', async (req, res) => {
    try {
      const result = await Task.findById(req.params.id)
      if (result) res.send(result)
      else res.sendStatus(404)
    } catch (e) {
      res.sendStatus(500)
    }
  })

  router.post('/', async (req, res) => {
    const taskData = req.body
    const task = new Task(taskData)
    try {
      await  task.save()
    } catch (e) {
      res.status(400).send(e)
    }
  })

  return router
}

module.exports = createRouter