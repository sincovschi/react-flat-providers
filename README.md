# react-flat-providers

> React component to organize and flatten providers.

[![NPM](https://img.shields.io/npm/v/react-flat-providers.svg)](https://www.npmjs.com/package/react-flat-providers)

## Install

```bash
npm install --save react-flat-providers
```

## Usage

Just use the `FlatProviders`-Component and pass it an Array of your Providers and their Props:

```tsx
import { FlatProviders } from 'react-flat-providers';
// ...

    <FlatProviders
      providers={[
        ProviderWithoutProps,
        [ProviderWithProps, { providerProps: 'propsValue' }],
      ]}
    >
      <App />
    </FlatProviders>
```

### Type-Safe Props

If you are using `TypeScript` and you want type-safety for your Providers' props, you can use the provided `makeProvider` function:

```tsx
import { FlatProviders, makeProvider } from 'react-flat-providers';

    <FlatProviders
      providers={[
        makeProvider(ProviderWithProps, { providerProps: 'typeSafe'}),
      ]}
    >
```

### Example

A full working example can be found following the link below:

[https://stackblitz.com/edit/react-flat-providers-example](https://stackblitz.com/edit/react-flat-providers-example?file=src/index.tsx)

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
 * Please check https://stackblitz.com/edit/react-flat-providers-example?file=src/index.tsx
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
    [StringContext.Provider, { value: 'Hello world!' }],
  ]}
>
  <App />
</FlatProviders>
```

### To enforce type safety, we encourage usage of the next helpers

```ts
<FlatProviders
  providers={[
    // import `makeProvider` to infer props type from frovider
    makeProvider(BooleanProvider, { initialValue: true }),
  ]}
>
  <App />
</FlatProviders>
```

```ts
// to have only one import and lower level of indentation
// this hook can be used to build flat chained version
const FlatChainedProviders = useChainProviders()
  .add(NumberProvider)
  .add(BooleanProvider, { initialValue: true })
  .make();

<FlatChainedProviders>
  <App />
</FlatChainedProviders>
```

## License

MIT © [sincovschi](https://github.com/sincovschi)
