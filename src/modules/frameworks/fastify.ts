import { ModuleResult } from "../../types/module";
import { Architecture } from "../../types/project-config";
import { loadTemplateDir } from "../../core/template-engine";

export function generateFastify(architecture: Architecture): ModuleResult {
  return {
    files: loadTemplateDir("fastify", architecture),
    dependencies: {
      dependencies: {
        fastify: "^4.28.0",
        "@fastify/sensible": "^5.0.0",
        "fastify-plugin": "^4.5.0",
      },
      devDependencies: {
        "@types/node": "^20.0.0",
        typescript: "^5.0.0",
        "ts-node": "^10.9.1",
        "pino-pretty": "^11.0.0",
      },
      scripts: {
        dev: "ts-node src/index.ts",
        build: "tsc",
        start: "node dist/index.js",
      },
    },
  };
}