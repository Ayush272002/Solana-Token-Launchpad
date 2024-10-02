'use client';

import React from 'react';
import WalletButtons from './WalletButtons';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  return (
    <header className=" p-6 flex justify-between items-center z-10 bg-[#1E293B]/50 backdrop-blur-xl border-b border-[#3730A3]/20">
      <div
        className="flex items-center space-x-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer"
        onClick={() => router.push('/')}
      >
        Solana Token Launchpad
      </div>
      <WalletButtons />
    </header>
  );
};

export default Header;
