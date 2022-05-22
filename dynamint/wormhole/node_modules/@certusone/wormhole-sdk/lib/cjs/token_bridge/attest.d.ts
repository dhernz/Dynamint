import { Connection, Transaction } from "@solana/web3.js";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { Algodv2 } from "algosdk";
import { ethers, PayableOverrides } from "ethers";
import { TransactionSignerPair } from "../algorand";
export declare function attestFromEth(tokenBridgeAddress: string, signer: ethers.Signer, tokenAddress: string, overrides?: PayableOverrides & {
    from?: string | Promise<string>;
}): Promise<ethers.ContractReceipt>;
export declare function attestFromTerra(tokenBridgeAddress: string, walletAddress: string, asset: string): Promise<MsgExecuteContract>;
export declare function attestFromSolana(connection: Connection, bridgeAddress: string, tokenBridgeAddress: string, payerAddress: string, mintAddress: string): Promise<Transaction>;
/**
 * Attest an already created asset
 * If you create a new asset on algorand and want to transfer it elsewhere,
 * you create an attestation for it on algorand... pass that vaa to the target chain..
 * submit it.. then you can transfer from algorand to that target chain
 * @param client An Algodv2 client
 * @param tokenBridgeId The ID of the token bridge
 * @param senderAcct The account paying fees
 * @param assetId The asset index
 * @returns Transaction ID
 */
export declare function attestFromAlgorand(client: Algodv2, tokenBridgeId: bigint, bridgeId: bigint, senderAddr: string, assetId: bigint): Promise<TransactionSignerPair[]>;
