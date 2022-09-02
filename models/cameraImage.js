const mongoose = require('mongoose');
const db = mongoose.connection;
const { createModel } = require('mongoose-gridfs');

const CameraImage = createModel({
    modelName: 'camera_images',
    connection: db
});

module.exports = CameraImage;