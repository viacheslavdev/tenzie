import React from "react"
import {nanoid} from "nanoid"


export default function Time(props) {

    const [time, setTime] = React.useState(0)
    const [timer, setTimer] = React.useState()
    const [storage, setStorage] = React.useState([])

    React.useEffect(() => {
        let interval
        if (!props.tenzies) {
            interval = setInterval(()=>{
                setTime(prev => prev + 1)
                const hours = Math.floor(time / 60 / 60)
                const minutes = Math.floor(time/60) - Math.floor(time / 60 / 60)
                const secunds = time%60
                setTimer(`${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes}:${secunds<10?'0'+secunds:secunds}`)
            }, 1000)
        } else if (props.tenzies) {
            clearInterval(interval)
            setTime(0)
        }
        return () => clearInterval(interval)
    },[props.tenzies, time])

    React.useEffect(()=> {
        if (props.tenzies) {
            localStorage.setItem(localStorage.length+1, timer)
        }
        const itemsList = []
        for (let i=1; i <= localStorage.length; i++) {
            itemsList.push(localStorage.getItem(i))
        }
        setStorage(itemsList)
        
    }, [props.tenzies])

    const latestTime = storage.map(
        element => <li key={nanoid()} className="score-latest">{element}</li>
        )



    return(
        <div>
            <div className="timer">{timer ? timer : '00:00:00'}</div>
            <h3 className="score-header">Latest score</h3>
            <ul>
                <div className="no-results">{localStorage.getItem(1) ? latestTime : 'No results'}</div>
            </ul>
        </div>
    )   
}