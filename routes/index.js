const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');
const hourLogController = require('../controllers/hourLogController');
const timeEntryController = require('../controllers/timeEntryController');
const { catchErrors } = require('../handlers/errorHandlers'); // Object destructuring, import single method from a module (file), catchErrors wraps async functions

router.get('/', authController.filter);

router.get('/auth/login', authController.isNotLoggedIn, authController.loginForm);
router.get('/auth/logout', authController.logout);
router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleAuthRedirect);

router.get('/user/all', authController.isLoggedIn, authController.isAdmin, catchErrors(userController.all));

router.get('/company/all', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.all));
router.get('/company/:id', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.getById));
router.post('/company/create', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.create));
router.post('/company/:id/edit', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.edit));
router.post('/company/:id/activate', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.activate));
router.post('/company/:id/deactivate', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.deactivate));
router.post('/company/:id/delete', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.delete));

router.get('/hourLog/all', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.all));

router.get('/timeEntry/new', authController.isLoggedIn, catchErrors(timeEntryController.new));

module.exports = router;
