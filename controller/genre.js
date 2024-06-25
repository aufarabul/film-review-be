const genreUsecase = require("../usecase/genre");

exports.getGenres = async (req, res, next) => {
  try {
    const data = await genreUsecase.getGenres();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGenrebyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await genreUsecase.getGenrebyId(id);
    if (!data) {
      return next({
        message: `genre with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.addGenre = async (req, res, next) => {
  try {
    const { nama_genre } = req.body;

    if (!nama_genre || nama_genre == "") {
      return next({
        message: "genre name must be provided!",
        statusCode: 400,
      });
    }

    const data = await genreUsecase.addGenre({
      nama_genre,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateGenre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nama_genre } = req.body;

    if (!nama_genre || nama_genre == "") {
      return next({
        message: "nama_genre must be provided!",
        statusCode: 400,
      });
    }

    const data = await genreUsecase.updategenre(id, {
      nama_genre,
    });

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteGenre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await genreUsecase.deleteGenre(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
