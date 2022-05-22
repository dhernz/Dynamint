import { ethers } from "ethers";
import { Connection } from "@solana/web3.js";
import { LCDClient } from "@terra-money/terra.js";
export declare function getIsTransferCompletedEth(nftBridgeAddress: string, provider: ethers.Signer | ethers.providers.Provider, signedVAA: Uint8Array): Promise<boolean>;
export declare function getIsTransferCompletedTerra(nftBridgeAddress: string, signedVAA: Uint8Array, client: LCDClient, gasPriceUrl: string): Promise<any>;
export declare function getIsTransferCompletedSolana(nftBridgeAddress: string, signedVAA: Uint8Array, connection: Connection): Promise<boolean>;
