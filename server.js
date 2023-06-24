const express = require('express')
const mongoose = require('mongoose')
const shortId = require('shortid')
const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener", {useNewUrlParser: true, useUnifiedTopology:true });

// Schema
const UrlShortenerSchema = new mongoose.Schema({
  full: {
    type: String,
    unique: true,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    // required: true,
  },
  clicks: {
    type: Number,
    required: true,
  },
});

const ShortUrl = mongoose.model("ShortUrl", UrlShortenerSchema)

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/ShortUrl', (req, res) => {
  res.render('ShortUrl')
})

app.post('/CreateShortUrl', async (req, res) => {
  const clicks=0;
  const full = req.body.FullUrl.endsWith('/') ? req.body.FullUrl.slice(0, -1) : req.body.FullUrl;
  const note = req.body.UrlNotes;

  const check_status = await ShortUrl.findOne({ full });
  if (check_status) {
    res.render('AlreadyExists')
  }

  const short = 'http://localhost:5000/' + shortId.generate();


  const newUrl = new ShortUrl({full, short, note, clicks});

  await newUrl.save();

  res.render('DisplayShortUrl', { fullUrl: newUrl.full, shortUrl: newUrl.short, n: newUrl.note})
})

app.get('/Search', (req, res) => {
  res.render('Search')
})

app.get('/SearchResults', async (req, res) => {
  const searchText = String(req.query.searchText);

  const results = await ShortUrl.find({
    $or: [
      { full: { $regex: searchText, $options: 'i' } },
      { short: { $regex: searchText, $options: 'i' } },
      { note: { $regex: searchText, $options: 'i' } },
    ],
  });

  res.render('DisplaySearch', { results });
})


app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: 'http://localhost:5000/' + req.params.shortUrl }) 
  if(shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);