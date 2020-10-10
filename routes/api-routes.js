const express = require("express");
const router = express.Router();
const Workout = require("../models/workout.js");



  // middleware that is specific to this router
  router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
  });
  
  router.get("/api/workouts", (req, res) => {
    Workout.find()
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  router.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },

    { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      // console.log(dbWorkout)
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = router