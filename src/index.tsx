import React, { PropsWithChildren, ReactElement } from 'react';
import { nestProviders } from './aggregators/nest-providers';
import { unWrapTupleProvider } from './aggregators/unwrap-tuple-providers';
import { ProviderComponent, TupleProviderWithProps } from './types/provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Providers<T = any> = Array<
  ProviderComponent<T> | TupleProviderWithProps<T>
>;

export default function FlatProviders({
  providers,
  children,
}: PropsWithChildren<{
  providers: Providers;
}>): ReactElement {
  const unWrappedProviders = providers.map(unWrapTupleProvider);

  const NestedProviders = unWrappedProviders.reduce(nestProviders);

  return <NestedProviders>{children}</NestedProviders>;
}

export * from './helpers/make-provider';
