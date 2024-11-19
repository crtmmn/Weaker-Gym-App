import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Loading/loading.css"
import Loading from "./Loading/Loading.js"

function Exercises() {
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [exercisesDict, setExercisesDict] = useState({});
    const [filteredExercisesDict, setFilteredExercisesDict] = useState({});

    const handleSearch = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(
                `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json`
            );
            const result = await response.json();
            const dictionary = result.reduce((acc, exercise) => {
                acc[exercise.name] = [exercise.id, exercise.primaryMuscles, exercise.category];
                return acc;
            }, {});
            setExercisesDict(dictionary);
            setFilteredExercisesDict(dictionary);
            setIsLoading(false)
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
            {isLoading && <Loading/>}
            <div class="d-flex justify-content-center pt-4 pb-4">
            <input type="text" placeholder="Exercise name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
            </div>
            <div class="d-flex justify-content-center">
                <ul>
                    {
                    Object.entries(filteredExercisesDict).map(([name, [id, primaryMuscles, category]], index) => (
                        <div class="card mb-3" style={{ width: "70rem"}}  key={index}>
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img alt={`${id}1`} src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${id}/0.jpg`} class="img-fluid rounded-start"></img>
                                </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                    <h2 class="card-title">{name}</h2>
                                    <h4 class="card-text pt-3">{primaryMuscles}</h4>
                                    <h4 class="card-text pt-3 pb-3">{category}</h4>
                                    <Link class="btn btn-primary" to={`/exercise/${id}`}>More</Link>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Exercises;
