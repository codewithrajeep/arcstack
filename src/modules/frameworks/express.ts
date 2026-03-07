import { loadTemplateDir } from "../../core/template-engine";
import { ModuleResult } from "../../types/module";
import { Architecture } from "../../types/project-config";

export function generateExpress(architecture: Architecture): ModuleResult {
  return {
    files: loadTemplateDir("express", architecture),
    dependencies: {
      dependencies: {
        express: "^4.19.0",
      },
      devDependencies: {
        "@types/express": "^4.17.0",
        "@types/node": "^20.0.0",
        typescript: "^5.0.0",
        "ts-node": "^10.9.1",
      },
      scripts: {
        dev: "ts-node src/index.ts",
        build: "tsc",
        start: "node dist/index.js",
      },
    },
  };
}
