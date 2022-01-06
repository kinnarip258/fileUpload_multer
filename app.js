const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

//set storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    //request, file and callback
    filename: function(req, file, cb){
        //error, filename - add date so name can't be same - find extension of the file , 
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }
});

//storage of the file
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req,file, cb){
        checkFileType(file, cb)
    }
}).single('myFile');

//check file type
function checkFileType(file, cb){
    //allowed extention
    const filetypes = /jpeg|jpg|png|gif/;
    //check extention
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype &&  extname){
        return cb(null, true)
    }
    else{
        cb("Error: Images Only!!")
    }
}


//init app
const app = express();

//ejs
app.set('view engine', 'ejs');

//public folder
app.use(express.static('./public'))

//get the index page
app.get('/', (req,res) => res.render('index'));

//post the file
app.post('/upload', (req,res) => {
    upload(req,res,(err) => {
        if(err) {
            res.render('index', {
                msg: err
            })
        }
        else{
            if(req.file === undefined){
                res.render('index', {
                    msg: 'Errror : No file Selected!'
                })
            }
            else{
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                })
            }
        }
    })
})

app.listen(9000, () => {
    console.log(`server started at 9000...`)
})