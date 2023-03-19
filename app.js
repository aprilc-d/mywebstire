const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ejs = require('ejs');



var isFrench = false;

//creating server
const app = express();

app.use(express.static('public'));

//connecting to db, can only listen for requests if we connect to db
const dbURI = "mongodb+srv://personalwebsite:Lwm43yh4vtDT8kqn@cluster0.g58pk4f.mongodb.net/?retryWrites=true&w=majority";

//mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

//  .then(result => {
//    console.log('connected to db');
//    app.listen(3000)})

//  .catch(err => console.log(err));

app.listen(3000);

//configure ejs settings
ejs.delimiter = '/';
ejs.openDelimiter = '[';
ejs.closeDelimiter = ']';

//set view engine, ejs
app.set('view engine', 'ejs');

//importing data from front end
app.use(express.urlencoded({extended: true}));

//data logging  
app.use(morgan('dev'));

//processing requests

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

app.post('/lang', (request, response) => {
    isFrench = !isFrench;
    response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    response.redirect('/lang');
})

app.get('/lang', (request, response) => {
    response.redirect('/');
})
app.get('/', (request, response) => {

    if (isFrench) {
        response.render('indexjr', {title: 'Accueil', lang: isFrench, path: '/'});
    } else  {
        response.render('index', {title: 'Home', lang: isFrench, path: '/'});
    }

})

app.get('/about-me', (request, response) => {
    if (isFrench) {
        response.render('aboutfr', {title: 'À propos', lang: isFrench, path: '/projects'})
    } else {
        response.render('about', {title: 'About Me', lang: isFrench, path: '/about-me'}) 
    }

    
})

app.get('/projects', (request, response) => {
    if (isFrench) {
        response.render('projectsfr', {title: 'Projets', lang: isFrench, path: '/projects'})
    } else {
        response.render('projects', {title: 'Projects', lang: isFrench, path: '/projects'});
    }
})

app.get('/projects/chessapp', (req, res) => {
    if (isFrench) {
        res.render('chess', {title: 'Chess App', lang: isFrench, path: '/projects/chessapp'})
    } else {
        res.render('chess', {title: 'Échecs', lang: isFrench, path: '/projects/chessapp'})
    }
})

app.get('/projects/uno', (req, res) => {
    if (isFrench) {
        res.render('unofr', {title: 'Uno', lang: isFrench, path: '/projects/uno'})
    } else {
        res.render('uno', {title: 'Uno', lang: isFrench, path: '/projects/uno'})
    }
})

app.get('/projects/series', (req, res) => {
    if (isFrench) {
        res.render('seriesfr', {title: 'Series', lang: isFrench, path: '/projects/series'})
    } else {
        res.render('series', {title: 'Séries', lang: isFrench, path: '/projects/series'})
    }
})

app.get('/projects/website', (req, res) => {
    if (isFrench) {
        res.render('websitefr', {title: 'My Website', lang: isFrench, path: '/projects/website'})
    } else {
        res.render('website', {title: 'Ce site web', lang: isFrench, path: '/projects/website'})
    }
})

app.use((req, res) => {
    if (isFrench) {
        res.render('404fr', {title: 'Erreur 404', lang: isFrench, path: '/404'})
    } else {
        res.render('404', {title: 'Error 404', lang: isFrench, path: '/404'})
    }
})
