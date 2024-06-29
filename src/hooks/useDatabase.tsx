import { useState, useCallback, useEffect } from "react";
import SQLite from "react-native-sqlite-storage";
import { SelectResults, Tables, TableType } from "types/Schema";
import convertQuote from "utils/convertQuote";

type SQLites = {
    database : SQLite.SQLiteDatabase
    error: false
} | {
    sqlError: SQLite.SQLError
    error: true
};

export interface RecordProps {
    walktime: number
    steps: number
    kcal: number
    distance: number
}

export interface SQLiteHelper {
    init: () => Promise<void>
    addRecord: (type: TableType, record: Tables) => Promise<boolean>
    hasRecord: (type: TableType, where?: string) => Promise<number>
    updateRecord: (type: TableType, newRecord: Tables, where?: string) => Promise<boolean>
    selectRecord: (type: TableType, foreign?: string, where?: string) => Promise<SelectResults>
    error: false
}

export interface SQLiteError {
    cause: string
    error: true
}

const tableName = {
    MONTH: "walkOfMonth",
    DATE: "walkOfDate",
    DATETIME: "walkOfDatetime",
} as const;

const useDatabase = () => {

    const [ sqlite, setSqlite ] = useState<SQLites>();

    const executeSql = (query: string, params?: unknown[]): Promise<SQLite.ResultSet> => {
        return new Promise((resolve, reject) => {
            if (!sqlite) {
                return reject("SQLite is not initialized");
            }

            if (sqlite.error) {
                return reject(sqlite.sqlError.message);
            }

            sqlite.database.transaction(tx => {
                tx.executeSql(query, params, (_, results) => {
                    resolve(results);
                }, (_, error) => {
                    console.log(error.message);
                    reject(error.message);
                });
            });
        });
    };

    const helpers = useCallback((): SQLiteHelper | SQLiteError => {
        if (!sqlite) {
            return {
                error: true,
                cause: "SQLite is not initialized",
            };
        }

        if (sqlite.error) {
            return {
                error: true,
                cause: sqlite.sqlError.message,
            };
        }

        return {
            error: false,
            init: async () => {
                await executeSql("PRAGMA foreign_keys = 1");
                await executeSql("DROP TABLE IF EXISTS walkOfDatetime");
                await executeSql("DROP TABLE IF EXISTS walkOfDate");
                await executeSql("DROP TABLE IF EXISTS walkOfMonth");
                await executeSql(`
                    CREATE TABLE IF NOT EXISTS walkOfMonth (
                        yearMonth CHAR(7) PRIMARY KEY,
                        walktime INTEGER NOT NULL DEFAULT 0,
                        steps INTEGER NOT NULL DEFAULT 0,
                        kcal INTEGER NOT NULL DEFAULT 0,
                        distance DOUBLE NOT NULL DEFAULT 0
                    )
                    `);
                await executeSql(`
                    CREATE TABLE IF NOT EXISTS walkOfDate (
                        yearMonth CHAR(7) NOT NULL,
                        date CHAR(5) PRIMARY KEY,
                        walktime INTEGER NOT NULL DEFAULT 0,
                        steps INTEGER NOT NULL DEFAULT 0,
                        kcal INTEGER NOT NULL DEFAULT 0,
                        distance DOUBLE NOT NULL DEFAULT 0,
                        CONSTRAINT yearMonth_fk FOREIGN KEY(yearMonth)
                        REFERENCES walkOfMonth(yearMonth)
                    )
                    `);
                await executeSql(`
                    CREATE TABLE IF NOT EXISTS walkOfDatetime (
                        date CHAR(5) NOT NULL,
                        datetime CHAR(8) PRIMARY KEY,
                        walktime INTEGER NOT NULL DEFAULT 0,
                        steps INTEGER NOT NULL DEFAULT 0,
                        kcal INTEGER NOT NULL DEFAULT 0,
                        distance DOUBLE NOT NULL DEFAULT 0,
                        CONSTRAINT date_fk FOREIGN KEY(date)
                        REFERENCES walkOfDate(date)
                    )
                    `);

                return;
            },
            addRecord: async (type: TableType, record: Tables): Promise<boolean> => {
                const query = `
                        INSERT INTO 
                            ${tableName[type]}(${Object.keys(record).map<string>(value => value).join(",")})
                        VALUES
                            (${Object.values(record).map<string>(value => convertQuote(value)).join(",")})
                    `;

                await executeSql(query);

                return true;
            },
            hasRecord: async (type: TableType, where: string | undefined): Promise<number> => {
                const query = `
                        SELECT * FROM ${tableName[type]} ${where ? `WHERE ${where}` : ""}
                    `;
                const result = await executeSql(query);

                return result.rows.length;
            },
            updateRecord: async (type: TableType, newRecord: Tables, where: string | undefined): Promise<boolean> => {
                const query = `
                        UPDATE ${tableName[type]} SET ${Object.entries(newRecord).map<string>(value => `${value[0]}=${convertQuote(value[1])}`).join(",")} ${where ? `WHERE ${where}` : ""}
                    `;
                await executeSql(query);

                return true;
            },
            selectRecord: async (type: TableType, foreign: string | undefined, where: string | undefined): Promise<SelectResults> => {
                const query = `
                        SELECT * FROM ${tableName[type]} ${foreign ? `INNER JOIN ${foreign} ` : ""}${where ? `WHERE ${where}` : ""}
                    `;
                const result = await executeSql(query);

                return {
                    data: result.rows.raw(),
                    type: type,
                };
            },
        };

    }, [ sqlite ]);

    useEffect(() => {
        ( async() => {
            await SQLite.openDatabase(
                {
                    location: "default",
                    name: "walkup.db",
                    createFromLocation: 1,
                },
                db => setSqlite(
                    {
                        database: db,
                        error: false,
                    }
                ),
                error => setSqlite(
                    {
                        sqlError: error,
                        error: true,
                    }
                )
            );

            console.log("[Database] useEffect()");
        })();
    }, []);

    return helpers;
};

export default useDatabase;
