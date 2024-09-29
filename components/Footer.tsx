import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] py-6 text-center text-gray-400 border-t border-[#3730A3]/20">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Solana Token Launchpad. All rights
          reserved.
        </p>
        <p className="text-xs mt-2">
          Designed and Developed by{' '}
          <a
            className="font-bold text-sm transition-all ease-in-out hover:text-lg underline"
            href="https://github.com/Ayush272002"
            target="_blank"
          >
            Ayush
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
