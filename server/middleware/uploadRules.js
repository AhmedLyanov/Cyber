import upload from '../config/multer.js';

const uploadSingle = upload.single('image');
const uploadMultiple = upload.array('images', 5);

export {
  uploadSingle,
  uploadMultiple
};