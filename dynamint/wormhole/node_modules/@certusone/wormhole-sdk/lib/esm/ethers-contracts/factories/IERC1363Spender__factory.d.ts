import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC1363Spender, IERC1363SpenderInterface } from "../IERC1363Spender";
export declare class IERC1363Spender__factory {
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
    static createInterface(): IERC1363SpenderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC1363Spender;
}
