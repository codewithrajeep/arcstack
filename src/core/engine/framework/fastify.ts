export function fastifyFramework() {
  return {
    dependencies: ["fastify"],
    structure: ["src"],
    templates: ["fastify-app"],
  };
}
