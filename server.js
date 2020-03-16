import nanoexpress from 'nanoexpress';
import cors from 'cors';
import ffmpeg from 'fluent-ffmpeg';
import fileUpload from 'express-fileupload';

var PORT = 8080;
var HOST = '0.0.0.0';
var tempDir = '/tmp/'

const app = nanoexpress();
app.use(cors());

app.use(fileUpload({ 
    useTempFiles: true,
    tempFileDir: tempDir,
}));
app.post('/transcode/:format', (req, res) => {
    console.debug('files', req.files);
    console.debug('body', req.body);

    if (Object.keys(req.files).length === 1) {
        return res.status(400).send('One file at a time please');
    }
    const { videoFile } = req.files;
    const fileName = videoFile.name;
    
    const { format } = req.params;
    res.contentType('video/' + format);
    res.attachment('myfile.' + format);    

    ffmpeg(tempDir + fileName)
        .toFormat(format)
        .on('progress', function(progress) {
            console.log('Processing' + fileName + ': ' + progress.percent + '% done');
          })
        .on('end', function (err) {
            console.log('Done!')
        })
        .on('error', function (err) {
            console.log('Error: ' + err.message);
        })
        .pipe(res, { end: true })
    
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);