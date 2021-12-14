import { DropArea } from './DropDirectory'
import { analize } from '../stars/HandAnalize'
import { HandRange } from './RangeGrid'

import '../css/button.css'

const card: string[] = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
export function Top() {

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        const item = e.dataTransfer?.items[0];
        const entry = item?.webkitGetAsEntry();

        if (entry.isFile) {
            //ファイルの解析
            const file: File = await new Promise((resolve) => {
                entry.file((file: File) => {
                    resolve(file);
                });
            });
            const hoge = await file.text()
            analize(hoge, "i-taisuke", "utg")
        } else if (entry.isDirectory) {
            const directoryReader = entry.createReader();
            const entries = await new Promise((resolve) => {
                directoryReader.readEntries((entries: object) => {
                    resolve(entries);
                });
            });
            console.log("これはディレクトリです", entries)
        }
    }

    return (<div>
        <DropArea onDrop={handleDrop}>
            <div style={{ width: 600, height: 300, border: "solid", borderWidth: 2 }}>
                ここにファイル/フォルダをドロップしてください
            </div>
        </DropArea>
        <select>
            <option value="">--ポジションを選択してください</option>
            <option value="utg">UTG</option>
            <option value="hj">HJ</option>
            <option value="co">CO</option>
            <option value="btn">BTN</option>
            <option value="sb">SB</option>
            <option value="bb">BB</option>
        </select>
        <HandRange />
    </div>)
}

