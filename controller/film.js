const filmUsecase = require("../usecase/film");

exports.getFilms = async (req, res, next) => {
  try {
    const data = await filmUsecase.getFilms();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFilmbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await filmUsecase.getFilmbyId(id);
    if (!data) {
      return next({
        message: `Film with id ${id} is not found!`,
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

exports.addFilm = async (req, res, next) => {
  try {
    const { nama_film, genre_id, sutradara, tahun, description } = req.body;
    const { image_film } = req.files;
    if (!nama_film || nama_film == "") {
      return next({
        message: "film name must be provided!",
        statusCode: 400,
      });
    }
    if (!genre_id || genre_id == "") {
      return next({
        message: "genre must be provided!",
        statusCode: 400,
      });
    }
    if (!sutradara || sutradara == "") {
      return next({
        message: "sutradara must be provided!",
        statusCode: 400,
      });
    }
    if (!tahun || tahun == "") {
      return next({
        message: "tahun must be provided!",
        statusCode: 400,
      });
    }
    if (!description || description == "") {
      return next({
        message: "description must be provided!",
        statusCode: 400,
      });
    }
    if (!image_film || image_film == "") {
      return next({
        message: "image must be provided!",
        statusCode: 400,
      });
    }

    const data = await filmUsecase.addFilm({
      nama_film,
      genre_id,
      sutradara,
      tahun,
      image_film,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFilm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nama_film, genre_id, sutradara, tahun } = req.body;
    const { image_film } = req.files;
    if (!nama_film || nama_film == "") {
      return next({
        message: "nama_film must be provided!",
        statusCode: 400,
      });
    }
    if (!genre_id || genre_id == "") {
      return next({
        message: "genre_id must be provided!",
        statusCode: 400,
      });
    }
    if (!sutradara || sutradara == "") {
      return next({
        message: "sutradara must be provided!",
        statusCode: 400,
      });
    }
    if (!tahun || tahun == "") {
      return next({
        message: "tahun must be provided!",
        statusCode: 400,
      });
    }

    const data = await filmUsecase.updateFilm(id, {
      nama_film,
      genre_id,
      sutradara,
      tahun,
      image_film,
    });

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFilm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await filmUsecase.deleteFilm(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
