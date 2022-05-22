import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC1363Receiver, IERC1363ReceiverInterface } from "../IERC1363Receiver";
export declare class IERC1363Receiver__factory {
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
    static createInterface(): IERC1363ReceiverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC1363Receiver;
}
