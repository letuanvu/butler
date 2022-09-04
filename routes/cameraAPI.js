const express = require('express');
const router = express.Router();
const CameraImage = require('../models/cameraImage');
const mongoose = require('mongoose');
const upload = require('../uploads/cameraImageUpload');
const CameraImageMetadata = require('../models/camera_imagesSchema');
const _ = require('lodash');
const ApiAuthenticate = require('../middleware/ApiAuthenticate');
const authenticate = require('../middleware/authenticate');

router.post('/camera/upload', [ApiAuthenticate, upload.single('image')], (req, res) => {
    res.send('ok');
});

router.get('/camera/show/:id', authenticate, async (req, res) => {
    try {
        const fileInfo = await CameraImageMetadata.findById(req.params.id);
        if (!!fileInfo) {
            CameraImage.read({ _id: mongoose.Types.ObjectId(req.params.id) }, (error, buffer) => {
                res.set({'Content-Type': _.get(fileInfo, 'contentType', 'image/jpg')});
                return res.send(buffer);
            });
        } else {
            res.status(404);
            return res.send(404);
        }
    } catch (err) {
        res.status(404);
        return res.send(404);
    }
})

router.get('/camera/list', authenticate, async (req, res) => {
    CameraImageMetadata.find({}, (err, rows) => {
        let images = {};
        console.log(rows)
        rows.forEach(function(image) {
            images[image._id] = image;
        });

        res.status(200).send(images);
    })
})

module.exports = router;
