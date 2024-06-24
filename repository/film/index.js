const crypto = require("crypto");
const path = require("path");
const { uploader } = require("../../helper/cloudinary");
const { film, genre, ulasan } = require("../../models");

exports.getFilms = async () => {
  try {
    // Fetch films with eager loading for genre and ulasan models
    const data = await film.findAll({
      include: [{ model: genre }, { model: ulasan }],
    });

    // Return the fetched data
    return data;
  } catch (error) {
    console.error("Error fetching films:", error);
    throw error;
  }
};

exports.getFilmbyId = async (id) => {
  try {
    // Fetch film by id with eager loading for genre and ulasan models
    const data = await film.findOne({
      where: { id },
      include: [{ model: genre }, { model: ulasan }],
    });

    if (!data) {
      throw new Error(`Film not found!`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching film by id: ${id}`, error);
    throw error;
  }
};

exports.addFilm = async (payload) => {
  try {
    if (payload.image_film) {
      // Upload image to Cloudinary
      const { image_film } = payload;

      // Create a unique filename
      image_film.publicId = crypto.randomBytes(16).toString("hex");

      // Rename the file
      image_film.name = `${image_film.publicId}${
        path.parse(image_film.name).ext
      }`;

      // Process to upload image
      const imageUpload = await uploader(image_film);
      payload.image_film = imageUpload.secure_url;
    }

    // Create new film entry
    const data = await film.create(payload);

    return data;
  } catch (error) {
    console.error("Error adding film:", error);
    throw error;
  }
};

exports.updateFilm = async (id, payload) => {
  try {
    if (payload.image) {
      // Upload image to Cloudinary
      const { image } = payload;

      // Create a unique filename
      image.publicId = crypto.randomBytes(16).toString("hex");

      // Rename the file
      image.name = `${image.publicId}${path.parse(image.name).ext}`;

      // Process to upload image
      const imageUpload = await uploader(image);
      payload.image = imageUpload.secure_url;
    }

    // Update film in the database
    await film.update(payload, {
      where: { id },
    });

    // Fetch the updated film
    const data = await film.findOne({
      where: { id },
      include: [{ model: genre }, { model: ulasan }],
    });

    if (!data) {
      throw new Error(`Film not found!`);
    }

    return data;
  } catch (error) {
    console.error(`Error updating film with id: ${id}`, error);
    throw error;
  }
};

exports.deleteFilm = async (id) => {
  try {
    // Delete film from the database
    const result = await film.destroy({ where: { id } });

    if (!result) {
      throw new Error(`Film not found!`);
    }

    return null;
  } catch (error) {
    console.error(`Error deleting film with id: ${id}`, error);
    throw error;
  }
};
