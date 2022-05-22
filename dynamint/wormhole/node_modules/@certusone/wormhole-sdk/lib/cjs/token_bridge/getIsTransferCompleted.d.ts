import { Connection } from "@solana/web3.js";
import { LCDClient } from "@terra-money/terra.js";
import { Algodv2 } from "algosdk";
import { ethers } from "ethers";
export declare function getIsTransferCompletedEth(tokenBridgeAddress: string, provider: ethers.Signer | ethers.providers.Provider, signedVAA: Uint8Array): Promise<boolean>;
export declare function getIsTransferCompletedTerra(tokenBridgeAddress: string, signedVAA: Uint8Array, client: LCDClient, gasPriceUrl: string): Promise<boolean>;
export declare function getIsTransferCompletedSolana(tokenBridgeAddress: string, signedVAA: Uint8Array, connection: Connection): Promise<boolean>;
/**
 * <p>Returns true if this transfer was completed on Algorand</p>
 * @param client AlgodV2 client
 * @param appId Most likely the Token bridge ID
 * @param signedVAA VAA to check
 * @param wallet The account paying the bill for this (it isn't free)
 * @returns true if VAA has been redeemed, false otherwise
 */
export declare function getIsTransferCompletedAlgorand(client: Algodv2, appId: bigint, signedVAA: Uint8Array): Promise<boolean>;
