export function analize(handHistory: string, userName: string) {
    console.log("handhistory", handHistory)
    //ハンドの一覧からハンド単位に分ける
    const handArray = handHistory.split("*** HOLE CARDS ***\r\n")
    //1つ目のデータはいらない。２つ目のデータからがハンドの詳細
    handArray.slice(1).forEach((hand: string) => {
        //レイズの回数(SRPか3betか4bet...か)
        let raiseCount = 0
        const myHand = getHand(hand, userName)
        let { myAction, myPosition } = getPreflopAction(hand, userName)
    })
}

function getPreflopAction(history: string, userName: string) {
    const positionList = ["UTG", "HJ", "CO", "BTN", "SB", "BB"]
    const preflop = history.split("***")[0]
    let eachPlayerAction = preflop.split("\r\n")
    let yourPosition = ""
    let yourAction = ""

    eachPlayerAction = eachPlayerAction.filter(item => (item.match("disconnected") == null))
    for (let i = 0; i < 6; i++) {
        if (eachPlayerAction[i + 1].indexOf(userName) !== -1) {
            yourPosition = positionList[i]
            yourAction = eachPlayerAction[i + 1].split(": ")[1]
            if (yourAction === undefined) {
                yourAction = "walk"
            }
            else if (!yourAction.match("folds")) {
                yourAction = yourAction.split(" ")[0]
            }
            break
        }
    }

    return { myAction: yourAction, myPosition: yourPosition }
}


function getHand(history: string, userName: string): string {
    const card_picture = ["T", "J", "Q", "K", "A"]
    let yourhand = history.split("Dealt to " + userName)[1].substr(2, 5)
    if (yourhand.substr(0, 1) < yourhand.substr(3, 1)) {
        yourhand = yourhand.substr(3, 2) + yourhand.substr(0, 2)
    } else {
        yourhand = yourhand.substr(0, 2) + yourhand.substr(3, 2)
    }

    card_picture.forEach((picture) => {
        if (yourhand.substr(3, 1) === picture) {
            yourhand = yourhand.substr(3, 2) + yourhand.substr(0, 2)
        }
    })
    console.log("yourhand", yourhand)
    if (yourhand.substr(1, 1) === yourhand.substr(3, 1)) {
        yourhand = yourhand.substr(0, 1) + yourhand.substr(2, 1) + "s"
    } else {
        yourhand = yourhand.substr(0, 1) + yourhand.substr(2, 1) + "o"
    }
    return yourhand
}