const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const nodemailer = require('nodemailer');
const async = require('async');

const seats = require('../seats')

let cinemaFilm;
let cinemaTime;
let cinemaPrice;
let cinemaFormat;
let cinemaPlaces;
let ticketCount;

let avaliables = {}

function getEmail() {
  const price = Number(ticketCount) * Number(cinemaPrice.substring(0, cinemaPrice.length -2));
  let answer = `Вы забронировали билеты на фильм <b>"${cinemaFilm}"</b> <br>
  <b>Количество билетов:</b> ${ticketCount} <br>
  <b>Время:</b> ${cinemaTime} <br>
  <b>Цена:</b> ${price} <br>
  <b>Формат:</b> ${cinemaFormat} <br> <br>
  <b>Ваши места:</b> <br>
   `
  for (const place of cinemaPlaces) {
    const row_pl = place.split(' ');
    const row = row_pl[0];
    const pl = row_pl[1]
    answer += `<b>Ряд:</b> ${row} <br>
               <b>Место:</b> ${pl} <br> <br>
              `
  }
  return answer;
}

async function main(receivers) {
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: '***', // Ввести свой 
      pass: '***' // Ввести свой
    }
  });

  let info = await transporter.sendMail({
    from: '"Kek Cinema 👻" <***>', // Ввести свой
    to: receivers,
    subject: "Уведомление о брони",
    text: `Вы забронировали билет на фильм ${cinemaFilm} время ${cinemaTime} по цене ${cinemaPrice} в формате ${cinemaFormat}`,
    html: getEmail()
  });
}

exports.places_create_get = function(req, res, next) {
  async.parallel({}, function(err, results) {
      cinemaFilm = req.query.film;
      cinemaTime = req.query.time;
      cinemaPrice = req.query.price;
      cinemaFormat = req.query.format;
      if (err) { return next(err); }
      if (!avaliables[cinemaFilm]) {
        avaliables[cinemaFilm] = {};
      }
      if (!avaliables[cinemaFilm][cinemaTime]) {
        avaliables[cinemaFilm][cinemaTime] = [];
      }
      res.render('hall', {
         cinemaFormat: cinemaFormat,
         cinemaFilm: cinemaFilm,
         cinemaTime: cinemaTime,
         avaliables: avaliables,
         seats: seats
        }
      );
  });

};

exports.places_create_post = [
  body('email_address', 'Genre name required').isLength({ min: 1 }).trim(),
  sanitizeBody('email_address').escape(),

  (req, res, next) => {
      main(req.body.email_address).catch(console.error);
      res.redirect('/reservation');
  }
];

exports.form_create_get = function(req, res, next) {
    cinemaPlaces = req.query.place;
    if (!Array.isArray(cinemaPlaces)) {
      cinemaPlaces = [cinemaPlaces];
    }
    ticketCount = cinemaPlaces.length;
    async.parallel({}, function(err, results) {
        if (err) { return next(err); }
        res.render('reservation', { 
          cinemaFormat: cinemaFormat,
          cinemaFilm: cinemaFilm,
          cinemaTime: cinemaTime,
          cinemaPrice: cinemaPrice,
          ticketCount: ticketCount
        });
    });

};

exports.form_create_post = [
    body('email_address', 'Genre name required').isLength({ min: 1 }).trim(),
    sanitizeBody('email_address').escape(),

    (req, res, next) => {
        avaliables[cinemaFilm][cinemaTime] = avaliables[cinemaFilm][cinemaTime].concat(cinemaPlaces);
        main(req.body.email_address).catch(console.error);
        res.redirect('/catalog/done');
    }
];


exports.done_create_get = function(req, res, next) {
  async.parallel({}, function(err, results) {
      if (err) { return next(err); }
      res.render('done', { });
  });

};

exports.done_create_post = [
  (req, res, next) => {
      res.redirect('/');
  }
];