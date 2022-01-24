const { use } = require('./routes');
const Site = require('../models/Sites');
const Tours = require('../models/Tours');

module.exports = {
    // ******* READ EVENTS ******* //
    getSite: function(req, res) {
        Tours.findOne().populate('site')
            .then(sites =>{
                console.log(sites)
                 res.send(sites)})
            .catch(e => res.status(500).send(e))
    },

    // ******* CREATE site ******* //
    addSite: function(req, res) {
        console.log(req.body);
        const site = new Site(req.body);
        site.save().then(site => {
            res.status(201).send(site)
        }).catch(e => {
            console.log(e);
            res.status(400).send(e)
        })
    }
}