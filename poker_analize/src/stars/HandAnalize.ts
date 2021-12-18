const card: string[] = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
const card_picture: string[] = ["T", "J", "Q", "K", "A"]
const positionList: string[] = ["utg", "hj", "co", "btn", "sb", "bb"]
export function analize(handHistory: string, userName: string, position: string): object {
    //ハンドの一覧からハンド単位に分ける
    const handArray = handHistory.split("*** HOLE CARDS ***\r\n")
    //1つ目のデータはいらない。２つ目のデータからがハンドの詳細
    const allHand: any = createCardList()
    handArray.slice(1).forEach((hand: string) => {
        const myHand = getHand(hand, userName)
        let { myAction, myPosition } = getPreflopAction(hand, userName)
        if (myPosition === position) {
            allHand[myHand][myAction] += 1
        }
    })
    return allHand
}

function getPreflopAction(history: string, userName: string) {

    const preflop = history.split("***")[0]
    let eachPlayerAction = preflop.split("\r\n")
    let yourPosition = ""
    let yourAction = ""

    try {
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
    } catch (e) {
        console.log("history", history)
        console.log("preflop", preflop)
    }


    return { myAction: yourAction, myPosition: yourPosition }
}


function getHand(history: string, userName: string): string {

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

export function createCardList() {
    const allHand: any = {}
    card.forEach((row, rowIndex) => {
        card.forEach((column, columnIndex) => {
            allHand[rowIndex < columnIndex ? row + column + "s" : rowIndex > columnIndex ? column + row + "o" : column + row] = { "raises": 0, "calls": 0, "folds": 0 }
        })
    })
    return allHand
}

export function calcActionPercentage(raises: number, calls: number, folds: number) {
    const raisePercentage = raises / (raises + calls + folds) * 100 | 0
    const callPercentage = calls / (raises + calls + folds) * 100 | 0
    const foldPercentage = folds / (raises + calls + folds) * 100 | 0

    return { raises: raisePercentage, calls: callPercentage, folds: foldPercentage }
}

export async function fileToText(entry: any) {
    if (entry.isFile) {
        //ファイルの解析
        const file: File = await new Promise((resolve) => {
            entry.file((file: File) => {
                resolve(file);
            });
        });
        return await file.text()
    } else {
        return null
    }
}

export function mergeHand(hand: any, otherHand: any) {
    const mergedHand: any = {}

    if (hand = {}) {
        return otherHand
    } else if (otherHand = {}) {
        return hand
    }

    card.forEach((row, rowIndex) => {
        card.forEach((column, columnIndex) => {
            if (rowIndex < columnIndex) {
                mergedHand[row + column + "s"] = { "raises": hand[row + column + "s"].raises + otherHand[row + column + "s"].raises, "calls": hand[row + column + "s"].calls + otherHand[row + column + "s"].calls, "folds": hand[row + column + "s"].folds + otherHand[row + column + "s"].folds }
            } else if (rowIndex > columnIndex) {
                mergedHand[column + row + "o"] = { "raises": hand[column + row + "o"].raises + otherHand[column + row + "o"].raises, "calls": hand[column + row + "o"].calls + otherHand[column + row + "o"].calls, "folds": hand[column + row + "o"].folds + otherHand[column + row + "o"].folds }
            } else {
                mergedHand[column + row] = { "raises": hand[column + row].raises + otherHand[column + row].raises, "calls": hand[column + row].calls + otherHand[column + row].calls, "folds": hand[column + row].folds + otherHand[column + row].folds }
            }

        })
    })
    return mergedHand

}