'use client';

import Header from '@/components/Header';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { toast } from 'sonner';
import { UploadClient } from '@uploadcare/upload-client';
import {
  TYPE_SIZE,
  LENGTH_SIZE,
  getMintLen,
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from '@solana/spl-token';
import { pack, createInitializeInstruction } from '@solana/spl-token-metadata';

export default function Page() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [tokenDecimals, setTokenDecimals] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const wallet = useWallet();
  const { connection } = useConnection();

  const client = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY!,
  });

  const createAndUploadMetadata = async (
    name: string,
    symbol: string,
    description: string,
    imageUrl: string
  ) => {
    const metadata = JSON.stringify({
      name,
      symbol,
      description,
      image: imageUrl,
    });

    const metadataFile = new File([metadata], 'metadata.json', {
      type: 'application/json',
    });

    try {
      const res = client.uploadFile(metadataFile);
      console.log('Metadata uploaded to:', res);
      return (await res).cdnUrl;
    } catch (e) {
      console.error('Failed to upload metadata:', e);
      throw e;
    }
  };

  async function createToken(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!wallet.publicKey) {
        toast.error('Wallet not connected');
        return;
      }

      const mint = Keypair.generate();
      const decimals = tokenDecimals;
      const metaDataUrl = await createAndUploadMetadata(
        tokenName,
        tokenSymbol,
        '',
        imageLink
      );

      if (!metaDataUrl) {
        toast.error('Failed to upload metadata');
        return;
      }

      const metadata = {
        mint: mint.publicKey,
        name: tokenName,
        symbol: tokenSymbol,
        uri: metaDataUrl,
        additionalMetadata: [],
      };

      const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
      const metadataLength = pack(metadata).length;
      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataExtension + metadataLength
      );
      const createAccountInstructions = SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mint.publicKey,
        lamports,
        space: mintLen,
        programId: TOKEN_2022_PROGRAM_ID,
      });

      const initializeMetadataPointerInstruction =
        createInitializeMetadataPointerInstruction(
          mint.publicKey,
          wallet.publicKey,
          mint.publicKey,
          TOKEN_2022_PROGRAM_ID
        );
      const initializeMintInstruction = createInitializeMintInstruction(
        mint.publicKey,
        Number(decimals),
        wallet.publicKey,
        null,
        TOKEN_2022_PROGRAM_ID
      );
      const initializeMetadataInstruction = createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        metadata: mint.publicKey,
        updateAuthority: wallet.publicKey,
        mint: mint.publicKey,
        mintAuthority: wallet.publicKey,
        name: tokenName,
        symbol: tokenSymbol,
        uri: metaDataUrl,
      });

      const transaction = new Transaction().add(
        createAccountInstructions,
        initializeMetadataPointerInstruction,
        initializeMintInstruction,
        initializeMetadataInstruction
      );

      // Create associated token account for the user
      const associatedTokenAddress = await getAssociatedTokenAddress(
        mint.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      const createAssociatedTokenAccountIx =
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedTokenAddress,
          wallet.publicKey,
          mint.publicKey,
          TOKEN_2022_PROGRAM_ID
        );

      transaction.add(createAssociatedTokenAccountIx);

      // Mint tokens to the user's associated token account
      const mintAmountBigInt = BigInt(
        parseFloat(mintAmount) * Math.pow(10, Number(decimals))
      );
      const mintToIx = createMintToInstruction(
        mint.publicKey,
        associatedTokenAddress,
        wallet.publicKey,
        mintAmountBigInt,
        [],
        TOKEN_2022_PROGRAM_ID
      );

      transaction.add(mintToIx);

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;

      transaction.partialSign(mint);

      await wallet.sendTransaction(transaction, connection);

      console.log('Token created and minted successfully');
      console.log(mint.publicKey.toBase58());
      setIsLoading(false);
      toast.success('Token created and minted successfully!');

      // router.push(`/token-details/${mint.publicKey.toBase58()}`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(`Failed to create token: ${e.message}`);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create your own Solana Token
        </motion.h1>

        <motion.div
          className="max-w-md mx-auto bg-[#1E293B]/50 backdrop-blur-xl rounded-xl overflow-hidden border border-[#3730A3]/20 shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {wallet.connected ? (
            <form onSubmit={createToken}>
              <div className="mb-6">
                <label
                  htmlFor="tokenName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Token Name
                </label>
                <input
                  type="text"
                  id="tokenName"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#3730A3]/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="tokenSymbol"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Token Symbol
                </label>
                <input
                  type="text"
                  id="tokenSymbol"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#3730A3]/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="imageLink"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageLink"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#3730A3]/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="tokenDecimals"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Token Decimals
                </label>
                <input
                  type="text"
                  id="tokenDecimals"
                  value={tokenDecimals}
                  onChange={(e) => setTokenDecimals(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#3730A3]/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="mintAmount"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Mint Amount
                </label>
                <input
                  type="text"
                  id="mintAmount"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#3730A3]/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-out"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    Sending the transaction...
                  </div>
                ) : (
                  'Create and Mint Token'
                )}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-300 mb-6">
                Connect your wallet to create a token
              </p>
              <WalletMultiButton className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
