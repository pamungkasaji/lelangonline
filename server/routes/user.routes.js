import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/userseller')
  .post(userCtrl.createSeller)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
router.route('/api/stripe_auth/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.stripe_auth, userCtrl.update)

router.param('userId', userCtrl.userByID)

router.route('/api/list_verify_seller').get(authCtrl.requireSignin, userCtrl.listNotVerifiedSeller)

router.route('/api/detail_seller/:userId').get(authCtrl.requireSignin, userCtrl.readSeller)

router.route('/api/accept_seller/:userId').put(authCtrl.requireSignin, userCtrl.acceptSeller)

export default router
