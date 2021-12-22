const User      = require('./user');
const Category  = require('./category');
const Finance   = require('./finance');
const Goal      = require('./goal');
const Habit     = require('./habit');
const Task      = require('./task');
const Tag       = require('./tag');

//Mes finances peuvent avoit 0 ou N Categry
Finance.belongsToMany(Category,{ 
    as: 'categories',
    through: 'finance_has_category',
    foreignKey: {
        name: 'finance_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'category_id',
    timestamps: false
});


//Un Objectif peut avoit 0 ou N habitudes
Goal.belongsToMany(Habit,{ 
    as: 'goal_habits',
    through: 'goal_has_habit',
    foreignKey: {
        name: 'goal_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'habit_id',
    onDelete: 'cascade', //quand je supprime le groupe, je supprime la relation avec tous les users reliés
    timestamps: false
});

// l'habitude dépend d'un objectif
Habit.belongsTo(Goal,{ 
    as: 'goal',
    through: 'goal_has_habit',
    foreignKey: {
        name: 'goal_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    onDelete: 'cascade', //quand je supprime le user, je supprime la relation avec tous les groups reliés
});

//Mon objectif à plusieurs habitudes
Goal.hasMany(Habit,{
    as: 'habits',
    foreignKey: 'goal_id',
});


// Un utilisateur a créé 0 ou N Objectifs
User.hasMany(Goal, {
    as: 'user_goals',
    foreignKey: 'user_id'
})

// Un utilisateur a créé 0 ou N habitudes
User.hasMany(Habit, {
    foreignKey: 'user_id',
    as: 'user_habits'
})

module.exports = { User, Category, Finance, Goal, Habit, Task, Tag};