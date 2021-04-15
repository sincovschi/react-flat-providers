import React from "react";

const NumberContext = React.createContext<number>(0);

export function NumberProvider({ children }: React.PropsWithChildren<unknown>) {
    return (
        <NumberContext.Provider value={1}>{children}</NumberContext.Provider>
    );
}

export function useNumber() {
    const context = React.useContext(NumberContext);
    if (context !== undefined) return context;
    throw new Error("useNumber must be used within a NumberProvider");
}
