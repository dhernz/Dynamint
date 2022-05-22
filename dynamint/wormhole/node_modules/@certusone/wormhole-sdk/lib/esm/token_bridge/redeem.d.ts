import { Connection, Transaction } from "@solana/web3.js";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { Algodv2 } from "algosdk";
import { ethers, Overrides } from "ethers";
import { TransactionSignerPair } from "../algorand";
export declare function redeemOnEth(tokenBridgeAddress: string, signer: ethers.Signer, signedVAA: Uint8Array, overrides?: Overrides & {
    from?: string | Promise<string>;
}): Promise<ethers.ContractReceipt>;
export declare function redeemOnEthNative(tokenBridgeAddress: string, signer: ethers.Signer, signedVAA: Uint8Array, overrides?: Overrides & {
    from?: string | Promise<string>;
}): Promise<ethers.ContractReceipt>;
export declare function redeemOnTerra(tokenBridgeAddress: string, walletAddress: string, signedVAA: Uint8Array): Promise<MsgExecuteContract>;
export declare function redeemAndUnwrapOnSolana(connection: Connection, bridgeAddress: string, tokenBridgeAddress: string, payerAddress: string, signedVAA: Uint8Array): Promise<Transaction>;
export declare function redeemOnSolana(connection: Connection, bridgeAddress: string, tokenBridgeAddress: string, payerAddress: string, signedVAA: Uint8Array, feeRecipientAddress?: string): Promise<Transaction>;
/**
 * This basically just submits the VAA to Algorand
 * @param client AlgodV2 client
 * @param tokenBridgeId Token bridge ID
 * @param bridgeId Core bridge ID
 * @param vaa The VAA to be redeemed
 * @param acct Sending account
 * @returns Transaction ID(s)
 */
export declare function redeemOnAlgorand(client: Algodv2, tokenBridgeId: bigint, bridgeId: bigint, vaa: Uint8Array, senderAddr: string): Promise<TransactionSignerPair[]>;
