import { Connection, Transaction } from "@solana/web3.js";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { ethers, Overrides } from "ethers";
import { ChainId, ChainName } from "../utils";
export declare function transferFromEth(tokenBridgeAddress: string, signer: ethers.Signer, tokenAddress: string, tokenID: ethers.BigNumberish, recipientChain: ChainId | ChainName, recipientAddress: Uint8Array, overrides?: Overrides & {
    from?: string | Promise<string>;
}): Promise<ethers.ContractReceipt>;
export declare function transferFromSolana(connection: Connection, bridgeAddress: string, tokenBridgeAddress: string, payerAddress: string, fromAddress: string, mintAddress: string, targetAddress: Uint8Array, targetChain: ChainId | ChainName, originAddress?: Uint8Array, originChain?: ChainId | ChainName, originTokenId?: Uint8Array): Promise<Transaction>;
export declare function transferFromTerra(walletAddress: string, tokenBridgeAddress: string, tokenAddress: string, tokenID: string, recipientChain: ChainId | ChainName, recipientAddress: Uint8Array): Promise<MsgExecuteContract[]>;
