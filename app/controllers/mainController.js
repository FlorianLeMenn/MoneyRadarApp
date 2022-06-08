const { Op, Sequelize } = require('sequelize')
const {startOfWeek, lastDayOfWeek, startOfMonth, lastDayOfMonth, lastDayOfYear, startOfYear } = require('date-fns');

module.exports = {
    async getAllWithAssociations(req, res, next) {
      try {
        let data = await req.Model.findByPk(req.params.id, {
          include: [req.params.modelNameAssoc]
        });

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
    async getAll(req, res) {
      try {
        
        //default week
        let startedDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        let endDate     = lastDayOfWeek(new Date(), { weekStartsOn: 1 });
        let periodParam = 'day';

        if(req.params.period && req.params.period === "month") {
          startedDate = startOfMonth(new Date());
          endDate     = lastDayOfMonth(new Date());
          periodParam = 'month';
        }
        if(req.params.period && req.params.period === "year") {
          startedDate = startOfYear(new Date());
          endDate     = lastDayOfYear(new Date());
          periodParam = 'year';
        }

        // Grâce au middleware utiliser juste avant mon controller, le model de ma route est stocké dans la propriété Model de mon objet req.
        let options = {
          ...(req.params.period && { attributes: [
            [ Sequelize.fn('date_trunc', periodParam, Sequelize.col('date')), `date_alias`],
            [ Sequelize.fn('sum', Sequelize.col('cost')), 'total']
          ]}),
          ...(req.params.period &&  {group: ['date_alias']}),
          where: {
            date: {
              [Op.between] : [startedDate, endDate],
              //[Op.gte]: startedDate,
              //[Op.lt]: endDate,
            }
          },
          ...(!req.params.period && {order: [
            ['date', 'ASC']
          ]}),
          ...(!req.params.period && {include: {
              association: 'taxonomies',
              attributes: ['id'],
              through: {
                attributes: []
              }    
            }
          }),
        };

        if(req.Model.name != 'Finance') {
          const data = await req.Model.findAll();
          res.json(data);
        }
        else{
          const data = await req.Model.findAll(options);
          res.json(data);
        }
        
      } catch (err) {
        res.status(500).send(err);
      }
    },
    async getOne(req, res, next) {
      try {
        var categorizedModels = ['Vocabulary', 'Finance', 'Goal', 'List', 'Task'];
        let options = {};
        const found = categorizedModels.includes(req.Model.name);
        if (found) {
          options = {
              include: {
                  association: 'taxonomies',
              }
          };
        }
        console.log(req.params)
        const data = await req.Model.findByPk(req.params.id, options);
  
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
        const category = req.body.taxonomies;
        // Je créer ma donnée avec les infos situées dans le body
        // On laisse Sequelize s'occuper de la validation des champs
        const data = await req.Model.create(req.body);
        if(category) {
          const hasCategory = await data.hasTaxonomy(category);
          if(!hasCategory) {
            const newCategory = await data.addTaxonomy(category);
          }
        }
  
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