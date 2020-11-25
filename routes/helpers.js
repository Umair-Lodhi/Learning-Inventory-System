const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|jfif)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(('Only image files are allowed!'), false);
    }
    cb(null, true);
};
module.exports.imageFilter = imageFilter;