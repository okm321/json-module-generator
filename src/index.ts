#!/usr/bin/env node

import { generateModulesFromJson } from "./lib";
import * as fs from "fs";
import yargs from "yargs";

const slicedArgs = process.argv.slice(2);
const argv = yargs(slicedArgs)
  .option("json", {
    alias: "j",
    description: "JSON file path",
    type: "string",
  })
  .option("output", {
    alias: "o",
    description: "Output directory path",
    type: "string",
    default: "./output-modules",
  })
  .demandOption(["json"])
  .parseSync();

const jsonString = fs.readFileSync(argv.json, "utf-8");

generateModulesFromJson(jsonString, argv.output);
