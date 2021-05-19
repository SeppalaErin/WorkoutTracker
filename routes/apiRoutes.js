const db = require("../models");
const router = require("express").Router();

router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne(
    {_id: req.params.id}, { $push: {exercises: req.body}})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    { $addFields: {
      totalDuration: {
        $sum: "$exercises.duration"
      }
    }}
  ]).then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    { $addFields: {
      totalDuration: {
        $sum: "$exercises.duration"
      }
    }}
  ]).sort( {
    _id: -1
  }).limit(10)
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});


module.exports = router;