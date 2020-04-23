var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var filmSchema = new Schema({
    title: { type: String, required: true },
    logo: { data: Buffer, contentType: String },
    pathToLogo: { type: String, required: true },
    overview: { type: String },
    genres: { type: String },
    country: { type: String },
    showtimes: { type: Array }
});

filmSchema
.virtual('url')
.get(function () {
  return '/catalog/film/'+this._id;
});

module.exports = mongoose.model('Film', filmSchema);
