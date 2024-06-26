import { StringMap } from "../types/Type";

const krDays = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
];

const enDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const dateFormat = (d: Date, formatted: string) => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const week = d.getDay();

    const formatObject: StringMap = {
        yyyy: year.toString(),
        yy: year.toString().slice(2),
        MM: month.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        M: month.toString(),
        dd: day.toLocaleString("en-US", { minimumIntegerDigits: 2}),
        d: day.toString(),
        HH: hours.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        H: hours.toString(),
        mm: minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        m: minutes.toString(),
        ss: seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        s: seconds.toString(),
        kE: krDays[week],
        eE: enDays[week],
        eEE: enDays[week].slice(3),
    };

    return formatted.replace(/yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s|kE|eE|eEE/gi,
        (match: string) => {
            return formatObject[match];
        }
    );
};
