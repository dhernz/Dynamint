export declare function canonicalAddress(humanAddress: string): Uint8Array;
export declare function humanAddress(canonicalAddress: Uint8Array): string;
export declare const isNativeTerra: (string?: string) => boolean;
export declare const isNativeDenom: (string?: string) => boolean;
export declare function buildNativeId(denom: string): Uint8Array;
