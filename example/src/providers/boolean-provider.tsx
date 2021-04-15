import React from "react";

const BooleanContext = React.createContext<boolean>(false);

export function BooleanProvider({
    initialValue,
    children,
}: React.PropsWithChildren<{ initialValue: true }>) {
    return (
        <BooleanContext.Provider value={initialValue}>
            {children}
        </BooleanContext.Provider>
    );
}

export function useBoolean() {
    const context = React.useContext(BooleanContext);
    if (context !== undefined) return context;
    throw new Error("useBoolean must be used within a BooleanProvider");
}
