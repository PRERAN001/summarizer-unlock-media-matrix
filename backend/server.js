import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
const app = express();
import dotenv from 'dotenv';
dotenv.config();    
app.use(cors());
app.use(morgan('dev'));
app.use('/public', express.static('public'));
app.use(express.json({ limit: '16kb' }));
const storage = multer.memoryStorage();
const upload = multer({ storage });
const storage2=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,"video.mp4")
    }
})
const upload2=multer({storage:storage2})

const storage3=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./resourse')
    },
    filename:(req,file,cb)=>{
        cb(null,"resourse.pdf")
    }
})
const upload3=multer({storage:storage3})

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);       
});
app.post('/pdf_txt',upload3.single('pdf'),async(req,res)=>{
    try{
        const query = req.body.query;
        const formData = new FormData();
        formData.append("query", query);
        
       
        const response = await axios.post(
            process.env.base_url+'/pdf_txt',
            formData,
            { headers: formData.getHeaders() }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to process pdf' });
    }
})
app.post('/text_txt',async (req,res)=>{
    try{
        const {text}=req.body;
        const response = await axios.post(
            process.env.base_url+'/text_txt',
            {text:text}
        );
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to process text' });
    }
})
app.post('/yt_video_txt',async(req,res)=>{
    try{
        const {yt_video}=req.body;
        const response = await axios.post(
            process.env.base_url+'/yt_video_txt',
            {yt_url:yt_video}
        );
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to process yt_video' });
    }
})
app.post('/img_txt', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const formData = new FormData();
        formData.append(
            'image',
            req.file.buffer,
            req.file.originalname
        );
        

        const response = await axios.post(
            process.env.base_url+'/img_txt',
            formData,
            { headers: formData.getHeaders() }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to process image' });
    }
});
app.use('/video_txt',upload2.single('video'),async (req,res)=>{
    try {
        const formData = new FormData();
        formData.append('video', fs.createReadStream(req.file.path), req.file.filename || 'video.mp4');

        const response = await axios.post(
            process.env.base_url+'/video_txt',
            formData,
            { headers: formData.getHeaders() }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to process video' });
    }
})
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message, field: err.field });
    } else if (err) {
        return res.status(500).json({ error: err.message });
    }
    next();
});

const pdfstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public')
    },
    filename:(req,file,cb)=>{
        cb(null,"uploadedpdf.pdf")
    }
})
const pdfupload=multer({storage:pdfstorage})
app.post('/pdf-scrap/upload/pdf',pdfupload.single('pdf'),async (req,res)=>{
    res.sendStatus(200);
})
    
const uploadq = multer();

app.post(
  "/pdf-scrap/query",
  uploadq.none(), 
  async (req, res) => {
    try {
      console.log("entered");

      const query = req.body.query;
      console.log("QUERY:--------------------------------------------", query);

      if (!query) {
        return res.status(400).json({ error: "Query is missing" });
      }

      const formData = new FormData();
      formData.append("query", query);

      const response = await axios.post(
        process.env.base_url+'/pdf-scrap/upload',
        formData,
        {
          headers: formData.getHeaders()
        }
      );

      
      res.json(response.data);

    } catch (err) {
      console.error("Node → Python error:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
const storageaudio=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./audio')
    },
    filename:(req,file,cb)=>{
        cb(null,"uploadedaudio.mp3")
    }
})
const audioupload=multer({storage:storageaudio})
app.use('/audio_txt',audioupload.single('audio'),async (req,res)=>{
    try{
        const formData = new FormData();
        formData.append("query", req.body.query);
        
        const response = await axios.post(
            process.env.base_url+'/audio_txt'
 
);

res.json(response.data);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to process audio' });
    }
})