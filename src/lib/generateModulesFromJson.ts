import * as fs from "fs";
import * as path from "path";
import { getDepth } from "./getDepth";

/**
 * JSON文字列から、TypeScriptモジュールを生成
 * @param {string} json -　データのJSON文字列
 * @param {string} outputDir - 出力ディレクトリのパス
 */
export const generateModulesFromJson = (json: string, outputDir: string) => {
  const jsonData = JSON.parse(json);
  const outputDirFile = path.join(outputDir, "index.ts");
  let outputDirFileContent = "";

  createDirectoryIfNotExists(outputDir);

  for (const category in jsonData) {
    const categoryDir = path.join(outputDir, category);
    generateIndexFile(jsonData[category], categoryDir);
    outputDirFileContent += `export * as ${category} from './${category}'\n`;
  }

  fs.writeFileSync(outputDirFile, outputDirFileContent);
};

/**
 * オブジェクトの深さに応じて、適切なファイル生成関数を呼び出す
 * @param {any} data - データのオブジェクト
 * @param {string} dir - 出力ディレクトリのパス
 */
const generateIndexFile = (data: any, dir: string) => {
  const depth = getDepth(data);

  if (depth === 0) {
    generateDepth0File(data, dir);
  } else if (depth === 1) {
    generateDepth1File(data, dir);
  } else {
    generateDepth2PlusFile(data, dir);
  }
};

/**
 * 深さ0のオブジェクトから、TypeScriptファイルを生成
 * @param {any} data - オブジェクト
 * @param {string} dir - 出力ディレクトリのパス
 */
const generateDepth0File = (data: any, dir: string) => {
  let content = "export const data = {\n";
  let exportContent = "export const {\n";

  for (const key in data) {
    content += `  ${key}: '${data[key]}',\n`;
    exportContent += `  ${key},\n`;
  }

  content += "}\n";
  exportContent += "} = data\n";
  content += exportContent;
  fs.writeFileSync(path.join(dir + ".ts"), content);
};

/**
 * 深さ1のオブジェクトから、TypeScriptファイルを生成
 * @param {any} data - オブジェクト
 * @param {string} dir - 出力ディレクトリのパス
 */
const generateDepth1File = (data: any, dir: string) => {
  createDirectoryIfNotExists(dir);

  let content = "";

  for (const key in data) {
    content += `export const ${key} = {\n`;

    for (const key2 in data[key]) {
      content += `  ${key2}: '${data[key][key2]}',\n`;
    }

    content += "}\n";
  }

  fs.writeFileSync(path.join(dir, "index.ts"), content);
};

/**
 * 深さ2以上のオブジェクトから、TypeScriptファイルを再帰的に生成
 * @param {any} data - オブジェクト
 * @param {string} dir - 出力ディレクトリのパス
 */

const generateDepth2PlusFile = (data: any, dir: string) => {
  createDirectoryIfNotExists(dir);

  let content = "";

  for (const key in data) {
    generateIndexFile(data[key], path.join(dir, key));
    content += `export * as ${key} from './${key}';\n`;
  }

  fs.writeFileSync(path.join(dir, "index.ts"), content);
};

/**
 * 指定されたディレクトリが存在しない場合、ディレクトリを作成
 * @param {string} dir - 作成するディレクトリのパス
 */
const createDirectoryIfNotExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
