import React, { PropsWithChildren } from 'react';
import { ProviderComponent } from '../types/provider';

export function nestProviders(
  PreviousProviders: ProviderComponent<object>,
  CurrentProvider: ProviderComponent<object>,
): ProviderComponent<object> {
  return function NestedProviders({
    children,
  }: PropsWithChildren<object>): JSX.Element {
    return (
      <PreviousProviders>
        <CurrentProvider>{children}</CurrentProvider>
      </PreviousProviders>
    );
  };
}
