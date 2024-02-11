// This file is for the colorful cli in node js
import clc from "cli-color";

const colorErr = clc.red.bold;
const colorWarn = clc.yellow;
const colorInfo = clc.blue;
const colorSuccess = clc.green;

export { colorErr, colorWarn, colorInfo, colorSuccess };
export default clc;
