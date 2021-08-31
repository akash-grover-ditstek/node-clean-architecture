const express = require('express');
cors = require('cors')
const helmet = require('helmet');
const path = require('path');
const Routes = require('./src/routes');
const db = require('./src/database');
const env = require('dotenv')
const multer = require('multer')

const app = express();

const directoryName = __dirname
env.config({
  path: `${directoryName}/config/.env`
})

const port = process.env.PORT || 4444;


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
// app.use(helmet());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}


const upload = multer({ storage: storage, fileFilter: fileFilter })

const appRoutes = express.Router();
app.use('/uploads', express.static('uploads'));
appRoutes.route('/')
  .get((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({
      status: {
        application: "up"
      }
    })
  })

app.use('/', Routes({ multi: upload,db:db }));


app.use('/', appRoutes);
app.use((error, req, res, next) => {
  console.log(error.message)
  res.status(500).json({ error: error.message })
});
app.listen(port, () => {
  console.log(`Listening on ${port}. http://localhost:${port}`);
});
