import React, {
  Component,
  ComponentClass,
  FunctionComponent,
  PropsWithChildren
} from 'react'

export type Provider =
  | FunctionComponent<any>
  | ComponentClass<any>
  | typeof Component

export type FlatProvidersProps = PropsWithChildren<{
  providers: Array<Provider | [Provider, Record<string, unknown>]>
}>
