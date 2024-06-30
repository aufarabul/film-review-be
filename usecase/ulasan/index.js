const UlasanRepo = require("../../repository/ulasan");

exports.getUlasans = async () => {
  const data = await UlasanRepo.getUlasans();
  return data;
};

exports.getUlasanbyId = async (id) => {
  const data = await UlasanRepo.getUlasanbyId(id);
  return data;
};

exports.addUlasan = async (payload) => {
  const data = await UlasanRepo.addUlasan(payload);
  return data;
};

exports.updateUlasan = async (id, payload) => {
  // update old data
  await UlasanRepo.updateUlasan(id, payload);

  // find the new data
  const data = await UlasanRepo.getUlasanbyId(id);

  return data;
};

exports.deleteUlasan = async (id) => {
  const data = await UlasanRepo.deleteUlasan(id);
  return data;
};
