import fs from "fs";
import path from "path";
import { ProjectConfig } from "../../types/project-config";
import { DependencySet } from "../../types/dependency-set";

export async function generateNestjs(config: ProjectConfig): Promise<DependencySet> {
  const basePath = path.join(process.cwd(), config.projectName);
  fs.mkdirSync(basePath, { recursive: true });
  fs.writeFileSync(
    path.join(basePath, "src/main.ts"),
    `
        import { NestFactory } from '@nestjs/core';
        import { AppModule } from './app.module';

        async function bootstrap() {
          // Creates the application instance using the root Module
          const app = await NestFactory.create(AppModule);
  
          // Enable CORS if you're building an API for a frontend
          app.enableCors();
  
          await app.listen(3000);
          console.log(\`Application is running on: \${await app.getUrl()}\`);
        }

          bootstrap();
        `
  );

  return {
    dependencies: {
      "@nestjs/common": "^10.0.0",
      "@nestjs/core": "^10.0.0",
      "@nestjs/platform-express": "^10.0.0",
      "reflect-metadata": "^0.2.0",
      rxjs: "^7.8.0",
    },
    devDependencies: {
      "@nestjs/cli": "^10.0.0",
      "@nestjs/schematics": "^10.0.0",
      "@nestjs/testing": "^10.0.0",
      "@types/node": "^20.0.0",
    },
  };
}
