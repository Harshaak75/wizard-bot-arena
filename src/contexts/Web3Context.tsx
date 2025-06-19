import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import contractABI from '../contracts/WizardBet.json';
import contractAddress from '../contracts/contract-address.json';

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      console.log('Attempting to connect wallet...');
      
      // For demo purposes, we'll simulate a connection since Web3Modal requires actual setup
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        
        const contract = new ethers.Contract(contractAddress.address, contractABI, signer);
        
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setAddress(address);
        setChainId(network.chainId);
        setIsConnected(true);
        
        console.log('Wallet connected:', address);
      } else {
        // Simulate connection for demo
        const mockAddress = '0x1234567890123456789012345678901234567890';
        setAddress(mockAddress);
        setChainId(11155111);
        setIsConnected(true);
        console.log('Demo mode: Simulated wallet connection');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setAddress(null);
    setChainId(null);
    setIsConnected(false);
    console.log('Wallet disconnected');
  };

  const value: Web3ContextType = {
    provider,
    signer,
    contract,
    address,
    chainId,
    isConnected,
    connectWallet,
    disconnectWallet
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
