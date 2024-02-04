const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../public/upload'))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1*1024*1024,//limit file size to 1 mb
    },
    fileFilter:(req,file,cb)=>{
        // const allowedFileTypes =['image/jpeg','image/png','image/jpg','image/avif','image/gif']
        const allowedFileTypes =['text/csv','application/csv']
        if(allowedFileTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
            // cb(new Error('Invalid file type. Only jpg,png,jpeg,avif, and gif are allowed...'))
            cb(new Error('Invalid file type. Only allowed CSV File...'))
        }
    }
}).single('file')
module.exports=upload