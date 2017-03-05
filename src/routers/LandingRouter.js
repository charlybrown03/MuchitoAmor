import BaseRouter from './BaseRouter'
import LandingController from '../controllers/LandingController'

const LandingRouter = BaseRouter.extend({

  controller: new LandingController(),

  appRoutes: {
    '(/)': 'showLanding'
  }

})

export default LandingRouter
