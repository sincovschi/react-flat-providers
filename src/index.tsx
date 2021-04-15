import React, {
  Component,
  ComponentClass,
  FunctionComponent,
  PropsWithChildren
} from 'react'

type Provider = FunctionComponent<any> | ComponentClass<any> | typeof Component

type Providers = Array<Provider | [Provider, Record<string, unknown>]>

type FlatProvidersProps = PropsWithChildren<{
  providers: Providers
}>

function curryProviders(
  provider: Provider | [Provider, Record<string, unknown>]
): Provider {
  if (!Array.isArray(provider)) {
    return provider
  }

  const [Component, props] = provider

  return function CurriedComponent({ children }: PropsWithChildren<unknown>) {
    return <Component {...props}>{children}</Component>
  }
}

function nestProviders(
  PreviousProviders: Provider,
  CurrentProvider: Provider
): Provider {
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

export default function FlatProviders({
  providers,
  children
}: FlatProvidersProps) {
  const [first, ...rest] = providers.map(curryProviders)

  const NestedProviders = rest.reduce(nestProviders, first)

  return <NestedProviders>{children}</NestedProviders>
}
