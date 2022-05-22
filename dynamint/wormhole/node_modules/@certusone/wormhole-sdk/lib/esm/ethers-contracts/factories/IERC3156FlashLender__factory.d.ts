import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC3156FlashLender, IERC3156FlashLenderInterface } from "../IERC3156FlashLender";
export declare class IERC3156FlashLender__factory {
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
    static createInterface(): IERC3156FlashLenderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC3156FlashLender;
}
