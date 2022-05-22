import { Connection, Transaction } from "@solana/web3.js";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { Algodv2 } from "algosdk";
import { ethers, Overrides } from "ethers";
import { TransactionSignerPair } from "../algorand";
export declare function createWrappedOnEth(tokenBridgeAddress: string, signer: ethers.Signer, signedVAA: Uint8Array, overrides?: Overrides & {
    from?: string | Promise<string>;
}): Promise<ethers.ContractReceipt>;
export declare function createWrappedOnTerra(tokenBridgeAddress: string, walletAddress: string, signedVAA: Uint8Array): Promise<MsgExecuteContract>;
export declare function createWrappedOnSolana(connection: Connection, bridgeAddress: string, tokenBridgeAddress: string, payerAddress: string, signedVAA: Uint8Array): Promise<Transaction>;
export declare function createWrappedOnAlgorand(client: Algodv2, tokenBridgeId: bigint, bridgeId: bigint, senderAddr: string, attestVAA: Uint8Array): Promise<TransactionSignerPair[]>;
