const { Data } = require("../db/Schema");

const getData = async (req, res) => {
  const data = await Data.find({});
  res.json(data);
};
async function getDataById(req, res) {
  const { id } = req.params;
  try {
    const data = await Data.findById(id);
    if (!data) {
      throw new Error();
    }
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({ message: "Not found" });
  }
}
module.exports = {
  getData,
  getDataById,
};
