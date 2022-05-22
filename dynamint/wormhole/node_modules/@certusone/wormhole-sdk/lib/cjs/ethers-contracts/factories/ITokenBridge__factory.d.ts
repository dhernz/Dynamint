import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITokenBridge, ITokenBridgeInterface } from "../ITokenBridge";
export declare class ITokenBridge__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): ITokenBridgeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ITokenBridge;
}
