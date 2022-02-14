import { render, screen } from '@testing-library/react';
import React, { PropsWithChildren, ReactElement, useContext } from 'react';
import { FlatProviders, useChainProviders, makeProvider } from './';

type TestContextValue = 'defaultValue' | 'expectedValue';
const TestContext = React.createContext<TestContextValue>('defaultValue');
const ContextConsumer = (): ReactElement => {
  const testValue = useContext(TestContext);
  return <h1>{testValue}</h1>;
};

type AdvancedContextValue = {
  contextKey: 'defaultAdvanced' | 'expectedAdvanced';
};
const AdvancedTestContext = React.createContext<AdvancedContextValue>({
  contextKey: 'defaultAdvanced',
});
const AdvancedConsumer = (): ReactElement => {
  const { contextKey } = useContext(AdvancedTestContext);
  return <h1>{contextKey}</h1>;
};

describe('react-flat-providers', (): void => {
  it('wraps a given provider with given props correctly around the consuming child-component.', async (): Promise<void> => {
    render(
      <FlatProviders
        providers={[[TestContext.Provider, { value: 'expectedValue ' }]]}
      >
        <ContextConsumer />
      </FlatProviders>,
    );

    expect(screen.getByText('expectedValue')).toBeTruthy();
  });

  it('wraps multiple providers correctly around the consuming children.', async (): Promise<void> => {
    render(
      <FlatProviders
        providers={[
          [TestContext.Provider, { value: 'expectedValue' }],
          [
            AdvancedTestContext.Provider,
            { value: { contextKey: 'expectedAdvanced' } },
          ],
        ]}
      >
        <ContextConsumer />
        <AdvancedConsumer />
      </FlatProviders>,
    );

    expect(screen.getByText('expectedValue')).toBeTruthy();
    expect(screen.getByText('expectedAdvanced')).toBeTruthy();
  });

  it('renders providers built with function.', async (): Promise<void> => {
    render(
      <FlatProviders
        providers={[
          makeProvider(TestContext.Provider, { value: 'expectedValue' }),
          makeProvider(AdvancedTestContext.Provider, {
            value: { contextKey: 'expectedAdvanced' },
          }),
        ]}
      >
        <ContextConsumer />
        <AdvancedConsumer />
      </FlatProviders>,
    );

    expect(screen.getByText('expectedValue')).toBeTruthy();
    expect(screen.getByText('expectedAdvanced')).toBeTruthy();
  });

  it('allows to pass a Provider without props.', async (): Promise<void> => {
    function ProviderComponent({
      children,
    }: PropsWithChildren<unknown>): JSX.Element {
      return (
        <TestContext.Provider value='expectedValue'>
          {children}
        </TestContext.Provider>
      );
    }

    render(
      <FlatProviders providers={[ProviderComponent]}>
        <ContextConsumer />
      </FlatProviders>,
    );

    expect(screen.getByText('expectedValue')).toBeTruthy();
  });

  it('allows passing simple components as well and renders those.', async (): Promise<void> => {
    render(
      <FlatProviders
        providers={[(): ReactElement => <h1 data-testid='first'>Rendered</h1>]}
      />,
    );

    expect(screen.getByTestId('first')).toBeTruthy();
  });

  it('chain providers and renders context value.', async (): Promise<void> => {
    const FlatChainProviders = useChainProviders()
      .add(TestContext.Provider, { value: 'expectedValue' })
      .add(AdvancedTestContext.Provider, {
        value: { contextKey: 'expectedAdvanced' },
      })
      .make();

    render(
      <FlatChainProviders>
        <ContextConsumer />
        <AdvancedConsumer />
      </FlatChainProviders>,
    );

    expect(screen.getByText('expectedValue')).toBeTruthy();
    expect(screen.getByText('expectedAdvanced')).toBeTruthy();
  });
});
