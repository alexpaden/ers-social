import React, { createContext, useContext, useState, ReactNode } from 'react';

export const AddressContext = createContext<{
  address: string | null;
  setAddress: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  address: null,
  setAddress: () => {}, // Initialize with a no-op function
});


export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};


interface AddressProviderProps {
  children: ReactNode;
}

export const AddressProvider: React.FC<AddressProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
