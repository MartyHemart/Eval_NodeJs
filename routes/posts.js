var express = require('express');
var mongo = require('../bin/mongo');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const twig = require('twig').twig;

/*
*   Afficher de tout les contacts par ordres alphabetique
*/
router.get('/', function (req, res, next) {
  console.log(req.body);
  mongo.getInstance().collection('contacts').find({ "nom": { "$exists": true } }).sort({'nom': 1}).toArray((err,results)=>{
    // if(err) throw err;
    res.render('post', {  results: results})
  });
});

/**
* Afficher un Contact
*/
router.get('/:id', function(req, res, next) {
  mongo.getInstance().collection('contacts').findOne(
    {_id : ObjectId( req.params.id)},
    (err, result) => {
      if (err) throw err;
      res.send('post', {result : result});
    }
  );
});

module.exports = router;
