import * as React from 'react'
import { DropArea } from './DropDirectory'
import { analize, createCardList, fileToText } from '../stars/HandAnalize'
import { HandRange } from './RangeGrid'

import '../css/button.css'

const card: string[] = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

export function Top() {
    const [allHand, setAllHand] = React.useState(createCardList())
    const [position, setPosition] = React.useState<string>("")

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        const item: DataTransferItem = e.dataTransfer?.items[0];
        const entry: any = item?.webkitGetAsEntry();
        let handText: string | null = ""

        if (entry.isDirectory) {
            const directoryReader = entry.createReader();
            const fileEntries: any = await new Promise((resolve) => {
                directoryReader.readEntries((entries: object) => {
                    return resolve(entries)
                });
            });
            const response = await Promise.all(fileEntries.map(async (file: any) => { return fileToText(file) }))
            handText = response.join("\r\n")
        } else if (entry.isFile) {
            console.log("this is file")
            //ファイルの解析
            handText = await fileToText(entry)
        }

        console.log("handText", handText)
        if (handText == null) {
            return
        }
        
        setAllHand(analize(handText, "i-taisuke", position))
    }

    const selectPosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosition(e.target.value)
    }

    return (<div>
        <DropArea onDrop={handleDrop}>
            <div style={{ width: 600, height: 300, border: "solid", borderWidth: 2 }}>
                ここにファイル/フォルダをドロップしてください
            </div>
        </DropArea>
        <select onChange={selectPosition}>
            <option value="">--ポジションを選択してください</option>
            <option value="utg">UTG</option>
            <option value="hj">HJ</option>
            <option value="co">CO</option>
            <option value="btn">BTN</option>
            <option value="sb">SB</option>
            <option value="bb">BB</option>
        </select>
        <HandRange hand={allHand} />
    </div>)
}

