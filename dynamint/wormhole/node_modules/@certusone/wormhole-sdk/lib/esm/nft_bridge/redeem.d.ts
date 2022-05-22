import { Connection, Transaction } from "@solana/web3.js";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { ethers, Overrides } from "ethers";
export declare function redeemOnEth(tokenBridgeAddress: string, signer: ethers.Signer, signedVAA: Uint8Array, overrides?: Overrides & {
    from?: string | Promise<string>;
}): Promise<ethers.ContractReceipt>;
export declare function isNFTVAASolanaNative(signedVAA: Uint8Array): Promise<boolean>;
export declare function redeemOnSolana(connection: Connection, bridgeAddress: string, tokenBridgeAddress: string, payerAddress: string, signedVAA: Uint8Array): Promise<Transaction>;
export declare function createMetaOnSolana(connection: Connection, bridgeAddress: string, tokenBridgeAddress: string, payerAddress: string, signedVAA: Uint8Array): Promise<Transaction>;
export declare function redeemOnTerra(tokenBridgeAddress: string, walletAddress: string, signedVAA: Uint8Array): Promise<MsgExecuteContract>;
