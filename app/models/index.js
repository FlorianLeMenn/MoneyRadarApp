const User      = require('./user');
const Taxonomy  = require('./taxonomy');
const Vocabulary  = require('./vocabulary');
const Finance   = require('./finance');
const Goal      = require('./goal');
const Habit     = require('./habit');
const List      = require('./list');
const Task      = require('./task');
const Tag       = require('./tag');

//Mes finances peuvent avoit 0 ou N Taxonomy
Finance.belongsToMany(Taxonomy,{ 
    as: 'taxonomies',
    through: 'finance_has_taxonomy',
    foreignKey: {
        name: 'finance_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'tid',
    timestamps: false
});

//Mes objectifs peuvent avoit 0 ou N Taxonomy
Goal.belongsToMany(Taxonomy,{ 
    as: 'taxonomies',
    through: 'goal_has_taxonomy',
    foreignKey: {
        name: 'goal_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'tid',
    timestamps: false
});

//Mes liste peuvent avoit 0 ou N Taxonomy
List.belongsToMany(Taxonomy,{ 
    as: 'taxonomies',
    through: 'list_has_taxonomy',
    foreignKey: {
        name: 'list_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'tid',
    timestamps: false
});

// la taxo dépend d'un vocabulaire
Taxonomy.belongsTo(Vocabulary,{ 
    as: 'vocabulary',
    foreignKey: {
        name: 'vid', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    onDelete: 'CASCADE', //quand je supprime le voc, je supprime la relation avec tous les taxo reliés
});

//Hierarchie des taxo
Taxonomy.belongsTo(Taxonomy,{ 
    as: 'taxonomy_parent',
    through: 'taxonomy_hierarchy',
    foreignKey: {
        name: 'parent', // nom du champs de la clef etrangère
        allowNull: true,
    },
    timestamps: false
});

//Ma categorie dispose / appartient à de plusieurs listes
Taxonomy.belongsToMany(List,{ 
    as: 'lists',
    through: 'list_has_taxonomy',
    foreignKey: {
        name: 'tid', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'list_id',
    timestamps: false
});

//Ma categorie dispose / appartient à de plusieurs objectifs
Taxonomy.belongsToMany(Goal,{ 
    as: 'goals',
    through: 'goal_has_taxonomy',
    foreignKey: {
        name: 'tid', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    otherKey: 'goal_id',
    timestamps: false
});

//Mes finances peuvent avoit 0 ou N Categry
Taxonomy.belongsToMany(Finance,{ 
    as: 'finances',
    through: 'finance_has_taxonomy',
    foreignKey: {
        name: 'tid', // nom du champs de la clef etrangère
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
    onDelete: 'cascade', //quand je supprime le but, je supprime la relation avec tous les habitudes reliés
});

// Une tache dépend d'une liste
Task.belongsTo(List,{ 
    as: 'list',
    foreignKey: {
        name: 'list_id', // nom du champs de la clef etrangère
        allowNull: false, //rendre obligatoire l'association
    },
    onDelete: 'cascade', //quand je supprime la liste, je supprime la relation avec tous les taches reliés
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

module.exports = { User, Taxonomy, Vocabulary, Finance, Goal, Habit, Task, Tag, List };