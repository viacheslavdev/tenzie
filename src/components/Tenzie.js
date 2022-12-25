import React from "react"

export default function Tenzie(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391": "white"
    }


    return (
            <div 
                onClick={props.holdDice} 
                style={style} 
                className="number">
                    {props.value}
            </div>
    )
}