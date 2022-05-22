import { Connection, Transaction } from "@solana/web3.js";
export declare function sendAndConfirmTransactionsWithRetry(connection: Connection, signTransaction: (transaction: Transaction) => Promise<Transaction>, payer: string, unsignedTransactions: Transaction[], maxRetries?: number): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SignatureResult>[]>;
