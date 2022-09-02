const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileInfo = {
                bucketName: 'camera_images'
            };
            resolve(fileInfo);
        });
    }
});
module.exports = multer({ storage });