
'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// --- MOCK DATA AND TYPES ---

type WalletType = 'NGO' | 'Community' | 'Buyer / Investor' | 'Admin (NCCR)';

interface Wallet {
  address: string;
  type: WalletType;
}

interface Transaction {
    id: number;
    timestamp: number;
    description: string;
}

interface Web3ContextType {
  wallet: Wallet | null;
  loading: boolean;
  balances: Record<string, number>;
  totalSupply: number;
  transactionHistory: Transaction[];
  wallets: Wallet[];
  connectWallet: (type: string) => void;
  disconnectWallet: () => void;
  mintTokens: (amount: number) => void;
  transferTokens: (from: string, to: string, amount: number) => boolean;
}

// --- MOCK WALLETS ---

const mockWallets: Record<string, Wallet> = {
  ngo: { address: '0xNGO...a1b2', type: 'NGO' },
  community: { address: '0xCOM...c3d4', type: 'Community' },
  buyer: { address: '0xBUY...e5f6', type: 'Buyer / Investor' },
  admin: { address: '0xADM...g7h8', type: 'Admin (NCCR)' },
};

const allWallets = Object.values(mockWallets);

// --- CONTEXT ---

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [balances, setBalances] = useState<Record<string, number>>({
      [mockWallets.ngo.address]: 5000,
      [mockWallets.buyer.address]: 10000,
      [mockWallets.community.address]: 0,
      [mockWallets.admin.address]: 0,
  });
  const [totalSupply, setTotalSupply] = useState(15000);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);

  // --- SESSION MANAGEMENT ---

  useEffect(() => {
    try {
      const storedWalletType = sessionStorage.getItem('walletType');
      if (storedWalletType && mockWallets[storedWalletType]) {
        setWallet(mockWallets[storedWalletType]);
      }
    } catch (error) {
        console.error("Could not access session storage:", error);
    }
    setLoading(false);
  }, []);

  const connectWallet = (type: string) => {
    if (mockWallets[type]) {
      const newWallet = mockWallets[type];
      setWallet(newWallet);
      try {
        sessionStorage.setItem('walletType', type);
        addTransaction(`${newWallet.type} wallet connected.`);
      } catch (error) {
         console.error("Could not access session storage:", error);
      }
    }
  };

  const disconnectWallet = () => {
    try {
        sessionStorage.removeItem('walletType');
    } catch (error) {
        console.error("Could not access session storage:", error);
    }
    setWallet(null);
  };

  // --- MOCK BLOCKCHAIN FUNCTIONS ---

  const addTransaction = (description: string) => {
    setTransactionHistory(prev => [{ id: Date.now(), timestamp: Date.now(), description }, ...prev]);
  };

  const mintTokens = useCallback((amount: number) => {
    if (wallet?.type !== 'Admin (NCCR)') return;
    
    // Admin mints to their own address first
    const adminAddress = mockWallets.admin.address;
    setBalances(prev => ({
      ...prev,
      [adminAddress]: (prev[adminAddress] || 0) + amount,
    }));
    setTotalSupply(prev => prev + amount);
    addTransaction(`Admin minted ${amount.toLocaleString()} CARBO tokens.`);
  }, [wallet]);

  const transferTokens = useCallback((from: string, to: string, amount: number) => {
    const fromBalance = balances[from] || 0;
    if (fromBalance < amount) {
      console.error("Transfer failed: Insufficient funds.");
      addTransaction(`Transfer FAILED: Insufficient funds for ${from}.`);
      return false;
    }

    setBalances(prev => ({
      ...prev,
      [from]: prev[from] - amount,
      [to]: (prev[to] || 0) + amount,
    }));

    const fromType = allWallets.find(w => w.address === from)?.type || 'Unknown';
    const toType = allWallets.find(w => w.address === to)?.type || 'Unknown';
    addTransaction(`${fromType} transferred ${amount.toLocaleString()} CARBO to ${toType}.`);
    return true;

  }, [balances]);


  const value: Web3ContextType = {
    wallet,
    loading,
    balances,
    totalSupply,
    transactionHistory,
    wallets: allWallets,
    connectWallet,
    disconnectWallet,
    mintTokens,
    transferTokens,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

// --- HOOK ---

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
