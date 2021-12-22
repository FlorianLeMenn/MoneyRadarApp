require('dotenv').config(); 

// Je récupère ma connection sequelize afin de lancer le sync
const sequelize = require('./app/database');
const {Finance, Goal, Habit, Task, User, Tag, List, Category} = require('./app/models');

const run = async () => {
    await sequelize.sync({force: true});

    const categories= ['mauvaise habitudes', 'bonne habitude', 'dépense', 'gain', 'sport', 'mindset', 'corvées']
    const habits    = ['Ranger chambre', 'lire les mails', 'pompes'];
    const goals     = ['Clean', 'Faire du sport'];
    const tasks     = ['faire les courses', 'appeler mamie', 'vendre tv'];

    const tag = await Tag.create({
        name: 'Best of the world',
        color: '#F0F'
    });


    const newFinance = await Finance.create({
        title: 'Finance test',
    });

    const newCatFinance = await Category.create({
        title: categories[2]
    });
    const newCatHabit = await Category.create({
        title: categories[0]
    });
    const newCatList = await Category.create({
        title: categories[6]
    });
    
    await newFinance.addCategory(newCatFinance);

    const newList = await List.create({
        title: 'Liste test',
        order: 0
    });

    //Ajout de la catégorie corvée
    await newList.addCategory(newCatList);

    for (const task of tasks) {
        const newTask = await Task.create({
            title: task,
            list_id: newList.id,
        })
    }

    const newUser = await User.create({
        username: 'Florian',
        email: 'test@test.fr',
        password: 'hello',
        birthday: '2021-10-19'
    });

    for (const goal of goals) {

        const newGoal = await Goal.create({
            title: goal,
            start: '2021-10-19 10:23:54+02',
            end: '2021-10-19 11:23:54+02',
            user_id: newUser.id,
        });

        console.log("-------" + newGoal.id)

        //ajout d'une nouvelle catégorie sur l'objectif
        await newGoal.addCategory(newCatHabit);

        //ajout des habitudes à travailler pour atteindre l'objectif
        for (const habit of habits) {
            const newHabit = await Habit.create({
                action: habit,
                start: '2021-10-19 10:23:54+02',
                end: '2021-10-19 11:23:54+02',
                score: 1,
                recurrent: true,
                intervall: 1,
                periodicity: 1,
                goal_id: newGoal.id, 
            })
            
        }

    }

}

run();