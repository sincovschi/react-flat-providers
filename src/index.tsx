import React, { PropsWithChildren, ReactElement } from 'react';
import { nestProviders } from './aggregators/nest-providers';
import { unwrapTupleProvider } from './aggregators/unwrap-tuple-providers';
import { ProviderComponent, TupleProviderWithProps } from './types/provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Providers<T = any> = Array<
  ProviderComponent<T> | TupleProviderWithProps<T>
>;

export function FlatProviders({
  providers,
  children,
}: PropsWithChildren<{
  providers: Providers;
}>): ReactElement {
  const unwrappedProviders = providers.map(unwrapTupleProvider);

  const NestedProviders = unwrappedProviders.reduce(nestProviders);

  return <NestedProviders>{children}</NestedProviders>;
}

export * from './helpers/chain-providers';
export * from './helpers/make-provider';
