/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import {name as appName} from "../app.json";
import SQLite from "react-native-sqlite-storage";

AppRegistry.registerComponent(appName, () => App);

SQLite.enablePromise(true);
console.warn = () => {};
