export type Tables = WalkOfMonth | WalkOfDate | WalkOfDatetime
export type TableType = "MONTH" | "DATE" | "DATETIME"
export type SelectResults = {
    data: WalkOfMonth[]
    type: "MONTH"
} | {
    data: WalkOfDate[]
    type: "DATE"
} | {
    data: WalkOfDatetime[]
    type: "DATETIME"
}

export interface WalkOfMonth {
    yearMonth: string
    walktime: number
    steps: number
    kcal: number
    distance: number
}

export interface WalkOfDate {
    yearMonth: string
    date: string
    walktime: number
    steps: number
    kcal: number
    distance: number
}

export interface WalkOfDatetime {
    date: string
    datetime: string
    walktime: number
    steps: number
    kcal: number
    distance: number
}
