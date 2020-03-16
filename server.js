import nanoexpress from 'nanoexpress';
import cors from 'cors';
import ffmpeg from 'fluent-ffmpeg';
import fileUpload from 'express-fileupload';

var PORT = 8080;
var HOST = '0.0.0.0';

const app = nanoexpress();
app.use(cors());

app.use(fileUpload({ useTempFiles: true }));
app.post('/transcode', (req, res) => {
    console.debug('files', req.files);
    console.debug('body', req.body);

    if (Object.keys(req.files).length === 1) {
        return res.status(400).send('One file at a time please');
    }

    res.contentType('audio/mp4');
    res.attachment('myfile.mp4');    

    // tmp is the default temp files dir for express-fileupload
    ffmpeg('/tmp/' + req.file.name)
        .toFormat(mp4)
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