import { Connection, Transaction as SolanaTransaction } from "@solana/web3.js";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { Algodv2 } from "algosdk";
import { BigNumber, ethers, Overrides, PayableOverrides } from "ethers";
import { TransactionSignerPair } from "../algorand";
import { ChainId, ChainName } from "../utils";
export declare function getAllowanceEth(tokenBridgeAddress: string, tokenAddress: string, signer: ethers.Signer): Promise<BigNumber>;
export declare function approveEth(tokenBridgeAddress: string, tokenAddress: string, signer: ethers.Signer, amount: ethers.BigNumberish, overrides?: Overrides & {
    from?: string | Promise<string>;
}): Promise<ethers.ContractReceipt>;
export declare function transferFromEth(tokenBridgeAddress: string, signer: ethers.Signer, tokenAddress: string, amount: ethers.BigNumberish, recipientChain: ChainId | ChainName, recipientAddress: Uint8Array, relayerFee?: ethers.BigNumberish, overrides?: PayableOverrides & {
    from?: string | Promise<string>;
}): Promise<ethers.ContractReceipt>;
export declare function transferFromEthNative(tokenBridgeAddress: string, signer: ethers.Signer, amount: ethers.BigNumberish, recipientChain: ChainId | ChainId, recipientAddress: Uint8Array, relayerFee?: ethers.BigNumberish, overrides?: PayableOverrides & {
    from?: string | Promise<string>;
}): Promise<ethers.ContractReceipt>;
export declare function transferFromTerra(walletAddress: string, tokenBridgeAddress: string, tokenAddress: string, amount: string, recipientChain: ChainId | ChainName, recipientAddress: Uint8Array, relayerFee?: string): Promise<MsgExecuteContract[]>;
export declare function transferNativeSol(connection: Connection, bridgeAddress: string, tokenBridgeAddress: string, payerAddress: string, amount: BigInt, targetAddress: Uint8Array, targetChain: ChainId | ChainName, relayerFee?: BigInt): Promise<SolanaTransaction>;
export declare function transferFromSolana(connection: Connection, bridgeAddress: string, tokenBridgeAddress: string, payerAddress: string, fromAddress: string, mintAddress: string, amount: BigInt, targetAddress: Uint8Array, targetChain: ChainId | ChainName, originAddress?: Uint8Array, originChain?: ChainId | ChainName, fromOwnerAddress?: string, relayerFee?: BigInt): Promise<SolanaTransaction>;
/**
 * Transfers an asset from Algorand to a receiver on another chain
 * @param client AlgodV2 client
 * @param tokenBridgeId Application ID of the token bridge
 * @param bridgeId Application ID of the core bridge
 * @param sender Sending account
 * @param assetId Asset index
 * @param qty Quantity to transfer
 * @param receiver Receiving account
 * @param chain Reeiving chain
 * @param fee Transfer fee
 * @param payload payload for payload3 transfers
 * @returns Sequence number of confirmation
 */
export declare function transferFromAlgorand(client: Algodv2, tokenBridgeId: bigint, bridgeId: bigint, senderAddr: string, assetId: bigint, qty: bigint, receiver: string, chain: ChainId | ChainName, fee: bigint, payload?: Uint8Array | null): Promise<TransactionSignerPair[]>;
