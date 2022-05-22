import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ERC20Capped, ERC20CappedInterface } from "../ERC20Capped";
export declare class ERC20Capped__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
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
        anonymous?: undefined;
    })[];
    static createInterface(): ERC20CappedInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20Capped;
}
