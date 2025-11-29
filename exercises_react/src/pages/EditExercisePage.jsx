import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditExercisePage({exerciseToEdit}) {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(editedExercise)
            }
        );
        if (response.status === 200) {
            alert(`${name} updated`)
        } else {
            alert("Failed to update exercise.")
        }
        navigate('/');
    }

    return (
        <>
        <h2>Edit Exercise</h2>
        <table>
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
                <tr>
                    <td><input 
                        type="text" 
                        placeholder="Exercise name" 
                        value={name} 
                        onChange={event => setName(event.target.value)} /></td>
                    <td><input 
                        type="number" 
                        placeholder="Number of reps" 
                        value={reps} 
                        onChange={event => setReps(event.target.valueAsNumber)} /></td>
                    <td><input 
                        type="number" 
                        placeholder="Weight" 
                        value={weight} 
                        onChange={event => setWeight(event.target.valueAsNumber)} /></td>
                    <td><select name="unit" value={unit} onChange={event => setUnit(event.target.value)}>
                            <option value="">Unit (kgs or lbs)</option>
                            <option value="kgs">kgs</option>
                            <option value="lbs">lbs</option>
                        </select></td>
                    <td><input 
                        type="text" 
                        placeholder="Date (MM-DD-YY)" 
                        value={date} 
                        onChange={event => setDate(event.target.value)} /></td>
                </tr>
            </tbody>
        </table>
        <br />
        <button onClick={editExercise}>Update</button>
        </>
    );
}

export default EditExercisePage;