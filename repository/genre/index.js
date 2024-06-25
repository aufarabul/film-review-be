const crypto = require("crypto");
const path = require("path");
const { uploader } = require("../../helper/cloudinary");
const { genre, film, ulasan } = require("../../models");

exports.getGenres = async () => {
  try {
    // Fetch genres with eager loading for genre and ulasan models
    const data = await genre.findAll({
      include: [{ model: film }],
    });

    // Return the fetched data
    return data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

exports.getGenrebyId = async (id) => {
  try {
    // Fetch genre by id with eager loading for genre and ulasan models
    const data = await genre.findOne({
      where: { id },
      include: [{ model: film }],
    });

    if (!data) {
      throw new Error(`genre not found!`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching genre by id: ${id}`, error);
    throw error;
  }
};

exports.addGenre = async (payload) => {
  try {
    // Create new genre entry
    const data = await genre.create(payload);

    return data;
  } catch (error) {
    console.error("Error adding genre:", error);
    throw error;
  }
};

exports.updateGenre = async (id, payload) => {
  try {
    // Update genre in the database
    await genre.update(payload, {
      where: { id },
    });

    // Fetch the updated genre
    const data = await genre.findOne({
      where: { id },
      include: [{ model: genre }],
    });

    if (!data) {
      throw new Error(`genre not found!`);
    }

    return data;
  } catch (error) {
    console.error(`Error updating genre with id: ${id}`, error);
    throw error;
  }
};

exports.deleteGenre = async (id) => {
  try {
    // Delete genre from the database
    const result = await genre.destroy({ where: { id } });

    if (!result) {
      throw new Error(`genre not found!`);
    }

    return null;
  } catch (error) {
    console.error(`Error deleting genre with id: ${id}`, error);
    throw error;
  }
};
