var Film = require('../models/film');

var async = require('async');

exports.film_list = function(req, res, next) {

  Film.find({}, 'title pathToLogo genres')
    .populate('overwiev').exec(function (err, list_films) {
      if (err) {return next(err)} 
      else {
          res.render('films_list', { film_list:  list_films});
        }
    });

};

exports.film_detail = function(req, res, next) {

    async.parallel({
        film: function(callback) {
            Film.findById(req.params.id)
              .populate('genre')
              .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.film==null) { // No results.
            var err = new Error('Film not found');
            err.status = 404;
            return next(err);
        }
        res.render('film_detail', { film:  results.film } );
    });

};