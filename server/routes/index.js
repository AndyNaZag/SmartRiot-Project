let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let indexController = require('../controller/index');

/* GET home page. */
router.get('/adopt', indexController.displayPetList);
router.post('/add', indexController.processAddPet);
router.post('/edit/:id', indexController.processEditPet);
router.get('/delete/:id', indexController.performDelete);
router.post('/login', indexController.processLoginPage);

module.exports = router;