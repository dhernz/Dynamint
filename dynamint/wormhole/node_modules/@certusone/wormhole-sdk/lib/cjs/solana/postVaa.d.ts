/// <reference types="node" />
import { Connection, Keypair, Transaction, TransactionInstruction } from "@solana/web3.js";
export declare function postVaaWithRetry(connection: Connection, signTransaction: (transaction: Transaction) => Promise<Transaction>, bridge_id: string, payer: string, vaa: Buffer, maxRetries: number): Promise<void>;
export declare function createVerifySignaturesInstructions(connection: Connection, bridge_id: string, payer: string, vaa: Buffer, signature_set: Keypair): Promise<TransactionInstruction[]>;
export declare function createPostVaaInstruction(bridge_id: string, payer: string, vaa: Buffer, signatureSetKeypair: Keypair): Promise<TransactionInstruction>;
export declare function postVaa(connection: Connection, signTransaction: (transaction: Transaction) => Promise<Transaction>, bridge_id: string, payer: string, vaa: Buffer): Promise<void>;
