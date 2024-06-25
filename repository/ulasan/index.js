const crypto = require("crypto");
const path = require("path");
const { uploader } = require("../../helper/cloudinary");
const { genre, film, ulasan } = require("../../models");

exports.getUlasans = async () => {
  try {
    // Fetch ulasans with eager loading for ulasan and ulasan models
    const data = await ulasan.findAll({
      include: [{ model: film }],
    });

    // Return the fetched data
    return data;
  } catch (error) {
    console.error("Error fetching ulasans:", error);
    throw error;
  }
};

exports.getUlasanbyId = async (id) => {
  try {
    // Fetch ulasan by id with eager loading for ulasan and ulasan models
    const data = await ulasan.findOne({
      where: { id },
      include: [{ model: film }],
    });

    if (!data) {
      throw new Error(`ulasan not found!`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ulasan by id: ${id}`, error);
    throw error;
  }
};

exports.addUlasan = async (payload) => {
  try {
    // Create new ulasan entry
    const data = await ulasan.create(payload);

    return data;
  } catch (error) {
    console.error("Error adding ulasan:", error);
    throw error;
  }
};

exports.updateUlasan = async (id, payload) => {
  try {
    // Update ulasan in the database
    await ulasan.update(payload, {
      where: { id },
    });

    // Fetch the updated ulasan
    const data = await ulasan.findOne({
      where: { id },
      include: [{ model: ulasan }],
    });

    if (!data) {
      throw new Error(`ulasan not found!`);
    }

    return data;
  } catch (error) {
    console.error(`Error updating ulasan with id: ${id}`, error);
    throw error;
  }
};

exports.deleteUlasan = async (id) => {
  try {
    // Delete ulasan from the database
    const result = await ulasan.destroy({ where: { id } });

    if (!result) {
      throw new Error(`ulasan not found!`);
    }

    return null;
  } catch (error) {
    console.error(`Error deleting ulasan with id: ${id}`, error);
    throw error;
  }
};
