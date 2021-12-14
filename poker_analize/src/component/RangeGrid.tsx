import * as React from 'react'

type Props={
    card:string
}

const card: string[] = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

const Square:React.FC<Props> = (props) => {
    const {card}=props
    return <button className="square" style={{background:"linear-gradient(to right, red 33%, green 33%, green 66%, blue 66%)"}}>{card}</button>
}



export const HandRange=()=>{
    return(
        <div>
            {card.map((row,rowIndex)=>(
                <div key={row} className="boradRow">
                    {card.map((column,columnIndex)=>(
                        (rowIndex<columnIndex? <Square key={column} card={row+column+"s"}/>: rowIndex>columnIndex? <Square key={column} card={column+row+"o"} />:<Square key={column} card={column+row} />)
                    ))}
                </div>
            ))}
        </div>
    )
}