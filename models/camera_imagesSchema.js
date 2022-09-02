const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gridSchema = new Schema({},{ strict: false });
const Grid = mongoose.model("Grid", gridSchema, "camera_images.files" );

module.exports = Grid;