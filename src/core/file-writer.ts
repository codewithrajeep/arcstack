import path from "path";
import fs from "fs";

export function createDirectoryStructure(
    basePath: string,
    structure: string[]
) {
    for(const dir of structure){
        const fullPath = path.join(basePath, dir);
        fs.mkdirSync(fullPath, {recursive: true})
    }
}