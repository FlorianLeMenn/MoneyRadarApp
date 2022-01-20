require('dotenv').config(); 

// Je récupère ma connection sequelize afin de lancer le sync
const sequelize = require('./app/database');
const {Finance, Goal, Habit, Task, User, Tag, List, Taxonomy, Vocabulary} = require('./app/models');

const run = async () => {
    await sequelize.sync({force: true});

    const categories= ['mauvaise habitudes', 'bonne habitude', 'dépense', 'gain', 'sport', 'mindset', 'corvées'];
    const vobalularies = ['Dépense', 'Habitude', 'Mindset', 'But', 'Tache'];
    const taxonomies = [
        { text: 'Taxes', value: 0, children:
            [
                { text: 'Impots / taxes', value: 1 },
            ],
        },
        { text: 'Santé', value: 2, children:
            [
                { text: 'Santé - Assurance', value: 3 },
                { text: 'Santé - Médicaments & autres', value: 4 },
            ],
        },
        { text: 'Transports', value: 5, children: 
            [
                { text: 'Transport en commun', value: 6 }
            ],
        },
        { text: 'Courses', value: 7, children:
            [
                { text: 'Alimentaire', value: 8 },
                { text: 'Cosmétique', value: 9 },
                { text: 'Produits d\'entretient', value: 10 },
            ],
        },
        { text: 'Logement', value: 11, children:
            [
                { text: 'Mobilier & accessoires', value: 12 },
                { text: 'Décoration', value: 13 },
                { text: 'Jardin', value: 14 },
                { text: 'Assurance', value: 15 },
            ],
        },
        { text: 'Voiture', value: 16, children:
            [
                { text: 'Carburrant', value: 17 },
                { text: 'Amendes', value: 18 },
                { text: 'Réparation', value: 19 },
                { text: 'Entretient', value: 20 },
                { text: 'Assurance', value: 21 },
            ],
        },
        { text: 'Abonnements', value: 22, children:
            [
                { text: 'Téléphone', value: 23 },
                { text: 'Box internet', value: 24 },
                { text: 'Autres', value: 25 },
            ],
        },
        { text: 'Loisirs', value: 26, children:
            [
                { text: 'Sortie', value: 27 },
                { text: 'Restaurant', value: 28 },
                { text: 'Cadeaux', value: 29 },
                { text: 'Vacance', value: 30 },
                { text: 'Vêtements', value: 31 },
                { text: 'Gadget', value: 32 },
            ],
        },
        { text: 'Apprentissage', value: 29, children:
            [
                { text: 'Formation & cours', value: 30 },
                { text: 'Livre', value: 31 },
            ],
        },
        { text: 'Autre', value: 32, children:  
            [
                { text: 'Bureautique', value: 33 }
            ],
        },
    ];
    const habits    = ['Ranger chambre', 'lire les mails', 'pompes'];
    const goals     = ['Clean', 'Faire du sport'];
    const tasks     = ['faire les courses', 'appeler mamie', 'vendre tv'];

    const tag = await Tag.create({
        name: 'Best of the world',
        color: '#F0F'
    });

    //creation des vocabulaires
    console.log("==== VOCABULAIRES ====");
    for (const voc of vobalularies) {
        const newVoc = await Vocabulary.create({
            name: voc,
        })
        console.log("------------" + newVoc.name)
    }

    //creation des taxo habits
    console.log("==== TAXO HABITUDES ====");
    for (const taxo of habits) {
        const newTaxo = await Taxonomy.create({
            name: taxo,
            description: '',
            weight: 0,
            vid: 2,
        })
        console.log("----" + newTaxo.name + ' [' + newTaxo.id + ']')
    }

    //creation des taxo but
    console.log("==== TAXO BUTS ====");
    for (const taxo of goals) {
        const newTaxo = await Taxonomy.create({
            name: taxo,
            description: '',
            weight: 0,
            vid: 4,
        })
        console.log("----" + newTaxo.name + ' [' + newTaxo.id + ']')
    }

    //creation des taxo but
    console.log("==== TAXO TACHES ====");
    for (const taxo of tasks) {
        const newTaxo = await Taxonomy.create({
            name: taxo,
            description: '',
            weight: 0,
            vid: 5,
        })
        console.log("----" + newTaxo.name + ' [' + newTaxo.id + ']')
    }

     //creation des taxo dépense
     console.log("==== TAXO DEPENSES ====");
     for (const taxo of taxonomies) {
         
        const newTaxo = await Taxonomy.create({
            name: taxo.text,
            description: '',
            weight: 0,
            vid: 1,
        })
        console.log("----" + newTaxo.name + ' [' + newTaxo.id + ']')

        //create children
        if (taxo.children) {
            for (const [index, child] of taxo.children.entries()) {
               const newChildTaxo = await Taxonomy.create({
                   name: child.text,
                   weight: index,
                   vid: 1,
                   parent: newTaxo.id,
               })
               console.log("--------" + newChildTaxo.name + ' [' + newChildTaxo.id + ']')
           }
        }
        console.log("===============");
    }

    const newFinance = await Finance.create({
        title: 'Finance test',
    });
    //Ajout de la catégorie
    await newFinance.addTaxonomy(21);

    const newList = await List.create({
        title: 'Liste test',
        order: 0
    });

    //Ajout de la catégorie corvée
    await newList.addTaxonomy(6);

    console.log("==== CREATION TACHES ====");
    for (const task of tasks) {
        const newTask = await Task.create({
            title: task,
            list_id: newList.id,
        })
        console.log("-------" + newTask.title)
    }

    const newUser = await User.create({
        username: 'Florian',
        email: 'test@test.fr',
        password: 'hello',
        birthday: '2021-10-19'
    });

    console.log("==== CREATION BUTS ====");
    for (const goal of goals) {

        const newGoal = await Goal.create({
            title: goal,
            start: '2021-10-19 10:23:54+02',
            end: '2021-10-19 11:23:54+02',
            user_id: newUser.id,
        });
        console.log("---" + newGoal.title)

        //ajout d'une nouvelle catégorie sur l'objectif
        await newGoal.addTaxonomy(3);

        //ajout des habitudes à travailler pour atteindre l'objectif
        console.log("==== CREATION HABITUDE ====");
        for (const habit of habits) {
            const newHabit = await Habit.create({
                action: habit,
                start: '2021-10-19 10:23:54+02',
                end: '2021-10-19 11:23:54+02',
                score: 1,
                recurrent: true,
                interval: 1,
                periodicity: 1,
                goal_id: newGoal.id, 
            })
            console.log("-------" + newHabit.action)
        }
    }
}

run();