var express = require('express');
var router = express.Router();
var mongo = require('../bin/mongo');

const MongoClient = require('mongodb').MongoClient ;
const ObjectId = require('mongodb').ObjectId ;
const url = "mongodb://localhost:27017/reddit" ;
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const twig = require('twig').twig;

/* Afficher les 3 derniers contacts */
router.get('/', function(req, res, next) {
  mongo.getInstance().collection('contacts').find().limit(3).toArray((err, contacts) => {
    res.render('index', { title: 'Agenda', contacts : contacts});
  })
});


module.exports = router;
