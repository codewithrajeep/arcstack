import { DependencySet } from "../types/dependency-set";

export function mergeDependencies(sets: DependencySet[]): DependencySet {
  const result: DependencySet = {
    dependencies: {},
    devDependencies: {},
  };
  for (const set of sets) {
    if (set.dependencies) {
      Object.assign(result.dependencies!, set.dependencies);
    }
    if (set.devDependencies) {
      Object.assign(result.devDependencies!, set.devDependencies);
    }
  }
  return result;
}
