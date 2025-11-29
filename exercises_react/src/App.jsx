import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState(); 

  return (
    <div className="app">

        <header>
            <h1>Exercise Tracker</h1>
            <p>
                Track the name, reps, weight, and date of your exercises.<br/>
                Add, edit, and delete your exercises using the icons and links below.
            </p>
        </header>

        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
                <Route path="/add-exercise" element={ <CreateExercisePage />}></Route>
                <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
            </Routes>
        </Router>

        <footer>
            <p>&copy; 2025 Arianne Taormina</p>
        </footer>

    </div>
  );
}

export default App;