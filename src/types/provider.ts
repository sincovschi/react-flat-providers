import { ComponentPropsWithoutRef, ComponentType } from 'react';

export type ProviderComponent<T> = ComponentType<T>;

export type ProviderComponentProps<T> = ComponentPropsWithoutRef<
  ProviderComponent<T>
>;

export type TupleProviderWithProps<T = object> = [
  ComponentType<T>,
  ProviderComponentProps<T>,
];
