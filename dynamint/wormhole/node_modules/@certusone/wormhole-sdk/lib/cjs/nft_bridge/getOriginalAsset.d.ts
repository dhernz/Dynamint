import { Connection } from "@solana/web3.js";
import { LCDClient } from "@terra-money/terra.js";
import { ethers } from "ethers";
import { WormholeWrappedInfo } from "..";
import { ChainId, ChainName } from "../utils";
export interface WormholeWrappedNFTInfo {
    isWrapped: boolean;
    chainId: ChainId;
    assetAddress: Uint8Array;
    tokenId?: string;
}
/**
 * Returns a origin chain and asset address on {originChain} for a provided Wormhole wrapped address
 * @param tokenBridgeAddress
 * @param provider
 * @param wrappedAddress
 * @returns
 */
export declare function getOriginalAssetEth(tokenBridgeAddress: string, provider: ethers.Signer | ethers.providers.Provider, wrappedAddress: string, tokenId: string, lookupChain: ChainId | ChainName): Promise<WormholeWrappedNFTInfo>;
/**
 * Returns a origin chain and asset address on {originChain} for a provided Wormhole wrapped address
 * @param connection
 * @param tokenBridgeAddress
 * @param mintAddress
 * @returns
 */
export declare function getOriginalAssetSol(connection: Connection, tokenBridgeAddress: string, mintAddress: string): Promise<WormholeWrappedNFTInfo>;
export declare function getOriginalAssetTerra(client: LCDClient, wrappedAddress: string): Promise<WormholeWrappedInfo>;
