import { ethers, Overrides } from "ethers";
import { createWrappedOnAlgorand, createWrappedOnSolana, createWrappedOnTerra } from ".";
export declare function updateWrappedOnEth(tokenBridgeAddress: string, signer: ethers.Signer, signedVAA: Uint8Array, overrides?: Overrides & {
    from?: string | Promise<string>;
}): Promise<ethers.ContractReceipt>;
export declare const updateWrappedOnTerra: typeof createWrappedOnTerra;
export declare const updateWrappedOnSolana: typeof createWrappedOnSolana;
export declare const updateWrappedOnAlgorand: typeof createWrappedOnAlgorand;
