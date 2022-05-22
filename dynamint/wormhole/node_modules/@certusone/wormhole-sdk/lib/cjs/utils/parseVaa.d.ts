/// <reference types="node" />
import { BigNumber } from "@ethersproject/bignumber";
import { ChainId } from "./consts";
export declare const METADATA_REPLACE: RegExp;
export declare const parseNFTPayload: (arr: Buffer) => {
    originAddress: string;
    originChain: ChainId;
    symbol: string;
    name: string;
    tokenId: BigNumber;
    uri: string;
    targetAddress: string;
    targetChain: ChainId;
};
export declare const parseTransferPayload: (arr: Buffer) => {
    amount: bigint;
    originAddress: string;
    originChain: ChainId;
    targetAddress: string;
    targetChain: ChainId;
    fee: bigint;
};
