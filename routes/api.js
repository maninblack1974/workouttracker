const router = require("express").Router();
const Workout = require("../models/workout.js");

module.exports = function(app) {

    router.get("/api/workouts", (req, res) => {
        Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    });
    
    router.post("/api/workouts", async (req, res)=> {
        try{
            const response = await Workout.create({type: "workout"})
            res.json(response);
        }
        catch(err){
            console.log("error occurred creating a workout: ", err)
        }
    })

    router.put("/api/workouts/:id", ({body, params}, res) => {
        const workoutId = params.id;
        let savedExercises = [];

        Workout.find({_id: workoutId})
            .then(dbWorkout => {
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                console.log(allExercises)
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises){
            Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function(err, doc){
            if(err){
                console.log(err)
            }

            })
        }
            
    })

    router.get("/api/workouts/range", (req, res) => {
        Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    }); 
};