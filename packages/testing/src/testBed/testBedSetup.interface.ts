import { IO } from 'fp-ts/lib/IO';
import { BoundDependency, ContextProvider } from '@marblejs/core';
import { DependencyCleanup } from './testBedContainer.interface';
import { TestBed, TestBedFactory } from './testBed.interface';

export type UseTestBed<T extends TestBed> = (dependencies?: BoundDependency<any>[]) => Promise<T>;

export interface TestBedSetupConfig<T extends TestBed> {
  testBed: TestBedFactory<T>;
  dependencies?: readonly BoundDependency<any>[];
  cleanups?: readonly DependencyCleanup<any>[];
}

export interface TestBedSetup<T extends TestBed> {
  ask: ContextProvider;
  useTestBed: TestBedFactory<T>;
  cleanup: IO<Promise<void>>;
}
