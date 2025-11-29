import DeleteExercise from "./DeleteExercise";
import EditExercise from "./EditExercise";

function ExerciseRow({ exercise, onDelete, onEdit }){

    // <td><a href="/" onClick={e => {e.preventDefault(); onDelete(exercise._id)}}>Delete</a></td>

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td className="td-button"><EditExercise exercise={exercise} onEdit={onEdit}/></td>
            <td className="td-button"><DeleteExercise exercise={exercise} onDelete={onDelete}/></td>
        </tr>
    )
}

export default ExerciseRow;