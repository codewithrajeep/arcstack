import fs from "fs";
import path from "path";
import { ProjectConfig } from "../../types/project-config";
import { DependencySet } from "../../types/dependency-set";

export async function generateExpress(
  config: ProjectConfig
): Promise<DependencySet> {
  const root = path.join(process.cwd(), config.projectName);
  const src = path.join(root, "src");

  fs.writeFileSync(
    path.join(src, "index.ts"),
    `
import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (_, res) => {
  res.json({ message: 'ArchonCLI Express Backend 🚀' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
`
  );

  return {
    dependencies: {
      express: "^4.19.0",
    },
    devDependencies: {
      "@types/express": "^4.17.0",
    },
  };
}
