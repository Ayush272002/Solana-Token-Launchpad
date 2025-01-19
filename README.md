# Solana Token Launchpad

Welcome to the Solana Token Launchpad! This project provides a decentralized platform for creating and minting custom tokens on the Solana blockchain. It simplifies the token creation process with a user-friendly interface and robust blockchain integration.

## Features

- **Token Creation**: Define your token's name, symbol, supply, and metadata, including images.
- **Wallet Integration**: Securely connect and transact using the Solana Wallet Adapter.
- **Custom Minting**: Mint tokens directly into your wallet with just a few clicks.
- **On-Chain Management**: Built on Solana's Token Program for efficient token creation and metadata handling.

## Tech Stack

- **Frontend**: Next.js, TailwindCSS
- **Blockchain**: Solana (Token Program)
- **Wallet Integration**: Solana Wallet Adapter

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ayush272002/Solana-Token-Launchpad.git
   cd Solana-Token-Launchpad
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Duplicate the `.env.example` file and rename it to `.env`.
   - Update the environment variables in `.env` as needed.

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Connect your wallet**: Use the Solana Wallet Adapter to connect your wallet securely.
2. **Create a new token**: Provide the necessary details such as token name, symbol, total supply, and metadata.
3. **Mint tokens**: Mint the specified amount of tokens directly into your connected wallet.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
