let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let petController = require('../controllers/pet');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Pet List page - READ Operation */
router.get('/', petController.displayPetList);

/* GET Route for displaying the Add page - CREATE Operation */
//router.get('/add', requireAuth, petController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', passport.authenticate('jwt', {session: false}), petController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
//router.get('/edit/:id', requireAuth, petController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), petController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), petController.performDelete);

module.exports = router;