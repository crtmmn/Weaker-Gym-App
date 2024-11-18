import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Exercise() {

    const { exerciseID } = useParams()
    const [exercise, setExercise] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exerciseID}.json`)
            const result = await response.json()
            setExercise(result)
        }
        catch(error) {
        }
    }


    return (
        <div>
            <h1> { exercise.name }</h1>
            <h4>Category: {exercise.category} </h4>
            <h4>Equipment: {exercise.equipment} </h4>
            <h4>Level: {exercise.level} </h4>
            <h4>Primary muscles: {exercise.primaryMuscles} </h4>
            {
                exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                    <h3>Secondary muscles: {exercise.secondaryMuscles.join(", ")}</h3>
                )
            }

            <h4>Force: {exercise.force} </h4>
            <h4>Mechanic: {exercise.mechanic} </h4>
            <h5>Instruction: {exercise.instructions} </h5>
            <img height='300px' alt={`${exerciseID}1`} src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exerciseID}/0.jpg`}></img>
            <img height='300px' alt={`${exerciseID}2`} src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exerciseID}/1.jpg`}></img>
        </div>
    )
}
export default Exercise