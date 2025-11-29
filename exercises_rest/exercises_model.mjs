/**
 * Arianne Taormina
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}


/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
}, {collection: 'exercises'});

/**
 * Compile the model from the schema
 */
const Exercise = mongoose.model(EXERCISE_DB_NAME, exerciseSchema);


/**
 * Create an exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to JSON object for doc created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}


/**
 * Return all exercises in collection
 * @returns JSON array containing every document (JSON object) in collection
 */
const getAllExercises = async () => {
    const query = Exercise.find({});
    return query.exec();
}


/**
 * Get exercise matching specified ID.
 * @param {Object} _id
 * @returns JSON object containing doc for exercise matching ID
 */
const getExerciseByID = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}


/**
 * Update specified exercise with specified property values.
 * @param {Object} _id
 * @param {Object} req body
 * @returns JSON object containing doc for updated exercise
 */
const updateExercise = async (_id, update) => {
    const query = Exercise.updateOne({_id: _id}, update);
    await query.exec();
    const exercise = await getExerciseByID(_id);
    return exercise;
}


/**
 * Delete exercise matching specified ID.
 * @param {Object} _id
 * @returns {boolean} true if successful, false if unsuccessful
 */
const deleteExerciseByID = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    // Return true if delete successful, false otherwise
    return result.deletedCount !== 0;
}


export { connect, createExercise, getAllExercises, getExerciseByID, updateExercise, deleteExerciseByID };