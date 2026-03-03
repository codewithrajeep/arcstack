export interface ArchonModule {
  name: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  templates: {
    source: string;
    target: string;
  }[];
  scripts: Record<string, string>;
}
