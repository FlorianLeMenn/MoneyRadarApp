module.exports = {
    async getAll(req, res) {
      try {
        // Grâce au middleware utiliser juste avant mon controller, le model de ma route est stocké dans la propriété Model de mon objet req.
        var categorizedModels = ['Finance', 'Goal', 'List'];
        let options = {};
        const found = categorizedModels.includes(req.Model.name);

        if (found) {
            options = {
                include: {
                    association: 'taxonomies',
                }
            };
        }
        
        const data = await req.Model.findAll(options);
  
        res.json(data);
      } catch (err) {
        res.status(500).send(err);
      }
    },
    async getOne(req, res, next) {
      try {
        const data = await req.Model.findByPk(req.params.id);
  
        // Si la donnée n'existe pas, on va appeler le middleware suivant, dans notre cas il n'y en a pas. Cela va retourner une 404
        if(!data) {
          // next permet de donnée la main au prochain middleware
          next();
          // Return permet d'empêcher au reste de la fonction de s'exécuter
          return;
        }
  
        res.json(data);
      } catch (err) {
        res.status(500).send(err);
      }
    },
    async create(req, res) {
      try {
        // console.log('CREATE');
        // console.log('BODY = ' + req.body);
        // Je créer ma donnée avec les infos situées dans le body
        // On laisse Sequelize s'occuper de la validation des champs
        const data = await req.Model.create(req.body);
  
        res.json(data);
      } catch (err) {
        res.status(500).send(err);
      }
    },
    async update(req, res, next) {
      try {
        // console.log('UPDATE');
        // console.log('ID = ' + req.params.id);
        // console.log('BODY = ' + req.body);
        // On modifie notre donnée grâce au where. Les données qui seront modifiées seront celle du req.body
        const [nbUpdated, data] = await req.Model.update(req.body, {
          where: {
            id: req.params.id
          },
          // Returning true permet de retourner les données mise à jours
          // elles seront stocker dans le deuxième élément de mon tableau
          returning: true
        });
  
        // Si aucune modification n'a été faite, on retourne une 404
        if(!nbUpdated) {
          // next permet d'appeler le prochain middleware
          next();
          // return empêchera la suite du code de s'exécuter
          return;
        }
  
        // On retourne le premier element modifier car dans notre cas, on modifie une seule donnée
        res.json(data[0]);
  
      } catch (err) {
        res.status(500).send(err);
      }
    },
    async delete(req, res, next) {
      try {
  
        // On supprime la donnée qui a pour identifiant l'id en paramètre.
        // Sequelize nous retourne le nombre d'éléments qui ont été supprimer. Dans notre cas cela sera soit 1, soit 0
        const nbRemoved = await req.Model.destroy({
          where: {
            id: req.params.id
          }
        });
  
        // Si aucun élément n'a été supprimé, c'est que mon identifiant n'existe pas
        if(!nbRemoved) {
          // next permet d'appeler le prochain middleware
          next();
          // return empêchera la suite du code de s'exécuter
          return;
        }
  
        // On retourne le fait que tout est ok
        res.json({
          success: true
        });
  
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }