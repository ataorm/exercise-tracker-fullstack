import { MdOutlineDelete } from 'react-icons/md';

function DeleteExercise({ exercise, onDelete }){

    const delExercise = () => {
        onDelete(exercise._id);
    }

    return (
        <>
            <MdOutlineDelete onClick={delExercise}  className='table-icon'/>
        </>
    )

}

export default DeleteExercise;