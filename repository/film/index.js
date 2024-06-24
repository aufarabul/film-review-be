const crypto = require("crypto");
const path = require("path");
const { uploader } = require("../../helper/cloudinary");
const { film, genre, ulasan } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getFilms = async () => {
  try {
    // Fetch film with eager loading for car_detail and car_availability models
    const data = await film.findAll({
      include: [{ model: genre }, { model: ulasan }],
    });

    // Return the fetched data
    return data;
  } catch (error) {
    console.error("Error fetching film:", error);
    throw error;
  }
};

exports.getFilmbyId = async (id) => {
  const key = `film:${id}`;

  // check redis and if there are any data return data from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // if in the redis not found, we will get from database (postgres) and then save it to redis
  data = await film.findAll({
    where: {
      id,
    },
    include: [{ model: genre }, { model: ulasan }],
  });
  if (data.length > 0) {
    // save in the redis if in the postgres is found
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`film is not found!`);
};

exports.addFilm = async (payload) => {
  if (payload.image_film) {
    // upload image to cloudinary
    const { image_film } = payload;

    // make unique filename -> 213123128uasod9as8djas
    image_film.publicId = crypto.randomBytes(16).toString("hex");

    // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
    image_film.name = `${image_film.publicId}${
      path.parse(image_film.name).ext
    }`;

    // Process to upload image
    const imageUpload = await uploader(image_film);
    payload.image_film = imageUpload.secure_url;
  }
  const data = await film.create(payload);

  // Save to redis (cache)
  const key = `film:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateFilm = async (id, payload) => {
  const key = `film:${id}`;
  if (payload.image) {
    // upload image to cloudinary
    const { image } = payload;

    // make unique filename -> 213123128uasod9as8djas
    image.publicId = crypto.randomBytes(16).toString("hex");

    // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    // Process to upload image
    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }

  // update to postgres
  await film.update(payload, {
    where: {
      id,
    },
  });

  // get from postgres
  const data = await film.findAll({
    where: {
      id,
    },
    include: [{ model: car_detail }, { model: car_availability }],
  });
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  return data;
};

exports.deleteFilm = async (id) => {
  const key = `film:${id}`;

  // delete from postgres
  await film.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
