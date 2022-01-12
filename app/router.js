const express           = require('express');
const router            = express.Router();

const mainController = require('./controllers/mainController');
const utilsMiddleware = require('./middleware/utils');


router.route('/:modelName')
// On ajoute un middleware qui va permettre d'ajouter le modèle dans notre requête
  .all(utilsMiddleware.addModelInRequest)
  .get(mainController.getAll);
  
router.route('/:modelName').post(mainController.create);

// On ajoute une regex qui va permettre a express d'intercepter seulement les url avec un identifiant correspondant à un nombre
router.route('/:modelName/:id(\\d+)')
// On ajoute un middleware qui va permettre d'ajouter le modèle dans notre requête
  .all(utilsMiddleware.addModelInRequest)
  .get(mainController.getOne)
  .patch(mainController.update)
  .delete(mainController.delete);

module.exports = router;