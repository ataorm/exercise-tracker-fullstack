import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdOutlineAddCircle } from 'react-icons/md';
import ExerciseTable from '../components/ExerciseTable';

function HomePage({setExerciseToEdit}) {

    const [exercises, setExercises] = useState([]);

    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }


    useEffect( () => {
        loadExercises();
    }, []);


    const onDelete = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`, {method: 'DELETE'}
        );
        if (response.status === 204){
            setExercises(exercises.filter(exercise => exercise._id !== _id));
        } else {
            alert(`Failed to delete exercise.`) 
        }
    }


    const onEdit = (exercise) => {
        setExerciseToEdit(exercise);
        navigate('/edit-exercise');
    }


    const navAdd = () => {
        navigate('/add-exercise');
    }


    return (
        <>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>
            <MdOutlineAddCircle onClick={navAdd} className='table-icon'/>
        </>
    );
}

export default HomePage;