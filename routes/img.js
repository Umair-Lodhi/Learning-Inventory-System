const multer = require('multer');
const express = require('express');
const router = express.Router();
const assert = require('assert');

const upload = multer({dest:'uploads/'}).single("demo_image");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({storage: storage});
router.post('/', upload.single('image'), (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        insertDocuments(db, 'public/images/uploads/' + req.file.filename, () => {
            db.close();
            res.json({'message': 'File uploaded successfully'});
        });
    });
});
module.exports = router;