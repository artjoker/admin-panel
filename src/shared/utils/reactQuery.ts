import { UseQueryResult, UseMutationResult } from '@tanstack/react-query';

type PreparedQueryResult<O extends string, T> = Record<
  `${O}${'IsLoading' | 'IsError'}`,
  boolean
> &
  Record<`${O}${'FetchError'}`, Error> &
  Record<O, T>;

/**
 * Mapper for result of UseQuery hook
 * @param entity base key for query result, for example: 'users', etc.
 * @param result result of UseQuery hook
 * @returns prepared query result for using in client code
 */
export const prepareQueryResult = <
  O extends string,
  T,
  D extends AT,
  N extends true | undefined,
  AT = [N] extends [true] ? T | null : T,
>(
  entity: O,
  result: UseQueryResult<T, unknown>,
  defaultValue: D,
  _nullable?: N,
): PreparedQueryResult<O, AT> =>
  ({
    [entity]: result.data ?? defaultValue ?? null,
    [`${entity}IsLoading`]: result.isLoading,
    [`${entity}IsError`]: result.isError,
    [`${entity}FetchError`]: result.error,
  } as PreparedQueryResult<O, AT>);

type PreparedMutation<O extends string, D, P> = Record<
  `${O}${'Loading' | 'Error'}`,
  boolean
> &
  Record<O, UseMutationResult<D, unknown, P, unknown>['mutate']>;

/**
 * Mapper for result of useMutation hook
 * @param mutateKey base key for mutation, for example 'createUser', etc.
 * @param mutation result of useMutation hook
 * @returns prepared mutation for using in client code
 */
export const prepareMutation = <O extends string, D, P>(
  mutateKey: O,
  mutation: UseMutationResult<D, unknown, P, unknown>,
): PreparedMutation<O, D, P> =>
  ({
    [mutateKey]: mutation.mutate,
    [`${mutateKey}Loading`]: mutation.isLoading,
    [`${mutateKey}Error`]: mutation.isError,
  } as PreparedMutation<O, D, P>);
