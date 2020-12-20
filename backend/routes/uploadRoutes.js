import aws from 'aws-sdk';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
const router = express.Router();

dotenv.config();

aws.config.update({
  secretAccessKey: process.env.Secret_Access_Key,
  accessKeyId: process.env.Access_Key_ID,
  region: 'eu-west-2',
});

var s3 = new aws.S3();

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'camphunt-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'TESTING META DATA!' });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  res.send(req.file.location);
});

export default router;
