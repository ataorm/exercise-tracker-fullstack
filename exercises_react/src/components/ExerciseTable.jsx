import ExerciseRow from './ExerciseRow';

function ExerciseTable({ exercises, onDelete, onEdit }){
    return (
        <table className="main-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, index) => <ExerciseRow exercise={exercise} 
                         onDelete={onDelete} onEdit={onEdit} key={index} />)}
            </tbody>
        </table>
    )
}

export default ExerciseTable;