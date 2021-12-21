import React, {
  ComponentType,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement
} from 'react'

type ProviderComponent<T> = ComponentType<T>
type ProviderComponentProps<T> = ComponentPropsWithoutRef<ProviderComponent<T>>

type ProviderWithProps<T = unknown> = [
  ComponentType<T>,
  ComponentPropsWithoutRef<ComponentType<T>>
]

function curryProviders(
  provider: ProviderComponent<unknown> | ProviderWithProps
): ProviderComponent<unknown> {
  if (!Array.isArray(provider)) {
    return provider
  }

  const [Component, props] = provider

  return function CurriedComponent({
    children
  }: PropsWithChildren<unknown>): ReactElement {
    return <Component {...props}>{children}</Component>
  }
}

function nestProviders(
  PreviousProviders: ProviderComponent<unknown>,
  CurrentProvider: ProviderComponent<unknown>
): ProviderComponent<unknown> {
  return function NestedProviders({
    children
  }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <PreviousProviders>
        <CurrentProvider>{children}</CurrentProvider>
      </PreviousProviders>
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Providers<T = any> = Array<ProviderComponent<T> | ProviderWithProps<T>>

type FlatProvidersProps = PropsWithChildren<{
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  providers: Providers
}>

export default function FlatProviders({
  providers,
  children
}: FlatProvidersProps): ReactElement {
  const [first, ...rest] = providers.map(curryProviders)

  const NestedProviders = rest.reduce(nestProviders, first)

  return <NestedProviders>{children}</NestedProviders>
}

export function providerFrom<T>(
  provider: ProviderComponent<T>,
  props: ProviderComponentProps<T>
): ProviderWithProps<T> {
  return [provider, props]
}
