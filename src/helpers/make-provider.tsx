import {
  ProviderComponent,
  ProviderComponentProps,
  TupleProviderWithProps,
} from '../types/provider';

export function makeProvider<T>(
  provider: ProviderComponent<T>,
  props?: Omit<ProviderComponentProps<T>, "children">,
): TupleProviderWithProps<T> {
  return [provider, props];
}
