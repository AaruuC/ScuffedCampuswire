/* eslint-disable linebreak-style */
const authentificationMiddleware = (req, res, next) => {
  // console.log(req.session.username)
  if (req.session.username !== null && req.session.username !== '') {
    // res.send("asd")
    next()
  } else {
    res.send('you are not logged in')
    next(new Error('not logged in'))
  }
}

module.exports = authentificationMiddleware
