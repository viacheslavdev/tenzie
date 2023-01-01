import React from "react"
import Tenzie from "./components/Tenzie"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import Time from "./components/Time"

export default function App() {


    const [tenzies, setTenzies] = React.useState(false)

    // Create Dice state
    const [randomNumbers, setRandomNumbers] = React.useState(allNewDice())


    // the effect follows the win
    React.useEffect(() => {
        const allHeld = randomNumbers.every(number => number.isHeld)
        const firstValue = randomNumbers[0].value
        const allSaveValue = randomNumbers.every(number => number.value === firstValue)
        if (allHeld && allSaveValue) {
            setTenzies(true)
        }
    }, [randomNumbers])

    // Create only one Dice element
    function newDice() {
        return {
            value: Math.floor(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    // Create Dice array
    function allNewDice() {
        const randomArray = []
        for (let i=0; i<10; i++){
            randomArray.push(newDice())
            
        }
        return randomArray
    }

    // Hold a number from choosed element
    function rollDice() {
        setRandomNumbers(prevState => prevState.map(element => {
            return element.isHeld ? 
            element : newDice()
        }))
        if (tenzies) {
            setRandomNumbers(allNewDice())
            setTenzies(false)
        }
    }

    // Create Tenzie element
    const outputNumbers = randomNumbers.map(
        element => <Tenzie 
                    key={element.id} 
                    value={element.value} 
                    isHeld={element.isHeld}
                    holdDice={() => holdDice(element.id)}
                    />
        )

    // Save in state that element is choosed
    function holdDice(id){
        setRandomNumbers(prevState => prevState.map(element => {
            return element.id === id ? 
            {...element, isHeld: !element.isHeld} : element
        }))
    }


    return(
        <main>
            {tenzies ? <Confetti /> : ''}
            <div className="wrapper">
                <div className="content">
                    <h3>Tenzies</h3>
                    <h4>Roll until all dice are the same. Click<br/>each die to freeze it at its current value<br/> between rolls.</h4>
                    <div className="numbers">
                        <div className="numbers-wrapper">
                            {outputNumbers}
                        </div>
                    </div>
                    <button onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
                </div>
            </div>
            <Time tenzies={tenzies} />
        </main>
    )
}


