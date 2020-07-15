const multer = require ('multer')
const crypto = require ('crypto')
const path = require ('path')

module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'front-end', 'src', 'images'));
          }, 
        filename: (req, file, cb) => {
            crypto.randomBytes (16, (err, res) => {
                if (err) return cb(err)

                return cb (null, res.toString('hex')+ '.' + file.originalname.split('.').pop())
            })
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        const allowMimes = [
            'image/pjeg',
            'image/jpeg',
            'image/jpg',            
            'image/png',
            'image/tiff',
            'image/gif',
            'image/svg']
        if(allowMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Extensão inválida'))
        }
    },
}

