import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateExercisePage() {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch(
            '/exercises', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newExercise)
            }
        );
        if (response.status === 201) {
            alert(`${name} added`)
        } else {
            alert("Failed to add exercise.")
        }
        navigate('/');
    }

    return (
        <>
        <h2>Add Exercise</h2>
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
                    <td><select name="unit" onChange={event => setUnit(event.target.value)}>
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
        <button onClick={addExercise}>Add</button>
        </>
    );
}

export default CreateExercisePage;