var express = require('express');
var fs = require('fs');
var ytdl = require('ytdl-core');
var app = express();
var { port } = require('./data/server_port.json');

app.use(express.json());
app.use(express.static("assets"));

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/assets/html/index.html');
});

app.get('/mp4', (req,res) => {
  res.sendFile(__dirname + '/assets/html/mp4.html');
});

app.get('/api/', (req,res) => {
  res.send('<center><h1>Hello world</h1></center>');
});

app.get('/api/callback', async (req,res) => {
  var url = req.query.url;
  var stream = await ytdl.getInfo(url);
  var videoURL = stream.videoDetails.url;
  var videoTitle = stream.videoDetails.title;
  var someInformations = stream.videoDetails;

  var writeStream = fs.writeFileSync('./data/user_recent_callback.txt', `Date: ${Date.now()} | Infos: ${someInformations}`);

  var filename = videoTitle + '.mp3';

  console.log(filename);

  res.setHeader('Content-disposition', 'attachment;filename=' + filename);

  ytdl(url, {
    quality: 'highest',
    format: 'mp3'
  }).pipe(res);
});

app.get('/api/callback/output/video/mp4', async (req,res) => {
  var url = req.query.url;
  var stream = await ytdl.getInfo(url);
  var videoURL = stream.videoDetails.url;
  var videoTitle = stream.videoDetails.title;
  var someInformations = stream.videoDetails;

  var writeStream = fs.writeFileSync('./data/user_recent_callback.txt', `Date: ${Date.now()} | Infos: ${someInformations}`);

  var filename = videoTitle + '.mp4';

  console.log(filename);

  res.setHeader('Content-disposition', 'attachment;filename=' + filename);

  ytdl(url, {
    quality: 'highest',
    format: 'mp4'
  }).pipe(res);
});

app.listen(port, () => {
  console.log('Server connected');
});
