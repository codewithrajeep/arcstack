import { ModuleResult } from "../../types/module";
import { Architecture } from "../../types/project-config";
import { loadTemplateDir } from "../../core/template-engine";

export function generateNestjs(architecture: Architecture): ModuleResult {
  return {
    files: loadTemplateDir("nestjs", architecture),
    dependencies: {
      dependencies: {
        "@nestjs/common": "^10.0.0",
        "@nestjs/core": "^10.0.0",
        "@nestjs/platform-express": "^10.0.0",
        "reflect-metadata": "^0.2.0",
        "rxjs": "^7.8.0",
      },
      devDependencies: {
        "@nestjs/cli": "^10.0.0",
        "@nestjs/schematics": "^10.0.0",
        "@nestjs/testing": "^10.0.0",
        "@types/node": "^20.0.0",
        "@types/express": "^4.17.0",
        "typescript": "^5.0.0",
        "ts-node": "^10.9.1",
        "tsconfig-paths": "^4.2.0",
      },
      scripts: {
        dev: "ts-node -r tsconfig-paths/register src/main.ts",
        build: "tsc",
        start: "node dist/main.js",
      },
    },
  };
}