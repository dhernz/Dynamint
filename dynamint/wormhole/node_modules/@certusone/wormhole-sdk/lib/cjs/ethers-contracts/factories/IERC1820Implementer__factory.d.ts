import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC1820Implementer, IERC1820ImplementerInterface } from "../IERC1820Implementer";
export declare class IERC1820Implementer__factory {
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
    static createInterface(): IERC1820ImplementerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC1820Implementer;
}
