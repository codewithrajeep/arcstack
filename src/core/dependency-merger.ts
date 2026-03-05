import { DependencySet } from "../types/dependency-set";

export function mergeDependencies(sets: DependencySet[]): DependencySet {
  const result: DependencySet = {
    dependencies: {},
    devDependencies: {},
    scripts: {},
  };
  for (const set of sets) {
    if (set.dependencies) {
      Object.assign(result.dependencies!, set.dependencies);
    }
    if (set.devDependencies) {
      Object.assign(result.dependencies!, set.devDependencies);
    }
    if (set.scripts) {
      Object.assign(result.scripts!, set.scripts);
    }
  }
  return result;
}
