/**
 * Arianne Taormina
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const ERROR_INVALID_REQ = { Error: "Invalid request"}
const ERROR_NOT_FOUND = { Error: "Not found" };

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});



/**
 * Validate request body.
 */
function isValidBody(req){
    const requiredProps = ['name', 'reps', 'weight', 'unit', 'date'];
    // If body missing any required property, return false
    for (let i = 0; i < requiredProps.length; i++) {
        if (!Object.keys(req.body).includes(requiredProps[i])) {
            return false; 
        }
    }
    // If body contains any extraneous properties, return false
    for (const prop in req.body) {
        if (!requiredProps.includes(`${prop}`)) {
            return false;
        }
    }
    // If name property invalid (must be string, length >= 1), return false
    if (typeof(req.body.name) !== 'string' || req.body.name.length < 1) {
        return false;
    }
    // If reps property invalid (must be int, > 0), return false
    else if (typeof(req.body.reps) !== 'number' || !Number.isInteger(req.body.reps) || req.body.reps < 1){
        return false;
    }
    // If weight property invalid (must be int, > 0), return false
    else if (typeof(req.body.weight) !== 'number' || !Number.isInteger(req.body.weight) || req.body.weight < 1){
        return false;
    }
    // If unit property invalid (must be string, 'kgs' or 'lbs'), return false
    else if (typeof(req.body.unit) !== 'string' || (req.body.unit !== 'kgs' && req.body.unit !== 'lbs')){
        return false;
    }
    // If date property invalid (must be string in MM-DD-YY int format), return false
    else if (!isDateValid(req.body.date)) {
        return false;
    }
    // Request body valid, return true
    return true;
}


/**
* Validate date property.
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}



/**
 * Create using POST /exercises
 * Create a new exercise with the query params provided in the body.
 */
app.post('/exercises', asyncHandler(async (req, res) => {
    // If req body invalid, return error message
    if (!isValidBody(req)){
        res.status(400).json(ERROR_INVALID_REQ);
    } else {
    // If req body valid, create new document and send request
    const exercise = await exercises.createExercise(
                                req.body.name, 
                                req.body.reps, 
                                req.body.weight,
                                req.body.unit,
                                req.body.date);
    res.status(201).json(exercise);
    }
}));


/**
 * Read using GET /exercises
 * Get all exercises in collection.
 */
app.get('/exercises', asyncHandler(async (req, res) => {
    const allExercises = await exercises.getAllExercises(req.query);
    res.status(200).json(allExercises);
}));


/**
 * Read using GET /exercises/:_id
 * Get exercise matching path parameter ID.
 */
app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = await exercises.getExerciseByID(req.params._id);
    // If no exercise exists with specified ID, return error message 
    if (exercise === null){
        res.status(404).json(ERROR_NOT_FOUND);
    } else {
    // If exercise exists with specified ID, return object
        res.status(200).json(exercise);
    }
}));


/**
 * Update using PUT /exercises/:_id
 * Update ID-specified exercise with specified property values.
 */
app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    // If req body invalid, return error message
    if (!isValidBody(req)){
        res.status(400).json(ERROR_INVALID_REQ);
    } else {
    // If req body valid, update document and send request if found
        const exercise = await exercises.updateExercise(req.params._id, req.body);
        // If no exercise exists with specified ID, return error message
        if (exercise === null){
            res.status(404).json(ERROR_NOT_FOUND);
        } else {
        // If exercise exists with specified ID, return object
            res.status(200).json(exercise);
        }
    }
}));


/**
 * Delete using DELETE /exercises/:_id
 * Delete document with specified ID.
 */
app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const deleted = await exercises.deleteExerciseByID(req.params._id);
    // If no exercise exists with specified ID, return error message
    if (!deleted){
        res.status(404).json(ERROR_NOT_FOUND);
    } 
    // If exercise exists with specified ID, reutrn status code 204 and empty body
    else {
        res.status(204).send();
    }
}));

