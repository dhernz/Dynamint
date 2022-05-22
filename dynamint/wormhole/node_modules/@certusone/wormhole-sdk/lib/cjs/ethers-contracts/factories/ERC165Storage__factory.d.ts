import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ERC165Storage, ERC165StorageInterface } from "../ERC165Storage";
export declare class ERC165Storage__factory {
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
    static createInterface(): ERC165StorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC165Storage;
}
