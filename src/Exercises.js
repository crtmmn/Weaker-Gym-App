import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Loading/loading.css"
import './styling.css'
import Loading from "./Loading/Loading.js"

function Exercises() {
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [exercisesDict, setExercisesDict] = useState({});
    const [filteredExercisesDict, setFilteredExercisesDict] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const handleSearch = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json`
            );
            const result = await response.json();
            const dictionary = result.reduce((acc, exercise) => {
                acc[exercise.name] = [exercise.id, exercise.primaryMuscles, exercise.category];
                return acc;
            }, {});
            setExercisesDict(dictionary);




            const resultCategories = {};
            result.forEach(exercise => {
                resultCategories[exercise.category] = true; // Wykorzystujemy obiekt do przechowywania unikalnych kategorii
            });
            const uniqueCategories = Object.keys(resultCategories).sort();
            setCategories(uniqueCategories)




            setFilteredExercisesDict(dictionary);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSearch()
    }, [])

    useEffect(() => {
        let filtered = { ...exercisesDict}

        if(selectedCategory !== "all") {
            filtered = Object.keys(exercisesDict).reduce((acc, name) => {
                const [id, primaryMuscles, category] = exercisesDict[name];
                if (category === selectedCategory) {
                    acc[name] = [id, primaryMuscles, category];
                }
                return acc;
            }, {});
        }

        if(searchTerm !== "") {
            filtered = Object.keys(exercisesDict).reduce((acc, name) => {
                if (name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    acc[name] = exercisesDict[name];
                }
                return acc;
            }, {});
        }
        
        setFilteredExercisesDict(filtered);
    }, [searchTerm, selectedCategory, exercisesDict]);
    
    const capitalWord = (str)  => {
        return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    }

    return (
        <div id="container"> 
            {isLoading && <Loading/>}
            <div class="d-flex justify-content-center pt-4 pb-4">
            <input style={{ marginRight: "10px"}} type="text" placeholder="Exercise name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="selectpicker" data-live-search="true">
                    <option data-tokens="all" value="all">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {capitalWord(String(category))}
                        </option>
                    ))}
            </select>
            </div>
            <div class="d-flex p-2 justify-content-center">
                <ul>
                    {
                    Object.entries(filteredExercisesDict).map(([name, [id, primaryMuscles, category]], index) => (
                        <div id="exerciseCard" class="card mb-3" style={{ width: "70rem"}}  key={index}>
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img alt={`${id}1`} src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${id}/0.jpg`} class="img-fluid rounded-start exerciseImage"></img>
                                </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                    <h2 class="card-title" id="weakerID">{name}</h2>
                                    <h4 class="card-text pt-3">{capitalWord(String(primaryMuscles))}</h4>
                                    <h4 class="card-text pt-3 pb-3">{capitalWord(String(category))}</h4>
                                    <Link class="btn btn-warning fw-bolder" to={`/exercise/${id}`}>More</Link>
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
