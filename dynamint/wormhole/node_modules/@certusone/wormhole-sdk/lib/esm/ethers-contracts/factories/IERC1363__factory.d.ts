import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC1363, IERC1363Interface } from "../IERC1363";
export declare class IERC1363__factory {
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
    static createInterface(): IERC1363Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC1363;
}
