const { User } = require("../models");

const userController = {

    getAllUsers: async(req, res) => {
        try {
            const users = await User.findAll({});

            if(!users)
                return res.status(404).json({});

            res.json(users);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    getUser: async(req, res) => {
        try {
            const userId    = +req.params.id;
            const user      = await User.findByPk(userId, {
                include: ["groups_owner", "my_groups"]
            });
    
            if(!user)
                return res.status(404).json({});

            res.json(user);
        } catch (err) {
            res.status(500).json({err});
        }
    },
}

(async () => {
    await sequelize.sync({ force: true });
    // Code here
  })();
  
module.exports = userController;