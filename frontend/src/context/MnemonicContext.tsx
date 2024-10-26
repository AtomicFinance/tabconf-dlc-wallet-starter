import React, { createContext, useContext, useState, ReactNode } from "react";

interface MnemonicContextType {
  mnemonics: { oracle: string; alice: string; bob: string } | null;
  setMnemonics: React.Dispatch<React.SetStateAction<{ oracle: string; alice: string; bob: string } | null>>;
}

const MnemonicContext = createContext<MnemonicContextType | undefined>(undefined);

export const MnemonicProvider = ({ children }: { children: ReactNode }) => {
  const [mnemonics, setMnemonics] = useState<{ oracle: string; alice: string; bob: string } | null>(null);

  return <MnemonicContext.Provider value={{ mnemonics, setMnemonics }}>{children}</MnemonicContext.Provider>;
};

export const useMnemonic = () => {
  const context = useContext(MnemonicContext);
  if (!context) {
    throw new Error("useMnemonic must be used within a MnemonicProvider");
  }
  return context;
};
