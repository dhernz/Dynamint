import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ICompoundTimelock, ICompoundTimelockInterface } from "../ICompoundTimelock";
export declare class ICompoundTimelock__factory {
    static readonly abi: ({
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
    } | {
        stateMutability: string;
        type: string;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    })[];
    static createInterface(): ICompoundTimelockInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ICompoundTimelock;
}
