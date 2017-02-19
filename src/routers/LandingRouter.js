import BaseRouter from './BaseRouter'
import LandingController from '../controllers/LandingController'

const LandingRouter = BaseRouter.extend({

  appRoutes: {
    '(/)': 'showLanding'
  },

  initialize () {
    this.controller = new LandingController()
  }

})

export default LandingRouter
