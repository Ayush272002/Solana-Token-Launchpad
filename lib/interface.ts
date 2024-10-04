export interface Token {
  name: string;
  symbol: string;
  address: string;
  image?: string;
}

export interface TokenDetails {
  name: string;
  symbol: string;
  address: string;
  image?: string;
  totalSupply: number;
  decimals: number;
  uri?: string;
  mintAuthority?: string;
  freezeAuthority?: string;
  supply: number;
  isInitialized: boolean;
  fixedSupply: boolean;
}

export interface TokenHolding {
  address: string;
  balance: number;
  decimals: number;
  name: string;
  symbol: string;
  icon: string;
}

export interface TokenNode {
  address: string;
  amount: string;
  decimals: number;
  displayAmount: string;
  token: string;
  tokenListEntry: TokenListEntry | null;
}

interface TokenListEntry {
  address: string;
  decimals: number;
  logo: string;
  name: string;
  symbol: string;
}
