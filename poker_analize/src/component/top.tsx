import { DropArea } from './DropDirectory'
import {analize} from '../stars/HandAnalize'
export function Top() {

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        const item = e.dataTransfer?.items[0];
        const entry = item?.webkitGetAsEntry();

        if (entry.isFile) {
            //ファイルの解析
            const file:File = await new Promise((resolve) => {
                entry.file((file: File) => {
                    resolve(file);
                });
            });
            const hoge= await file.text()
            analize(hoge,"i-taisuke")
        } else if (entry.isDirectory) {
            const directoryReader = entry.createReader();
            const entries = await new Promise((resolve) => {
                directoryReader.readEntries((entries:object) => {
                    resolve(entries);
                });
            });
            console.log("これはディレクトリです",entries)            
        }
    }

    return (
        <DropArea onDrop={handleDrop}>
            <div style={{ width: 600, height: 300, border: "solid", borderWidth: 2 }}>
                ここにファイル/フォルダをドロップしてください
            </div>
        </DropArea>)
}

