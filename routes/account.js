/* eslint-disable linebreak-style */
const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const User = require('../models/user')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { body } = req
  const { username, password } = body

  try {
    await User.create({ username, password })
    res.send('user creation was successful')
  } catch (e) {
    res.send('user creation failed')
  }
})

router.post('/login', async (req, res, next) => {
  const { body } = req
  const { username, password } = body
  try {
    const user = await User.findOne({ username })
    if (password === user.password) {
      req.session.username = username
      // console.log(req.session.username)
      res.send(`you are logged in as ${username}`)
    } else {
      throw new Error('incorrect username or password')
    }
  } catch (e) {
    res.send('username or password is incorrect')
    next(e)
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  // console.log(req.session.username)
  req.session.username = null
  // console.log(req.session.username)
  res.send('logged out')
})

module.exports = router
