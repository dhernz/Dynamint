import { Connection } from "@solana/web3.js";
import { LCDClient } from "@terra-money/terra.js";
import { Algodv2 } from "algosdk";
import { ethers } from "ethers";
import { ChainId, ChainName } from "../utils";
export interface WormholeWrappedInfo {
    isWrapped: boolean;
    chainId: ChainId;
    assetAddress: Uint8Array;
}
/**
 * Returns a origin chain and asset address on {originChain} for a provided Wormhole wrapped address
 * @param tokenBridgeAddress
 * @param provider
 * @param wrappedAddress
 * @returns
 */
export declare function getOriginalAssetEth(tokenBridgeAddress: string, provider: ethers.Signer | ethers.providers.Provider, wrappedAddress: string, lookupChain: ChainId | ChainName): Promise<WormholeWrappedInfo>;
export declare function getOriginalAssetTerra(client: LCDClient, wrappedAddress: string): Promise<WormholeWrappedInfo>;
/**
 * Returns a origin chain and asset address on {originChain} for a provided Wormhole wrapped address
 * @param connection
 * @param tokenBridgeAddress
 * @param mintAddress
 * @returns
 */
export declare function getOriginalAssetSol(connection: Connection, tokenBridgeAddress: string, mintAddress: string): Promise<WormholeWrappedInfo>;
/**
 * Returns an origin chain and asset address on {originChain} for a provided Wormhole wrapped address
 * @param client Algodv2 client
 * @param tokenBridgeId Application ID of the token bridge
 * @param assetId Algorand asset index
 * @returns wrapped wormhole information structure
 */
export declare function getOriginalAssetAlgorand(client: Algodv2, tokenBridgeId: bigint, assetId: bigint): Promise<WormholeWrappedInfo>;
