export function analize(handHistory: string, userName: string, position: string) {
    //ハンドの一覧からハンド単位に分ける
    const handArray = handHistory.split("*** HOLE CARDS ***\r\n")
    //1つ目のデータはいらない。２つ目のデータからがハンドの詳細
    const card: string[] = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
    const allHand: any = {}
    card.forEach((row, rowIndex) => {
        card.forEach((column, columnIndex) => {
            allHand[rowIndex < columnIndex ? row + column + "s" : rowIndex > columnIndex ? column + row + "o" : column + row] = { "raises": 0, "calls": 0, "folds": 0 }
        })
    })
    handArray.slice(1).forEach((hand: string) => {
        const myHand = getHand(hand, userName)
        let { myAction, myPosition } = getPreflopAction(hand, userName)
        if (myPosition === position) {
            console.log(myHand)
            allHand[myHand][myAction] += 1
        }
    })
    console.log("allHand", allHand)
}

function getPreflopAction(history: string, userName: string) {
    const positionList = ["utg", "hj", "co", "btn", "sb", "bb"]
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
        if (yourhand.substr(2, 1) === picture) {
            yourhand = yourhand.substr(2, 2) + yourhand.substr(0, 2)
        }
    })
    if (yourhand.substr(1, 1) === yourhand.substr(3, 1)) {
        yourhand = yourhand.substr(0, 1) + yourhand.substr(2, 1) + "s"
    } else if (yourhand.substr(0, 1) !== yourhand.substr(2, 1)) {
        yourhand = yourhand.substr(0, 1) + yourhand.substr(2, 1) + "o"
    } else {
        yourhand = yourhand.substr(0, 1) + yourhand.substr(2, 1)
    }
    return yourhand
}