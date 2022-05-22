import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ERC20Wrapper, ERC20WrapperInterface } from "../ERC20Wrapper";
export declare class ERC20Wrapper__factory {
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
    static createInterface(): ERC20WrapperInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20Wrapper;
}
