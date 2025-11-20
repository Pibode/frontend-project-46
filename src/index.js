import { parseFile } from "./parsers.js";

export default function genDiff(filepath1, filepath2, format = "stylish") {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  return `File1: ${JSON.stringify(data1)}\nFile2: ${JSON.stringify(
    data2
  )}\nFormat: ${format}`;
}
