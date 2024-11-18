import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Exercises() {
    const [searchTerm, setSearchTerm] = useState("");
    const [exercisesDict, setExercisesDict] = useState({});
    const [filteredExercisesDict, setFilteredExercisesDict] = useState({});

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json`
            );
            const result = await response.json();
            const dictionary = result.reduce((acc, exercise) => {
                acc[exercise.name] = exercise.id;
                return acc;
            }, {});
            setExercisesDict(dictionary);
            setFilteredExercisesDict(dictionary);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const filtered = Object.keys(exercisesDict).reduce((acc, name) => {
            if (name.toLowerCase().includes(searchTerm.toLowerCase())) {
                acc[name] = exercisesDict[name];
            }
            return acc;
        }, {});
        setFilteredExercisesDict(filtered);
    }, [searchTerm, exercisesDict]);

    return (
        <div>
            <input type="text" placeholder="Exercise name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
            <div id="results">
                <ul>
                    {
                    Object.entries(filteredExercisesDict).map(([name, id], index) => (
                        <li key={index}><Link to={`/exercise/${id}`}>{name}</Link></li>
                    ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Exercises;
