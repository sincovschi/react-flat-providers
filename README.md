# react-flat-providers

> React component to organize and flatten providers.

[![NPM](https://img.shields.io/npm/v/react-flat-providers.svg)](https://www.npmjs.com/package/react-flat-providers) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-flat-providers
```

## Why

```tsx
/**
 * Its very common to have Spaceships like this in your React project.
 * A common pattern is to break these big Spaceships into smaller ones.
 * But I saw that this increases the amount of code and complexity even more.
 */

<NumberProvider>
  <BooleanProvider>
    <StringProvider>
      ...
      <ContextConsumingComponent />
      ...
    </StringProvider>
  </BooleanProvider>
</NumberProvider>
```

## Solution

```tsx
/**
 * Please check /example/src/index.tsx and imported providers
 * to see how to use FlatProviders more detailed.
 * */

<FlatProviders
  providers={[
    // Can pass directly as FunctionComponent
    NumberProvider,
    // Can pass as Pair of Component and Object with parameters
    [BooleanProvider, { initialValue: true }],
    // Even as Pair of Context.Provider and Object with key 'value'
    // Compatible with Redux-Toolkit with Object with key 'store'
    [StringContext.Provider, { value: 'Hello world!' }]
  ]}
>
  <App />
</FlatProviders>
```

```ts
// A Provider can be anything that exposes a Context
type Provider = FunctionComponent<any> | ComponentClass<any> | typeof Component

// Passed Providers must be an Array that have as values:
// Provider or an Array with Provider and its properties as Object
type Providers = Array<Provider | [Provider, Record<string, unknown>]>
```

## License

MIT © [sincovschi](https://github.com/sincovschi)
