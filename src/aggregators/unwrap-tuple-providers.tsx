import React, { PropsWithChildren, ReactElement } from 'react';
import { ProviderComponent, TupleProviderWithProps } from '../types/provider';

export function unwrapTupleProvider(
  tuple: ProviderComponent<unknown> | TupleProviderWithProps,
): ProviderComponent<unknown> {
  if (!Array.isArray(tuple)) {
    return tuple;
  }

  const [Component, props] = tuple;

  return function ProviderWithProps({
    children,
  }: PropsWithChildren<unknown>): ReactElement {
    return <Component {...props}>{children}</Component>;
  };
}
