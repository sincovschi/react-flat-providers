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

If you are using `TypeScript` and you want type-safety for your Providers' props, you can use the provided `makeProvider` function or `useChainProviders` hook:

```tsx
import { FlatProviders, makeProvider } from 'react-flat-providers';

<FlatProviders
  providers={[
    makeProvider(ProviderWithProps, { providerProps: 'typeSafe'}),
  ]}
>
```

```tsx
import { useChainProviders } from 'react-flat-providers';

const FlatChainedProviders = useChainProviders()
  .add(NumberProvider)
  .add(BooleanProvider, { initialValue: true })
  .make();

<FlatChainedProviders>
  <App />
</FlatChainedProviders>
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


## License

MIT © [sincovschi](https://github.com/sincovschi)
