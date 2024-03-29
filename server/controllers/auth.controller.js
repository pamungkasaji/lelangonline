import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
        "username": req.body.username
      })

      if (!user) {
        return res.status('401').json({
          error: "Pengguna tidak ditemukan"
        })
      }

      if (user.seller === true) {
        if (user.verified === null) {
          return res.status('401').json({
            error: "Silahkan tunggu verifikasi admin"
          })
        } else if (user.verified === false) {
          return res.status('401').json({
            error: "Registrasi anda ditolak admin"
          })
        }
      }

      if (!user.authenticate(req.body.password)) {
        return res.status('401').send({
          error: "Username dan password tidak sesuai"
        })
      }

      const token = jwt.sign({
        _id: user._id
      }, config.jwtSecret)

      res.cookie("t", token, {
        expire: new Date() + 9999
      })

      return res.json({
        token,
        user: {_id: user._id, name: user.name, username: user.username, seller: user.seller, admin: user.admin}
      })
  } catch (err) {
    return res.status('401').json({
      error: "Could not sign in"
    })
  }
}

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization
}
