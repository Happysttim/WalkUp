export type Goal = number | "none";
export type Size = number | "auto";
export type StringMap = Record<string, string>

export interface Page {
    pageIndex: number
    label: string
}

export interface Location {
    latitude: number
    longitude: number
    time: string
    distance: number
}
