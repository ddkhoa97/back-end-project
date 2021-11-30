
var multer = require('multer');
const path = require('path');



  const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/images', 
      filename: (req, file, cb) => {
          cb(null,  Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
  const imageUpload = multer({
    storage: imageStorage,

    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

module.exports = multer({ imageUpload });
