import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC3156FlashBorrower, IERC3156FlashBorrowerInterface } from "../IERC3156FlashBorrower";
export declare class IERC3156FlashBorrower__factory {
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
    static createInterface(): IERC3156FlashBorrowerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC3156FlashBorrower;
}
