import algosdk, { LogicSigAccount } from "algosdk";
interface IPopulateData {
    appId: bigint;
    appAddress: string;
    addrIdx: bigint;
    emitterId: string;
}
export declare type PopulateData = Required<IPopulateData>;
export declare class TmplSig {
    algoClient: algosdk.Algodv2;
    sourceHash: string;
    bytecode: Uint8Array;
    constructor(algoClient: algosdk.Algodv2);
    compile(source: string): Promise<void>;
    /**
     * Populate data in the TEAL source and return the LogicSig object based on the resulting compiled bytecode.
     * @param data The data to populate fields with.
     * @notes emitterId must be prefixed with '0x'. appAddress must be decoded with algoSDK and prefixed with '0x'.
     * @returns A LogicSig object.
     */
    populate(data: PopulateData): Promise<LogicSigAccount>;
}
export {};
