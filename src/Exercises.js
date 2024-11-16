import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Exercises() {
    const [searchTerm, setSearchTerm] = useState("")
    const [ExercisesList, setExercise] = useState([])

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/exercises?name=${searchTerm}`,
                {headers: {'X-Api-Key': 'RhXyk5xXSCUIyd7/y6PNVw==JWAtPm1sqpnlSQEP'}}
            )

            const result = await response.json()
            if (Array.isArray(result)) {
                setExercise(result);
            } else {
                console.log("API returned a non-array response:", result);
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div>
            <input type="text" placeholder="Name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button onClick={handleSearch}>Search</button>
          {
          ExercisesList.map((exercise, index) => (
            <li><Link to={"/exercise/" + exercise.name} key={index}>{exercise.name}</Link></li>
          ))
          }
        </div>
      );
}
export default Exercises