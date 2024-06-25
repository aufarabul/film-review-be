const GenresRepo = require("../../repository/genre");

exports.getGenres = async () => {
  const data = await GenresRepo.getGenres();
  return data;
};

exports.getGenrebyId = async (id) => {
  const data = await GenresRepo.getGenrebyId(id);
  return data;
};

exports.addGenre = async (payload) => {
  const data = await GenresRepo.addGenre(payload);
  return data;
};

exports.updateGenre = async (id, payload) => {
  // update old data
  await GenresRepo.updateGenre(id, payload);

  // find the new data
  const data = await GenresRepo.getGenrebyId(id);

  return data;
};

exports.deleteGenre = async (id) => {
  const data = await GenresRepo.deleteGenre(id);
  return data;
};
