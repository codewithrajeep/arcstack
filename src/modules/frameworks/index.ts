import { ModuleResult } from "../../types/module";
import { Architecture, Framework } from "../../types/project-config";
import { generateExpress } from "./express";
import { generateFastify } from "./fastify";
import { generateNestjs } from "./nestjs";

export function generateFramework(framework: Framework, architecture: Architecture): ModuleResult {
  switch(framework){
    case "express": return generateExpress(architecture);
    case "fastify": return generateFastify(architecture);
    case "nestjs": return generateNestjs(architecture);
  }
}