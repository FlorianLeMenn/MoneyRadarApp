const models = require('./../models');

const getModelNameFromParams = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
    addModelInRequest(req, res, next) {
        const modelName = getModelNameFromParams(req.params.modelName);
        const Model     = models[modelName];

        if (!Model) {
            res.status(404).send('Not Found');
            return;
        }

        req.Model = Model;
        next();
    }
}