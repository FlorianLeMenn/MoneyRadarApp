const { validate }          = require('email-validator');
const {compare, hashSync}   = require('bcrypt');
const { User }              = require('../models');

const auhtController = {
    signupPage: (req, res) => {
        //error first : redirection si l'utilisateur est bien connecté
        if (req.session.login) return res.redirect('/');
    },  

    loginPage: (req, res) => {
        //error first : redirection si l'utilisateur est bien connecté
        if (req.session.login) return res.redirect('/');
    },

    profilPage: (req, res) => {
        //error first : redirection si l'utilisateur n'est pas connecté
        if (!req.session.login) return res.redirect('/login');
    },

    signup: async(req, res) => {
        try {
            //1. reécupérer les données du formulaire
            const errors = [];
            const form   = req.body;
            //2. Vérifier que tous les champs obligatoire soient remplis + email valide
            if(!form.username) return res.status(400).send({'name': 'username', 'message':'Le champs nom d\'utilisateur n\'est pas renseigné.'}); 
            if(!form.email) return res.status(400).send({'name': 'email', 'message':'Le champs e-mail n\'est pas renseigné.'}); 
            if(!form.birthday) return res.status(400).send({'name': 'birthday', 'message':'Le champs date de naissance n\'est pas renseigné.'}); 
            if(!validate(form.email)) return res.status(400).send({'name': 'email', 'message':"L'adresse e-mail renseignée n'est pas correcte !"});

            // 3. Vérifier que les deux mots de passes soient identiques
            if(form.password !== form.passwordConfirm) return res.status(400).send({'name': 'passwordConfirm', 'message':"Les deux mots de passe ne sont pas identiques !"});

            //4. Vérifier que l'email est unique
            const user = await User.findOne({
                where: {
                    email: form.email.toLowerCase()
                }
            });
        
            if (user) return res.status(400).send({'name': 'email', 'message':"L'adresse e-mail est deja utilisée."});
            //if(errors.length > 0) return res.status(400).send(errors);
            
            //5. Enregistrer le user en base
            delete form.passwordConfirm; //supprimer les champs inutiles

            const dataUser = {
                username: form.username,
                email: form.email,
                password: hashSync(form.password, 10),//On hash le mot de passe avant de l'enregistrer en base
                roles: {roles:["ROLE_USER"]}
            }
   
            const newUser = await User.create(form);

            if(!newUser)
                return res.status(404).json({});

            res.status(200).json(`Le compte ${newUser.username} créé avec succès.`);
        } 
        catch(err) {
            res.status(500).json({err});
        }
    },

    login: async(req, res) => {
        try {
            const errors = [];
            const form   = req.body;
            //1. Vérifier si les champs sont vides
            if(!validate(form.email) || !form.password) return res.redirect('/login');
            if(errors.length > 0) return res.render('login', {errors, values:req.body});
            //2.Vérifier que l'utilisateur existe bien
            const user =  await User.findOne({
                where: {
                    email:form.email,
                }
            });
    
            if (!user) return res.redirect('/login');
            //comparaison du mot de passe du formulaire avec celui de l'utilisateur en base
            const passValid =  await compare(form.password, user.password);
            if(!passValid) return res.redirect('/login');
    
            //3. Créer la variable (propriété) de session login, stocké coté serveur
            req.session.login = {
                id: user.id,
                email: user.email,
                username: user.username,
                fullname: user.fullname,
                roles: user.roles,
            };
    
            res.redirect('/');
        }
        catch(error) {
            console.error(error);
            res.status(500).json({error:'500'});
        }
    },

    logout: (req, res) => {
        if(req.session.login) delete req.session.login;
        // on peut écrire ça comme ça : req.session.login = null;
        res.redirect('/');
    }
}

module.exports = auhtController;