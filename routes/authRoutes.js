const authController = require('../controllers/authController');

module.exports = router => {
  router.get('/auth/google', authController.googleAuth);
  router.get('/auth/google/callback', authController.googleAuthRedirect);
  router.get('/api/v1/auth/current', authController.currentUser);
  router.get('/api/v1/logout', authController.logout);
};
