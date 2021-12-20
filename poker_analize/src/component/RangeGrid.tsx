import * as React from 'react'
import { calcActionPercentage, getGradient } from '../stars/HandAnalize'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


type Props = {
    card: string
    action: { "raises": number, "calls": number, "folds": number }
}

const card: string[] = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Square: React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { card, action } = props
    const actionPercentage = calcActionPercentage(action.raises, action.calls, action.folds)
    const gradientAction = getGradient(actionPercentage.raises, actionPercentage.calls, actionPercentage.folds)
    return (<>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-raise" sx={{ mt: 2 }}>
                    Raise {actionPercentage.raises}%
                </Typography>
                <Typography id="modal-modal-call" sx={{ mt: 2 }}>
                    Call {actionPercentage.calls}%
                </Typography>
                <Typography id="modal-modal-fold" sx={{ mt: 2 }}>
                    Fold {actionPercentage.folds}%
                </Typography>
            </Box>
        </Modal>
        <button className="square" onClick={handleOpen} style={{ background: "linear-gradient(to right, red " + gradientAction.raises + "%, green " + gradientAction.raises + "%, green " + gradientAction.calls + "%, blue " + gradientAction.calls + "%, blue " + gradientAction.folds + "%, black " + gradientAction.folds + "%)", color: "white" }}>{card}</button>
    </>)
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