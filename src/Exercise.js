import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading/Loading.js"
import './styling.css'

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
        <div id="container" className="pt-3">
            {isLoading && <Loading/>}
            <h1 id="weakerID"> { exercise.name }</h1>
            <h4 className="pb-2 pt-2">Category: {exercise.category} </h4>
            <h4 className="pb-2">Equipment: {exercise.equipment} </h4>
            <h4 className="pb-2">Level: {exercise.level} </h4>
            <h4 className="pb-2">Primary muscles: {exercise.primaryMuscles} </h4>
            {
                exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (<h4 className="pb-2 pt-2">Secondary muscles: {exercise.secondaryMuscles.join(", ")}</h4>)
            }
            <h4 className="pb-2">Force: {exercise.force} </h4>
            {
                exercise.mechanic != null && <h4 className="pb-2 pt-2">Mechanic: {exercise.mechanic}</h4>
            }
            <h5 className="instruction pb-2 pt-2">Instruction: {exercise.instructions} </h5>
            <img height='200px' style={{ marginRight: "5rem"}} alt={`${exerciseID}1`} src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exerciseID}/0.jpg`}></img>
            <img height='200px' alt={`${exerciseID}2`} src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exerciseID}/1.jpg`}></img>
        </div>
    )
}
export default Exercise