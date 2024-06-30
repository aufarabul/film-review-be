const ulasanUsecase = require("../usecase/ulasan");

exports.getUlasans = async (req, res, next) => {
  try {
    const data = await ulasanUsecase.getUlasans();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUlasanbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ulasanUsecase.getUlasanbyId(id);
    if (!data) {
      return next({
        message: `ulasan with id ${id} is not found!`,
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

exports.addUlasan = async (req, res, next) => {
  try {
    const { nama_user, film_id, comment, rating } = req.body;
    if (!nama_user || nama_user == "") {
      return next({
        message: "ulasan name must be provided!",
        statusCode: 400,
      });
    }
    if (!film_id || film_id == "") {
      return next({
        message: "genre must be provided!",
        statusCode: 400,
      });
    }
    if (!comment || comment == "") {
      return next({
        message: "comment must be provided!",
        statusCode: 400,
      });
    }
    if (!rating || rating == "") {
      return next({
        message: "rating must be provided!",
        statusCode: 400,
      });
    }

    const data = await ulasanUsecase.addUlasan({
      nama_user,
      film_id,
      comment,
      rating,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUlasan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nama_user, film_id, comment, rating } = req.body;
    if (!nama_user || nama_user == "") {
      return next({
        message: "nama_user must be provided!",
        statusCode: 400,
      });
    }
    if (!film_id || film_id == "") {
      return next({
        message: "film_id must be provided!",
        statusCode: 400,
      });
    }
    if (!comment || comment == "") {
      return next({
        message: "comment must be provided!",
        statusCode: 400,
      });
    }
    if (!rating || rating == "") {
      return next({
        message: "rating must be provided!",
        statusCode: 400,
      });
    }

    const data = await ulasanUsecase.updateUlasan(id, {
      nama_user,
      film_id,
      comment,
      rating,
    });

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUlasan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ulasanUsecase.deleteUlasan(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
