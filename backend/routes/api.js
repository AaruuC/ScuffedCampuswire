/* eslint-disable linebreak-style */
const express = require('express')

const router = express.Router()
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/questions', async (req, res) => {
  const questions = await Question.find()
  // let string = ''
  // questions.forEach(e => string += `Question: ${e.questionText} `)
  res.json(questions)
})

router.post('/questions/add', isAuthenticated, async (req, res, next) => {
  try {
    const { body } = req
    const { questionText } = body
    const { session } = req
    const { username } = session
    await Question.create({ questionText, author: username })
    res.send('question successfully submitted')
  } catch (e) {
    res.send('question failed to submit')
    next(e)
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const { _id, answer } = body
  try {
    await Question.updateOne({ _id }, { answer })
    res.send('answer submitted')
  } catch (e) {
    res.send('answer failed to submit')
    next(e)
  }
})

module.exports = router
