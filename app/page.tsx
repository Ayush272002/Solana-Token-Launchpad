'use client';
import Feature from '@/components/Feature';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TokenCard from '@/components/TokenCard';
import { cardVariants, containerVariants } from '@/lib/styles';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <motion.main
        className="container mx-auto px-4 py-10 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-6xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Solana Token Launchpad
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={containerVariants}
        >
          <motion.div variants={cardVariants}>
            <TokenCard
              title="Create Token"
              description="Launch your own Solana token with ease. Customize and deploy in minutes."
              buttonText="Get Started"
              icon="🚀"
              href="/create-token"
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <TokenCard
              title="My Tokens"
              description="Manage and monitor your launched tokens. Track performance and make updates."
              buttonText="View My Tokens"
              icon="💼"
              href="/view-tokens"
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <TokenCard
              title="Token List"
              description="Explore a diverse range of Solana tokens. Discover new projects and opportunities."
              buttonText="View Tokens"
              icon="📊"
              href="/my-tokens"
            />
          </motion.div>
        </motion.div>
        <motion.div>
          <Feature />
        </motion.div>
      </motion.main>
      <Footer />
    </>
  );
}
