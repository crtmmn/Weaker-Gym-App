import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading/Loading.js"

function Exercise() {

    const [isLoading, setIsLoading] = useState(false)
    const { exerciseID } = useParams()
    const [exercise, setExercise] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exerciseID}.json`)
            const result = await response.json()
            setExercise(result)
            setIsLoading(false)
        }
        catch(error) {
        }
    }

    return (
        <div>
            {isLoading && <Loading/>}
            <h1> { exercise.name }</h1>
            <h4>Category: {exercise.category} </h4>
            <h4>Equipment: {exercise.equipment} </h4>
            <h4>Level: {exercise.level} </h4>
            <h4>Primary muscles: {exercise.primaryMuscles} </h4>
            {
                exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (<h4>Secondary muscles: {exercise.secondaryMuscles.join(", ")}</h4>)
            }
            <h4>Force: {exercise.force} </h4>
            {
                exercise.mechanic != null && <h4>Mechanic: {exercise.mechanic}</h4>
            }
            <h5>Instruction: {exercise.instructions} </h5>
            <img height='200px' alt={`${exerciseID}1`} src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exerciseID}/0.jpg`}></img>
            <img height='200px' alt={`${exerciseID}2`} src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exerciseID}/1.jpg`}></img>
        </div>
    )
}
export default Exercise