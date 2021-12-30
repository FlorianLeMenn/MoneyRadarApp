// const {Finance} = require("../models");

// const financeController = {

//     // On va utiliser sequelize et donc utiliser des promise. Reflexe => async + try / catch
//     getAllFinance: async (req, res) => {
//         try {
//             const finances = await Finance.findAll({
//                 include: {
//                     association: 'categories',
//                 }
//             });

//             res.json(finances);
//         } catch (err) {
//             res.status(500).send(err);
//         }
//     },
//     getOneFinance: async (req, res, next) => {
//         try {
//             // List.findByPk va nous retourner notre list ou null si elle n'existe pas
//             const id = parseInt(req.params.id);
//             const finance = await Finance.findByPk(id);

//             // Si la liste n'existe pas, on va appeler le middleware suivant, dans notre cas il n'y en a pas. Cela va retourner une 404
//             if (!finance) {
//                 // next permet de donnée la main au prochain middleware
//                 next();
//                 // Return permet d'empêcher au reste de la fonction de s'executer
//                 return;
//             }

//             res.json(finance);
//         } catch (err) {
//             res.status(500).send(err);
//         }
//     },
//     createFinances: async (req, res) => {
//         try {
//             // Je créer ma liste avec les données situé dans le body
//             // On laisse Sequelize s'occuper de la validation des champs
//             const finance = await Finance.create(req.body);

//             res.json(finance);
//         } catch (err) {
//             res.status(500).send(err);
//         }
//     },
//     updateFinances: async (req, res, next) => {
//         try {
//             // On modifie notre list grâce au where. Les données qui seront modifier seront celle du req.body
//             const [nbListUpdated, finances] = await Finance.update(req.body, {
//                 where: {
//                     id: parseInt(req.params.id)
//                 },
//                 // Returning true permet de retourner les données mise à jours
//                 // elles seront stocker dans le deuxième élément de mon tableau
//                 returning: true
//             });

//             // Si aucune modification n'a été faite, on retourne une 404
//             if (!nbListUpdated) {
//                 // next permet d'appeler le prochain middleware
//                 next();
//                 // return empêchera la suite du code de s'executer
//                 return;
//             }

//             // On retourne le premier element modifier car dans notre cas, on modifie une seule donnée
//             res.json(finances[0]);

//         } catch (err) {
//             res.status(500).send(err);
//         }
//     },
//     deleteFinances: async (req, res) => {
//         try {
//             // On supprime la liste qui a pour identifiant l'id en paramètre.
//             // Sequelize nous retourne le nombre d'élément qui ont été supprimer. Dans notre cas cela sera soit 1, soit 0
//             const nbRemoved = await Finance.destroy({
//                 where: {
//                     id: parseInt(req.params.id)
//                 }
//             });

//             // Si aucun élément n'a été supprimer, c'est que mon identifiant n'existe pas
//             if (!nbRemoved) {
//                 // next permet d'appeler le prochain middleware
//                 next();
//                 // return empêchera la suite du code de s'executer
//                 return;
//             }

//             // On retourne le fait que ça ce soit bien passé
//             res.json({
//                 success: true
//             });

//         } catch (err) {
//             res.status(500).send(err);
//         }
//     }
// }

// module.exports = financeController;