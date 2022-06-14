import React, { PropsWithChildren } from 'react';
import { ProviderComponent, TupleProviderWithProps } from '../types/provider';

function isTuple(
  arg: ProviderComponent<object> | TupleProviderWithProps,
): arg is TupleProviderWithProps {
  return Array.isArray(arg);
}

export function unwrapTupleProvider(
  tuple: ProviderComponent<object> | TupleProviderWithProps,
): ProviderComponent<{}> {
  if (!isTuple(tuple)) {
    return tuple;
  }

  const [Provider, props] = tuple;

  const ProviderWithProps = function ({ children }: PropsWithChildren) {
    return <Provider {...props}>{children}</Provider>;
  };

  return ProviderWithProps;
}
