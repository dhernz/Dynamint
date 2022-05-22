import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ERC20FlashMint, ERC20FlashMintInterface } from "../ERC20FlashMint";
export declare class ERC20FlashMint__factory {
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
    static createInterface(): ERC20FlashMintInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20FlashMint;
}
