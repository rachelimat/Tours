const { use } = require('./routes');
const Tours = require('../models/Tours');
const Site = require('../models/Sites');


//-----------------------------------------------------------
// CRUD methods
//-----------------------------------------------------------
module.exports = {
    // ******* READ Tours ******* //
    getTours: function(req, res) {
        console.log("get tours - server");
        Tours.find().then(Tours => {
            // sort data by the tours id
            Tours.sort(function(a, b) {
                a = a.id.toLowerCase();
                b = b.id.toLowerCase();
                if (a > b)
                    return 1;
                else if (a < b)
                    return -1;
                return 0;
            });
            res.send(Tours);
        }).catch(e => res.status(500).send())

    },
    

    // ******* CREATE Tour ******* //
    addTour: function(req, res) {
        console.log("add tour - server");
        // Check if ID already exist
        Tours.countDocuments({ id: req.body.id })
            .then(count => {
                if (count > 0) {
                    res.status(400).send("ID already exists");
                    return;
                } else {
                    const tour = new Tours(req.body)
                    tour.save().then(tour => {
                        res.status(201).send(tour)
                    }).catch(e => {
                        console.log(e);
                        res.status(400).send(e)
                    })
                }
            }).catch(e => res.status(400).send(e))
        
    },

  


      // ******* CREATE Site ******* //
      addSiteToTourpath: function(req, res) {
        console.log("addSiteToTourpath");
        console.log(req.body.tour_id);
        console.log(req.body.site_id);
        Tours.findOne({id:req.body.tour_id}).then(tour => {
            var len = tour.site.length
            if(req.body.index>len){
                tour.site.splice(len,0,req.body.site_id)
            }
            else
                tour.site.splice(req.body.index,0,req.body.site_id)
            tour.save().then(tour => {
                res.status(200).send(tour)  
            }).catch(e => {
                    console.log(e)
                    res.status(400).send(e)})
        }).catch(e => {
                console.log(e)
                res.status(400).send(e)})
                                
    },

    // ******* DELETE Tour ******* //
    deleteTour: function(req, res) {
        console.log(req.params['id']);
        const tuorId = req.params['id'];

        Tours.findOneAndRemove({ id: tuorId }).exec()
            .then(doc =>{
                res.send(doc)})
            .catch(e =>{
                 res.status(400).send(e)});
    },

    getTour: function (req, res) {
        console.log("getTour");
        console.log(req.params.id);
        Tours.findOne({id:req.params.id}).then(tour => {
            // console.log(tour.cupon);
            res.send(tour);
           }).catch(e => {
                console.log(e)
                res.status(400).send(e)})

    },

    AddCuponToTour: function (req, res) {
        console.log("add cupon - server");
        Tours.countDocuments({ id: req.body.id })
        .then(count => {
            if (count <= 0) {
                res.status(200).send("ID is not exists");
                return;
            } else {
                var friend = {code: req.body.code, percent: req.body.percent, start_date: req.body.start_date, end_date: req.body.expire_date };    
                Tours.updateOne(
                        { id: req.body.id }, 
                        { $push: { cupon: friend } },
                       
                    ).then(tour => {
                        res.status(201).send("cupon are added")
                }).catch(e => {
                    console.log(e);
                    res.status(400).send(e)
                })
            }
        }).catch(e => res.status(400).send(e))
    },

    deleteCopunFromTour:function (req, res) {
        Tours.countDocuments({ id: req.params.id })
        .then(count => {
            if (count <= 0) {
                res.status(200).send("ID is not exists");
                return;
            } else {
                Tours.findOneAndUpdate(
                            { id: req.params.id },
                            { $pull: { cupon: { code: req.params.code } } },
                           
                        ).then(tour => {
                        res.status(201).send("cupon are remove")
                }).catch(e => {
                    console.log(e);
                    res.status(400).send(e)
                })
            }
        }).catch(e => res.status(400).send(e))
    },

    updateTour: function (req, res) {
        
        console.log("update Tour - server");
        // Check if ID are exist
        Tours.countDocuments({ id: req.body.id })
            .then(count => {
                console.log(count);
                if (count <= 0) {
                    res.status(200).send("ID is not exists");
                    return;
                } else {
                    Tours.updateOne({ id: req.params.id }, { $set: {start_date:req.body.start_date,duration:req.body.duration,price:req.body.price} }).then(tour => {
                        res.status(201).send(tour)
                    }).catch(e => {
                        console.log(e);
                        res.status(400).send(e)
                    })
                }
            }).catch(e => res.status(400).send(e))
    },

};