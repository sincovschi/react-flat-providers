import {
  ProviderComponent,
  ProviderComponentProps,
  TupleProviderWithProps,
} from '../types/provider';

export function makeProvider<T>(
  provider: ProviderComponent<T>,
  props: ProviderComponentProps<T>,
): TupleProviderWithProps<T> {
  return [provider, props];
}
