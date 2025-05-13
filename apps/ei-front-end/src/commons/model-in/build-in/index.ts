/**
 * THIS SPECIFIC FILE IS EXPERIMENTAL CODE
 * DO NOT USE ON PRODUCTION
 *
 * THIS FILE IS:
 * A WORK IN PROGRESS
 * TESTING CODE
 * ALSO A PLAYGROUND FOR TEST TYPESCRIPT INFERENCES
 *
 **/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AFunction = (...args: any[]) => any;

type MetaBuilderStep<TAccessor extends string, TFn extends AFunction> = {
  readonly accessor: TAccessor;
  readonly fn: TFn;
};

type MetaBuilderStepCallback<TInputResult, TTargetParams> = (
  input: TInputResult
) => TTargetParams;

const MetaBuilder = <
  TTargetAccessor extends string,
  TTargetFn extends AFunction,
  TInputAccessor extends string,
  TInputFn extends AFunction
>(
  targetStep: MetaBuilderStep<TTargetAccessor, TTargetFn>,
  inputStep: MetaBuilderStep<TInputAccessor, TInputFn>
) => {
  type TTargetParams = Parameters<typeof targetStep.fn>[0];
  type TInputParams = Parameters<typeof inputStep.fn>[0];

  const builder = <T extends TInputParams>(params: T) => {
    const inputResult = inputStep.fn(params) as ReturnType<TInputFn>;

    return {
      [targetStep.accessor]: <
        C extends MetaBuilderStepCallback<typeof inputResult, TTargetParams>
      >(
        callback: C
      ) => targetStep.fn(callback(inputResult)),
    } as {
      [K in TTargetAccessor]: <
        C extends MetaBuilderStepCallback<typeof inputResult, TTargetParams>
      >(
        callback: C
      ) => ReturnType<TTargetFn>;
    };
  };

  return {
    addStep: <TNextAccessor extends string, TNextFn extends AFunction>(
      nextStep: MetaBuilderStep<TNextAccessor, TNextFn>
    ) => {
      return MetaBuilder(
        {
          accessor: inputStep.accessor,
          fn: builder,
        },
        nextStep
      );
    },
    build: () => builder,
  };
};

export const createBuilder = <
  TTargetAccessor extends "build",
  TTargetFn extends AFunction,
  TInputAccessor extends string,
  TInputFn extends AFunction
>(
  ...params: Parameters<
    typeof MetaBuilder<TTargetAccessor, TTargetFn, TInputAccessor, TInputFn>
  >
) => {
  return MetaBuilder(...params);
};

// TESTING CODE
// Example 1: Using static types

const abBuilder = createBuilder(
  {
    accessor: "build",
    fn: <T extends number>(params: { a: T; b: number }) => ({
      resultA: params.a,
      resultB: params.b,
    }),
  },
  {
    accessor: "addA",
    fn: <T extends number>(params: { a: T }) => ({
      a: params.a,
    }),
  }
).build();

const ab = abBuilder({ a: 1 }).build((params) => ({
  a: params.a,
  b: 2,
}));

// Example 2: Supporting generic functions
const abcBuilder = createBuilder(
  {
    accessor: "build",
    fn: <T extends number>(params: { g: T }) => ({
      resultABC: params.g,
    }),
  },
  {
    accessor: "addE",
    fn: <T extends number>(params: { e: T }) => ({
      f: params.e,
    }),
  }
)
  .addStep({
    accessor: "addC",
    fn: <T extends number>(params: { c: T }) => ({
      d: params.c,
    }),
  })
  .addStep({
    accessor: "AddA",
    fn: <T extends number>(params: { a: T }) => ({
      b: params.a,
    }),
  })
  .build();

const abc = abcBuilder({ a: 1 } as const)
  .addC(({ b }) => ({ c: b }))
  .addE(({ d }) => ({ e: d }))
  .build(({ f }) => ({
    g: f,
  }));
