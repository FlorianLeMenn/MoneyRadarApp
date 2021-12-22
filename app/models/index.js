const User      = require('./user');
const Category  = require('./category');
const Finance   = require('./finance');
const Goal      = require('./goal');
const Habit     = require('./habit');
const List      = require('./list');
const Task      = require('./task');
const Tag       = require('./tag');

//Mes finances peuvent avoit 0 ou N Category
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

//Mes objectifs peuvent avoit 0 ou N Category
Goal.belongsToMany(Category,{ 
    as: 'categories',
    through: 'goal_has_category',
    foreignKey: {
        name: 'goal_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'category_id',
    timestamps: false
});

//Mes liste peuvent avoit 0 ou N Category
List.belongsToMany(Category,{ 
    as: 'categories',
    through: 'list_has_category',
    foreignKey: {
        name: 'list_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'category_id',
    timestamps: false
});

//Ma categorie dispose de plusieurs listes
Category.belongsToMany(List,{ 
    as: 'lists',
    through: 'list_has_category',
    foreignKey: {
        name: 'category_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'list_id',
    timestamps: false
});

//Ma categorie dispose de plusieurs objectifs
Category.belongsToMany(Goal,{ 
    as: 'goals',
    through: 'goal_has_category',
    foreignKey: {
        name: 'category_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'goal_id',
    timestamps: false
});

//Mes finances peuvent avoit 0 ou N Categry
Category.belongsToMany(Finance,{ 
    as: 'finances',
    through: 'finance_has_category',
    foreignKey: {
        name: 'category_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'finance_id',
    timestamps: false
});

// l'objectif dépend d'un utilisateur
Goal.belongsTo(User,{ 
    as: 'user',
    foreignKey: {
        name: 'user_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    onDelete: 'cascade', //quand je supprime le user, je supprime la relation avec tous les groups reliés
});

// l'habitude dépend d'un objectif
Habit.belongsTo(Goal,{ 
    as: 'goal',
    foreignKey: {
        name: 'goal_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    onDelete: 'cascade', //quand je supprime le user, je supprime la relation avec tous les groups reliés
});

// Une tache dépend d'une liste
Task.belongsTo(List,{ 
    as: 'list',
    foreignKey: {
        name: 'list_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    onDelete: 'cascade', //quand je supprime le user, je supprime la relation avec tous les groups reliés
});

//Mon objectif à plusieurs habitudes
Goal.hasMany(Habit,{
    as: 'habits',
    foreignKey: 'goal_id',
});

//Ma liste à plusieurs taches
List.hasMany(Task,{
    as: 'tasks',
    foreignKey: 'list_id',
});

//Un utilisateur a créé 0 ou N Objectifs
User.hasMany(Goal, {
    as: 'goals',
    foreignKey: 'user_id'
})

module.exports = { User, Category, Finance, Goal, Habit, Task, Tag, List };