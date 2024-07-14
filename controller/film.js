const filmUsecase = require("../usecase/film");

exports.getFilms = async (req, res, next) => {
  try {
    const { name } = req?.query;
    const data = await filmUsecase.getFilms(name);

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
    const {
      nama_film,
      genre_id,
      sutradara,
      tahun,
      description,
      id_tmdb,
      type,
    } = req.body;
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
    if (!type || type == "") {
      return next({
        message: "type must be provided!",
        statusCode: 400,
      });
    }

    const data = await filmUsecase.addFilm({
      nama_film,
      genre_id,
      sutradara,
      tahun,
      image_film,
      description,
      id_tmdb,
      type,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// exports.updateFilm = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { nama_film, genre_id, sutradara, tahun, description, id_tmdb } =
//       req?.body;
//     const { image_film } = req?.files;
//     if (!nama_film || nama_film == "") {
//       return next({
//         message: "nama_film must be provided!",
//         statusCode: 400,
//       });
//     }
//     if (!genre_id || genre_id == "") {
//       return next({
//         message: "genre_id must be provided!",
//         statusCode: 400,
//       });
//     }
//     if (!sutradara || sutradara == "") {
//       return next({
//         message: "sutradara must be provided!",
//         statusCode: 400,
//       });
//     }
//     if (!tahun || tahun == "") {
//       return next({
//         message: "tahun must be provided!",
//         statusCode: 400,
//       });
//     }

//     const data = await filmUsecase.updateFilm(id, {
//       nama_film,
//       genre_id,
//       sutradara,
//       tahun,
//       image_film,
//       description,
//       id_tmdb,
//     });

//     res.status(200).json({
//       message: "Successs",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.updateFilm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      nama_film,
      genre_id,
      sutradara,
      tahun,
      description,
      id_tmdb,
      image_film,
      type,
    } = req.body;

    // Build an update object with only the provided properties
    const updateData = {};
    if (nama_film) updateData.nama_film = nama_film;
    if (genre_id) updateData.genre_id = genre_id;
    if (sutradara) updateData.sutradara = sutradara;
    if (tahun) updateData.tahun = tahun;
    if (description) updateData.description = description;
    if (id_tmdb) updateData.id_tmdb = id_tmdb;
    if (type) updateData.type = type;
    if (image_film) updateData.image_film = image_film; // Handle file upload logic separately

    // Validate required fields (optional, uncomment if needed)
    /*
    if (!updateData.nama_film || !updateData.genre_id || !updateData.sutradara || !updateData.tahun) {
      return next({
        message: "Required fields (nama_film, genre_id, sutradara, tahun) must be provided!",
        statusCode: 400,
      });
    }
    */

    const updatedFilm = await filmUsecase.updateFilm(id, updateData); // Update with partial data

    res.status(200).json({
      message: "Success",
      data: updatedFilm,
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
