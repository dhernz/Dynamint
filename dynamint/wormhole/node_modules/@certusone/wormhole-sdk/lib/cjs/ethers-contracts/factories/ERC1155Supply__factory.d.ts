import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ERC1155Supply, ERC1155SupplyInterface } from "../ERC1155Supply";
export declare class ERC1155Supply__factory {
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
    static createInterface(): ERC1155SupplyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC1155Supply;
}
