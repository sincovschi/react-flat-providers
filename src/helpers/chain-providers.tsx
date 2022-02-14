import React from 'react';
import { FlatProviders, Providers } from '../core/flat-providers';
import { ProviderComponent, ProviderComponentProps } from '../types/provider';

export function useChainProviders() {
  const providers: Providers = [];

  const ChainBuilder = {
    /**
     * Adds a new provider with its props to the stack.
     * The chain must end into `make()`
     */
    add<T>(provider: ProviderComponent<T>, props?: ProviderComponentProps<T>) {
      providers.push(props ? [provider, props] : provider);
      return ChainBuilder;
    },
    /**
     * Must be called once at the end of the Providers Chain.
     */
    make() {
      const ChainedFlatProviders: React.FunctionComponent = ({ children }) => {
        return <FlatProviders providers={providers}>{children}</FlatProviders>;
      };

      return ChainedFlatProviders;
    },
  };

  return ChainBuilder;
}
