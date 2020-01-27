var express = require('express');
var router = express.Router();

var film_controller = require('../controllers/filmController');
var form_controller = require('../controllers/reservationController');

/// FILM ROUTES ///

router.get('/', film_controller.film_list);  

router.get('/done', form_controller.done_create_get);
router.post('/done', form_controller.done_create_post);

router.get('/film/reservation', form_controller.form_create_get);
router.post('/film/reservation', form_controller.form_create_post);

router.get('/film/places', form_controller.places_create_get);
router.post('/film/places', form_controller.places_create_post);

router.get('/film/:id', film_controller.film_detail);
router.get('/films', film_controller.film_list);

module.exports = router;
