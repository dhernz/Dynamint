import { Connection } from "@solana/web3.js";
import { LCDClient } from "@terra-money/terra.js";
import { Algodv2 } from "algosdk";
import { ethers } from "ethers";
/**
 * Returns whether or not an asset address on Ethereum is a wormhole wrapped asset
 * @param tokenBridgeAddress
 * @param provider
 * @param assetAddress
 * @returns
 */
export declare function getIsWrappedAssetEth(tokenBridgeAddress: string, provider: ethers.Signer | ethers.providers.Provider, assetAddress: string): Promise<boolean>;
export declare function getIsWrappedAssetTerra(tokenBridgeAddress: string, client: LCDClient, assetAddress: string): Promise<boolean>;
/**
 * Returns whether or not an asset on Solana is a wormhole wrapped asset
 * @param connection
 * @param tokenBridgeAddress
 * @param mintAddress
 * @returns
 */
export declare function getIsWrappedAssetSol(connection: Connection, tokenBridgeAddress: string, mintAddress: string): Promise<boolean>;
/**
 * Returns whethor or not an asset on Algorand is a wormhole wrapped asset
 * @param client Algodv2 client
 * @param tokenBridgeId token bridge ID
 * @param assetId Algorand asset index
 * @returns true if the asset is wrapped
 */
export declare function getIsWrappedAssetAlgorand(client: Algodv2, tokenBridgeId: bigint, assetId: bigint): Promise<boolean>;
