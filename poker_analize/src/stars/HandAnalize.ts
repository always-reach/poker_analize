export function analize(handHistory:string,userName:string){
    console.log("handhistory",handHistory)
    //ハンドの一覧からハンド単位に分ける
    const handArray=handHistory.split("*** HOLE CARDS ***\r\n")
    console.log("Hand Array",handArray)

    //1つ目のデータはいらない。２つ目のデータからがハンドの詳細
    handArray.slice(1).forEach((hand:string)=>{
        const yourhand=hand.substr(2,5)
        console.log("action",hand.split("\r\n"))
    })
}