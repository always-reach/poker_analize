import * as React from 'react'
import { DropArea } from './DropDirectory'
import { analize, createCardList, fileToText } from '../stars/HandAnalize'
import { HandRange } from './RangeGrid'

import '../css/button.css'
import { PokerSituation, Position, Player, CardList } from '../types'
import Button from '@mui/material/Button'

//シチュエーションの初期値
const hero: Position = ""
const villain: Position = ""
const firstRaiser: Player = "hero"

const initialSituation = {
    heroPosition: hero,
    villainPosition: villain,
    raiseCount: 1,
    firstRaiser: firstRaiser
}

export function Top() {
    //ハンドのレイズ・コール・フォールドの割合が記された配列
    const [allHand, setAllHand] = React.useState<CardList>(createCardList())
    //シチュエーションもろもろ
    const [situation, setSituation] = React.useState<PokerSituation>(initialSituation)
    const [handHistory,setHandHistory]=React.useState<string>("")

    /**
     * ドラッグ&ドロップの処理
     * @param e イベント
     */
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        const item: DataTransferItem = e.dataTransfer?.items[0];
        const entry: any = item?.webkitGetAsEntry();
        let handText: string | null = ""

        //フォルダがドラッグ&ドロップされた時
        if (entry.isDirectory) {
            //フォルダを取得
            const directoryReader = entry.createReader();
            //フォルダからファイルへ
            const fileEntries: any = await new Promise((resolve) => {
                directoryReader.readEntries((entries: object) => {
                    return resolve(entries)
                });
            });
            //配列の形でハンドヒストリーを取得
            const response:string[] = await Promise.all(fileEntries.map(async (file: any) => { return fileToText(file) }))
            handText = response.join("\r\n")
        //ファイルがドラッグ&ドロップされた時
        } else if (entry.isFile) {
            //ファイルの解析
            handText = await fileToText(entry)
        }
        if (handText == null) {
            return
        }
        setHandHistory(handText)
    }

    const selectPosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSituation = { ...situation }
        newSituation["heroPosition"] = e.target.value as Position
        setSituation(newSituation)
    }

    const renderAction=():void=>{
        if(situation.heroPosition===""){
            alert("ポジションを選んでください")
            return
        }
        if(handHistory===""){
            alert("ハンド履歴をドラッグ&ドロップしてください")
            return
        }
        setAllHand(analize(handHistory,"i-taisuke",situation))
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
        <Button onClick={renderAction} variant="fullfiled">レンジを表示する</Button>
        <HandRange hand={allHand} />
    </div>)
}

