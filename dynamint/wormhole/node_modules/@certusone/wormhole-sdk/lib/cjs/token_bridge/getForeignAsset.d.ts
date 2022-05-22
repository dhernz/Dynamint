import { Connection } from "@solana/web3.js";
import { LCDClient } from "@terra-money/terra.js";
import { Algodv2 } from "algosdk";
import { ethers } from "ethers";
import { ChainId, ChainName } from "../utils";
/**
 * Returns a foreign asset address on Ethereum for a provided native chain and asset address, AddressZero if it does not exist
 * @param tokenBridgeAddress
 * @param provider
 * @param originChain
 * @param originAsset zero pad to 32 bytes
 * @returns
 */
export declare function getForeignAssetEth(tokenBridgeAddress: string, provider: ethers.Signer | ethers.providers.Provider, originChain: ChainId | ChainName, originAsset: Uint8Array): Promise<string | null>;
export declare function getForeignAssetTerra(tokenBridgeAddress: string, client: LCDClient, originChain: ChainId | ChainName, originAsset: Uint8Array): Promise<string | null>;
/**
 * Returns a foreign asset address on Solana for a provided native chain and asset address
 * @param connection
 * @param tokenBridgeAddress
 * @param originChain
 * @param originAsset zero pad to 32 bytes
 * @returns
 */
export declare function getForeignAssetSolana(connection: Connection, tokenBridgeAddress: string, originChain: ChainId | ChainName, originAsset: Uint8Array): Promise<string | null>;
export declare function getForeignAssetAlgorand(client: Algodv2, tokenBridgeId: bigint, chain: ChainId | ChainName, contract: string): Promise<bigint | null>;
