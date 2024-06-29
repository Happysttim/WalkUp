// import * as SQLite from "expo-sqlite";

// type TableType = "MONTH" | "DAY" | "DAYTIME";
// type SelectType = "SINGLE" | "RANGE" | "ALL";

// interface CommonProp {
//     walktime: number
//     kcal: number
//     distance: number
//     steps: number
// }

// interface DateProp {
//     yearMonth: string | undefined
//     date: string | undefined
//     datetime: string | undefined
// }

// interface Option {
//     type: SelectType
//     op1: string | undefined
//     op2: string | undefined
//     fk: boolean | undefined
// }

// export interface DatabaseHelper {
//     init: () => void
//     // updateComponent: (isRun: boolean, stopwatch: number, steps: number, kcal: number) => Promise<SQLite.SQLiteRunResult>
//     // updateGps: (latitude: number, longitude: number, distance: number) => Promise<SQLite.SQLiteRunResult>
//     // initGps: (latitude: number, longitude: number, distance: number) => Promise<SQLite.SQLiteRunResult>
//     insertMonthRecord: (yearMonth: string, commonProp: CommonProp) => Promise<SQLite.SQLiteRunResult>
//     insertDateRecord: (yearMonth: string, date: string, commonProp: CommonProp) => Promise<SQLite.SQLiteRunResult>
//     insertDatetimeRecord: (date: string, datetime: string, commonProp: CommonProp) => Promise<SQLite.SQLiteRunResult>
//     checkRecord: (type: TableType, dateProp: DateProp) => Promise<boolean>
//     updateMonthRecord: (yearMonth: string, commonProp: CommonProp) => Promise<SQLite.SQLiteRunResult>
//     updateDateRecord: (date: string, commonProp: CommonProp) => Promise<SQLite.SQLiteRunResult>
//     updateDatetimeRecord: (datetime: string, commonProp: CommonProp) => Promise<SQLite.SQLiteRunResult>
//     selectMonthRecord: (option: Option) => Promise<WalkOfMonth[]>
//     selectDateRecord: (option: Option) => Promise<WalkOfDate[]>
//     selectDatetimeRecord: (option: Option) => Promise<WalkOfDatetime[]>
//     deleteRecord: (tableType: TableType) => Promise<void>
// }

// export interface WalkOfMonth {
//     yearMonth: string
//     walktime: number
//     steps: number
//     kcal: number
//     distance: number
// }

// export interface WalkOfDate {
//     yearMonth: string
//     date: string
//     walktime: number
//     steps: number
//     kcal: number
//     distance: number
// }

// export interface WalkOfDatetime {
//     date: string
//     datetime: string
//     walktime: number
//     steps: number
//     kcal: number
//     distance: number
// }

// export interface WalkOfComponent {
//     stopwatch: number
//     steps: number
//     kcal: number
// }

// export interface Gps {
//     latitude: number
//     longitude: number
//     distance: number
// }

// export const initialDatabase = async (): Promise<DatabaseHelper> => {

//     const db = await SQLite.openDatabaseAsync("walkup");

//     return {
//         init: async (): Promise<void> => {
//             await db.execAsync(`
//                 PRAGMA foreign_keys = 1;
//                 DROP TABLE IF EXISTS walkOfComponent;
//                 DROP TABLE IF EXISTS gps;
//                 CREATE TABLE IF NOT EXISTS walkOfComponent (
//                     isRun BOOLEAN NOT NULL DEFAULT 0,
//                     stopwatch INTEGER NOT NULL DEFAULT 0,
//                     steps INTEGER NOT NULL DEFAULT 0,
//                     kcal INTEGER NOT NULL DEFAULT 0
//                 );
//                 CREATE TABLE IF NOT EXISTS gps (
//                     latitude INTEGER NOT NULL,
//                     longitude INTEGER NOT NULL,
//                     distance INTEGER NOT NULL
//                 );
//                 INSERT INTO walkOfComponent VALUES (0, 0, 0, 0);
//                 CREATE TABLE IF NOT EXISTS walkOfMonth (
//                     yearMonth CHAR(7) PRIMARY KEY,
//                     walktime INTEGER NOT NULL DEFAULT 0,
//                     steps INTEGER NOT NULL DEFAULT 0,
//                     kcal INTEGER NOT NULL DEFAULT 0,
//                     distance DOUBLE NOT NULL DEFAULT 0
//                 );
//                 CREATE TABLE IF NOT EXISTS walkOfDate (
//                     yearMonth CHAR(7) NOT NULL,
//                     date CHAR(5) PRIMARY KEY,
//                     walktime INTEGER NOT NULL DEFAULT 0,
//                     steps INTEGER NOT NULL DEFAULT 0,
//                     kcal INTEGER NOT NULL DEFAULT 0,
//                     distance DOUBLE NOT NULL DEFAULT 0,
//                     CONSTRAINT yearMonth_fk FOREIGN KEY(yearMonth)
//                     REFERENCES walkOfMonth(yearMonth)
//                 );
//                 CREATE TABLE IF NOT EXISTS walkOfDatetime (
//                     date CHAR(5) NOT NULL,
//                     datetime CHAR(8) PRIMARY KEY,
//                     walktime INTEGER NOT NULL DEFAULT 0,
//                     steps INTEGER NOT NULL DEFAULT 0,
//                     kcal INTEGER NOT NULL DEFAULT 0,
//                     distance DOUBLE NOT NULL DEFAULT 0,
//                     CONSTRAINT date_fk FOREIGN KEY(date)
//                     REFERENCES walkOfDate(date)
//                 );
//             `);
//         },
//         updateComponent: async (isRun: boolean, stopwatch: number, steps: number, kcal: number): Promise<SQLite.SQLiteRunResult> => {
//             return await db.runAsync(
//                 "UPDATE walkOfComponent SET isRun = ?, stopwatch = ?, steps = ?, kcal = ?",
//                 isRun ? 1 : 0,
//                 stopwatch,
//                 steps,
//                 kcal,
//             );
//         },
//         updateGps: async (latitude: number, longitude: number, distance: number): Promise<SQLite.SQLiteRunResult> => {
//             return await db.runAsync(
//                 "UPDATE gps SET latitude = ?, longitude = ?, distance = ?",
//                 latitude,
//                 longitude,
//                 distance,
//             );
//         },
//         initGps: async (latitude: number, longitude: number, distance: number): Promise<SQLite.SQLiteRunResult> => {
//             return await db.runAsync(
//                 "INSERT INTO gps (latitude, longitude, distance) VALUES (?, ?, ?)",
//                 latitude,
//                 longitude,
//                 distance,
//             );
//         },
//         insertMonthRecord: async (yearMonth: string, commonProp: CommonProp): Promise<SQLite.SQLiteRunResult> => {
//             return await db.runAsync(
//                 "INSERT INTO walkOfMonth (yearMonth, walktime, steps, kcal, distance) VALUES (?, ?, ?, ?, ?)",
//                 yearMonth,
//                 commonProp.walktime,
//                 commonProp.steps,
//                 commonProp.kcal,
//                 commonProp.distance,
//             );
//         },
//         insertDateRecord: async (yearMonth: string, date: string, commonProp: CommonProp): Promise<SQLite.SQLiteRunResult> => {
//             return await db.runAsync(
//                 "INSERT INTO walkOfDate (yearMonth, date, walktime, steps, kcal, distance) VALUES (?, ?, ?, ?, ?, ?)",
//                 yearMonth,
//                 date,
//                 commonProp.walktime,
//                 commonProp.steps,
//                 commonProp.kcal,
//                 commonProp.distance
//             );
//         },
//         insertDatetimeRecord: async (date: string, datetime: string, commonProp: CommonProp): Promise<SQLite.SQLiteRunResult> => {
//             return await db.runAsync(
//                 "INSERT INTO walkOfDatetime (date, datetime, walktime, steps, kcal, distance) VALUES (?, ?, ?, ?, ?, ?)",
//                 date,
//                 datetime,
//                 commonProp.walktime,
//                 commonProp.steps,
//                 commonProp.kcal,
//                 commonProp.distance
//             );
//         },
//         checkRecord: async (type: TableType, dateProp: DateProp): Promise<boolean> => {
//             const result = await db.getAllAsync(`SELECT * FROM ${
//                 ((): string => {
//                     if (type === "MONTH") {
//                         return "walkOfMonth";
//                     }
//                     if (type === "DAY") {
//                         return "walkOfDate";
//                     }
//                     return "walkOfDatetime";
//                 })()
//             } WHERE ${
//                 ((): string => {
//                     if (type === "MONTH") {
//                         return `yearMonth = '${ dateProp.yearMonth }'`;
//                     }
//                     if (type === "DAY") {
//                         return `date = '${ dateProp.date }'`;
//                     }
//                     return `datetime = '${ dateProp.datetime }'`;
//                 })()
//             }`);

//             return result.length > 0;
//         },
//         updateMonthRecord: async (yearMonth: string, commonProp: CommonProp): Promise<SQLite.SQLiteRunResult> => {
//             return await db.runAsync(
//                 "UPDATE walkOfMonth SET walktime = ?, walktime = ?, kcal = ?, steps = ? WHERE yearMonth = ?",
//                 commonProp.walktime,
//                 commonProp.kcal,
//                 commonProp.distance,
//                 commonProp.steps,
//                 yearMonth
//             );
//         },
//         updateDateRecord: async (date: string, commonProp: CommonProp): Promise<SQLite.SQLiteRunResult> => {
//             return await db.runAsync(
//                 "UPDATE walkOfDate SET walktime = ?, walktime = ?, kcal = ?, steps = ? WHERE date = ?",
//                 commonProp.walktime,
//                 commonProp.kcal,
//                 commonProp.distance,
//                 commonProp.steps,
//                 date
//             );
//         },
//         updateDatetimeRecord: async (datetime: string, commonProp: CommonProp): Promise<SQLite.SQLiteRunResult> => {
//             return await db.runAsync(
//                 "UPDATE walkOfDatetime SET walktime = ?, kcal = ?, distance = ?, steps = ? WHERE datetime = ?",
//                 commonProp.walktime,
//                 commonProp.kcal,
//                 commonProp.distance,
//                 commonProp.steps,
//                 datetime
//             );
//         },
//         selectMonthRecord: async (option: Option): Promise<WalkOfMonth[]> => {
//             return await db.getAllAsync<WalkOfMonth>(
//                 `SELECT * FROM walkOfMonth ${
//                     ((): string => {
//                         switch (option.type) {
//                         case "ALL":
//                             return "";
//                         case "RANGE":
//                             return `WHERE yearMonth >= '${option.op1}' AND yearMonth <= '${option.op2}'`;
//                         case "SINGLE":
//                             return `WHERE yearMonth = '${option.op1}'`;
//                         }
//                     })()
//                 }`
//             );
//         },
//         selectDateRecord: async (option: Option): Promise<WalkOfDate[]> => {
//             return await db.getAllAsync<WalkOfDate>(
//                 `SELECT * FROM walkOfDate ${
//                     ((): string => {
//                         if (option.fk) {
//                             return "INNER JOIN walkOfMonth ON walkOfMonth.yearMonth = walkOfDate.yearMonth ";
//                         }
//                         return "";
//                     })()
//                 } ${
//                     ((): string => {
//                         switch (option.type) {
//                         case "ALL":
//                             return "";
//                         case "RANGE":
//                             return `WHERE date >= '${option.op1}' AND date <= '${option.op2}'`;
//                         case "SINGLE":
//                             return `WHERE date = '${option.op1}'`;
//                         }
//                     })()
//                 }`
//             );
//         },
//         selectDatetimeRecord: async (option: Option): Promise<WalkOfDatetime[]> => {
//             console.log(`SELECT * FROM walkOfDatetime ${
//                 ((): string => {
//                     if (option.fk) {
//                         return "INNER JOIN walkOfDate ON walkOfDate.date = walkOfDatetime.date ";
//                     }
//                     return "";
//                 })()
//             } ${
//                 ((): string => {
//                     switch (option.type) {
//                     case "ALL":
//                         return "";
//                     case "RANGE":
//                         return `WHERE datetime >= '${option.op1}' AND datetime <= '${option.op2}'`;
//                     case "SINGLE":
//                         return `WHERE datetime = '${option.op1}'`;
//                     }
//                 })()
//             }`);
//             const a = await db.getAllAsync<WalkOfDatetime>(
//                 `SELECT * FROM walkOfDatetime ${
//                     ((): string => {
//                         if (option.fk) {
//                             return "INNER JOIN walkOfDate ON walkOfDate.date = walkOfDatetime.date ";
//                         }
//                         return "";
//                     })()
//                 } ${
//                     ((): string => {
//                         switch (option.type) {
//                         case "ALL":
//                             return "";
//                         case "RANGE":
//                             return `WHERE datetime >= '${option.op1}' AND datetime <= '${option.op2}'`;
//                         case "SINGLE":
//                             return `WHERE datetime = '${option.op1}'`;
//                         }
//                     })()
//                 }`
//             );
//             console.log(a.length);
//             return await db.getAllAsync<WalkOfDatetime>(
//                 `SELECT * FROM walkOfDatetime ${
//                     ((): string => {
//                         if (option.fk) {
//                             return "INNER JOIN walkOfDate ON walkOfDate.date = walkOfDatetime.date ";
//                         }
//                         return "";
//                     })()
//                 } ${
//                     ((): string => {
//                         switch (option.type) {
//                         case "ALL":
//                             return "";
//                         case "RANGE":
//                             return `WHERE datetime >= '${option.op1}' AND datetime <= '${option.op2}'`;
//                         case "SINGLE":
//                             return `WHERE datetime = '${option.op1}'`;
//                         }
//                     })()
//                 }`
//             );
//         },
//         deleteRecord: async (tableType: TableType): Promise<void> => {
//             await db.runAsync(`DELETE FROM ${
//                 (() => {
//                     if (tableType === "MONTH") {
//                         return "walkOfMonth";
//                     }
//                     if (tableType === "DAY") {
//                         return "walkOfDate";
//                     }
//                     if (tableType === "DAYTIME") {
//                         return "walkOfDatetime";
//                     }
//                 })()
//             }`);

//             return;
//         },
//     };
// };

// export default initialDatabase;
