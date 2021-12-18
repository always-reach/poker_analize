import * as React from 'react'
import { calcActionPercentage } from '../stars/HandAnalize'

type Props = {
    card: string
    action: { "raises": number, "calls": number, "folds": number }
}

const card: string[] = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

const Square: React.FC<Props> = (props) => {
    const { card, action } = props
    const actionPercentage = calcActionPercentage(action.raises, action.calls, action.folds)
    return <button className="square" style={{ background: "linear-gradient(to right, red " + actionPercentage.raises + "%, green " + actionPercentage.raises + "%, green " + actionPercentage.raises + actionPercentage.calls + "%, blue " + actionPercentage.raises + actionPercentage.calls + "%, blue " + actionPercentage.raises + actionPercentage.calls + actionPercentage.folds + "%, black " + actionPercentage.raises + actionPercentage.calls + actionPercentage.folds + "%)", color: "white" }}>{card}</button>
}



export const HandRange = (props: any) => {
    return (
        <div>
            {card.map((row, rowIndex) => (
                <div key={row} className="boradRow">
                    {card.map((column, columnIndex) => (
                        (rowIndex < columnIndex ? <Square key={column} card={row + column + "s"} action={props.hand[row + column + "s"]} /> : rowIndex > columnIndex ? <Square key={column} card={column + row + "o"} action={props.hand[column + row + "o"]} /> : <Square key={column} card={column + row} action={props.hand[row + column]} />)
                    ))}
                </div>
            ))}
        </div>
    )
}