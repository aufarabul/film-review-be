const FilmsRepo = require("../../repository/film");

exports.getFilms = async (name) => {
  const data = await FilmsRepo.getFilms(name);
  return data;
};

exports.getFilmbyId = async (id) => {
  const data = await FilmsRepo.getFilmbyId(id);
  return data;
};

exports.addFilm = async (payload) => {
  const data = await FilmsRepo.addFilm(payload);
  return data;
};

exports.updateFilm = async (id, payload) => {
  // update old data
  await FilmsRepo.updateFilm(id, payload);

  // find the new data
  const data = await FilmsRepo.getFilmbyId(id);

  return data;
};

exports.deleteFilm = async (id) => {
  const data = await FilmsRepo.deleteFilm(id);
  return data;
};
