import { ModuleResult } from "../../types/module";

export async function generateExpress(): Promise<ModuleResult> {
  return {
    files: [
      {
        path: "src/index.ts",
        content: `
import express from "express";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "ArchonCLI Express Backend 🚀" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
        `,
      },
    ],
    dependencies: {
      dependencies: {
        express: "^4.19.0",
      },
      devDependencies: {
        "@types/express": "^4.17.0",
        typescript: "^5.0.0",
        "ts-node": "^10.9.1",
      },
    },
  };
}
