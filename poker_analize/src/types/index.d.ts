export type PokerSituation = {
    heroPosition: Position
    villainPosition: Position
    raiseCount: number
    aggresser: Position
}

export type Position = "utg" | "hj" | "co" | "btn" | "sb" | "bb" | ""