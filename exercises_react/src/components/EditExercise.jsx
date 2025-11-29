import { MdOutlineEdit } from 'react-icons/md';

function EditExercise({ exercise, onEdit }){

    const editExercise = () => {
        onEdit(exercise);
    }

    return (
        <>
            <MdOutlineEdit onClick={editExercise} className='table-icon' />
        </>
    )

}

export default EditExercise;