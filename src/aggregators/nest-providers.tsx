import React, { PropsWithChildren } from 'react';
import { ProviderComponent } from '../types/provider';

export function nestProviders(
  PreviousProviders: ProviderComponent<unknown>,
  CurrentProvider: ProviderComponent<unknown>,
): ProviderComponent<unknown> {
  return function NestedProviders({
    children,
  }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <PreviousProviders>
        <CurrentProvider>{children}</CurrentProvider>
      </PreviousProviders>
    );
  };
}
