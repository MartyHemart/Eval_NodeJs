var express = require('express');
var router = express.Router();
var mongo = require('../bin/mongo');

const MongoClient = require('mongodb').MongoClient ;
const ObjectId = require('mongodb').ObjectId ;
const url = "mongodb://localhost:27017/reddit" ;
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const twig = require('twig').twig;

/**
* Création d'un Contact
*/
router.post('/', (req, res) => {
  // Vérifier les données reçu en post
  var p1 = request.body.p1;
  console.log("p1=" + p1);
  mongo.getInstance().collection('contacts').findOne({email : req.body.email},
    (err, mail) => {
      if(err) throw err;
      if(!mail)
      {
        try{
          mongo.getInstance().collection('contacts').insertOne({
            nom : req.body.nom,
            prenom : req.body.prenom,
            description : req.body.description,
            tel : req.body.tel,
            email : req.body.email,
            avatar : req.body.avatar
          });
        }catch (e) {
          print (e);
        };
        res.send ({ ok : true + ' Nouveau contact enregistrer' });
      }
      else
      {
        res.send ({ ok : false + ' Contact déjà présent' });
      }
    })
  })

  /**
  * Afficher un Contact
  */
  router.get('/:id', function(req, res, next) {
    mongo.getInstance().collection('contacts').findOne(
      {_id : ObjectId( req.params.id)},
      (err, result) => {
        if (err) throw err;
        res.send({ok:true, result});
      }
    );
  });

  /**
  * Supprésion d'un contact
  */
  router.delete('/:id', (req, res) => {
    mongo.getInstance().collection('contacts').remove({_id: ObjectID(req.body.id)},
    (err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send({ok:true, result: result});
    });
  })

  module.exports = router;
