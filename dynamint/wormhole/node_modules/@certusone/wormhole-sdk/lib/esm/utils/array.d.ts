import { ChainId, ChainName } from "./consts";
/**
 *
 * Returns true iff the hex string represents a native Terra denom.
 *
 * Native assets on terra don't have an associated smart contract address, just
 * like eth isn't an ERC-20 contract on Ethereum.
 *
 * The difference is that the EVM implementations of Portal don't support eth
 * directly, and instead require swapping to an ERC-20 wrapped eth (WETH)
 * contract first.
 *
 * The Terra implementation instead supports Terra-native denoms without
 * wrapping to CW-20 token first. As these denoms don't have an address, they
 * are encoded in the Portal payloads by the setting the first byte to 1.  This
 * encoding is safe, because the first 12 bytes of the 32-byte wormhole address
 * space are not used on Terra otherwise, as cosmos addresses are 20 bytes wide.
 */
export declare const isHexNativeTerra: (h: string) => boolean;
export declare const nativeTerraHexToDenom: (h: string) => string;
export declare const uint8ArrayToHex: (a: Uint8Array) => string;
export declare const hexToUint8Array: (h: string) => Uint8Array;
/**
 *
 * Convert an address in a wormhole's 32-byte array representation into a chain's
 * native string representation.
 *
 * @throws if address is not the right length for the given chain
 */
export declare const tryUint8ArrayToNative: (a: Uint8Array, chain: ChainId | ChainName) => string;
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @throws if address is not the right length for the given chain
 */
export declare const tryHexToNativeAssetString: (h: string, c: ChainId) => string;
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @deprecated since 0.3.0, use [[tryHexToNativeString]] instead.
 */
export declare const hexToNativeAssetString: (h: string | undefined, c: ChainId) => string | undefined;
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @throws if address is not the right length for the given chain
 */
export declare const tryHexToNativeString: (h: string, c: ChainId | ChainName) => string;
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @deprecated since 0.3.0, use [[tryHexToNativeString]] instead.
 */
export declare const hexToNativeString: (h: string | undefined, c: ChainId | ChainName) => string | undefined;
/**
 *
 * Convert an address in a chain's native representation into a 32-byte hex string
 * understood by wormhole.
 *
 * @throws if address is a malformed string for the given chain id
 */
export declare const tryNativeToHexString: (address: string, chain: ChainId | ChainName) => string;
/**
 *
 * Convert an address in a chain's native representation into a 32-byte hex string
 * understood by wormhole.
 *
 * @deprecated since 0.3.0, use [[tryNativeToHexString]] instead.
 * @throws if address is a malformed string for the given chain id
 */
export declare const nativeToHexString: (address: string | undefined, chain: ChainId | ChainName) => string | null;
/**
 *
 * Convert an address in a chain's native representation into a 32-byte array
 * understood by wormhole.
 *
 * @throws if address is a malformed string for the given chain id
 */
export declare function tryNativeToUint8Array(address: string, chain: ChainId | ChainName): Uint8Array;
/**
 *
 * Convert an address in a chain's native representation into a 32-byte hex string
 * understood by wormhole.
 *
 * @deprecated since 0.3.0, use [[tryUint8ArrayToNative]] instead.
 * @throws if address is a malformed string for the given chain id
 */
export declare const uint8ArrayToNative: (a: Uint8Array, chainId: ChainId) => string | undefined;
export declare function chunks<T>(array: T[], size: number): T[][];
export declare function textToHexString(name: string): string;
export declare function textToUint8Array(name: string): Uint8Array;
