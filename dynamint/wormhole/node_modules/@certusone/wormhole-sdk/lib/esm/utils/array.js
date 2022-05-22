import { arrayify, zeroPad } from "@ethersproject/bytes";
import { PublicKey } from "@solana/web3.js";
import { hexValue, hexZeroPad, stripZeros } from "ethers/lib/utils";
import { hexToNativeAssetStringAlgorand, nativeStringToHexAlgorand, uint8ArrayToNativeStringAlgorand, } from "../algorand";
import { canonicalAddress, humanAddress, isNativeDenom } from "../terra";
import { CHAIN_ID_ALGORAND, CHAIN_ID_NEAR, CHAIN_ID_SOLANA, CHAIN_ID_TERRA, CHAIN_ID_UNSET, coalesceChainId, isEVMChain, } from "./consts";
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
export var isHexNativeTerra = function (h) { return h.startsWith("01"); };
export var nativeTerraHexToDenom = function (h) {
    return Buffer.from(stripZeros(hexToUint8Array(h.substr(2)))).toString("ascii");
};
export var uint8ArrayToHex = function (a) {
    return Buffer.from(a).toString("hex");
};
export var hexToUint8Array = function (h) {
    return new Uint8Array(Buffer.from(h, "hex"));
};
/**
 *
 * Convert an address in a wormhole's 32-byte array representation into a chain's
 * native string representation.
 *
 * @throws if address is not the right length for the given chain
 */
export var tryUint8ArrayToNative = function (a, chain) {
    var chainId = coalesceChainId(chain);
    if (isEVMChain(chainId)) {
        return hexZeroPad(hexValue(a), 20);
    }
    else if (chainId === CHAIN_ID_SOLANA) {
        return new PublicKey(a).toString();
    }
    else if (chainId === CHAIN_ID_TERRA) {
        var h = uint8ArrayToHex(a);
        if (isHexNativeTerra(h)) {
            return nativeTerraHexToDenom(h);
        }
        else {
            return humanAddress(a.slice(-20)); // terra expects 20 bytes, not 32
        }
    }
    else if (chainId === CHAIN_ID_ALGORAND) {
        return uint8ArrayToNativeStringAlgorand(a);
    }
    else if (chainId === CHAIN_ID_NEAR) {
        throw Error("uint8ArrayToNative: Near not supported yet.");
    }
    else if (chainId === CHAIN_ID_UNSET) {
        throw Error("uint8ArrayToNative: Chain id unset");
    }
    else {
        // This case is never reached
        var _1 = chainId;
        throw Error("Don't know how to convert address for chain " + chainId);
    }
};
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @throws if address is not the right length for the given chain
 */
export var tryHexToNativeAssetString = function (h, c) {
    return c === CHAIN_ID_ALGORAND
        ? // Algorand assets are represented by their asset ids, not an address
            hexToNativeAssetStringAlgorand(h)
        : tryHexToNativeString(h, c);
};
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @deprecated since 0.3.0, use [[tryHexToNativeString]] instead.
 */
export var hexToNativeAssetString = function (h, c) {
    if (!h) {
        return undefined;
    }
    try {
        return tryHexToNativeAssetString(h, c);
    }
    catch (e) {
        return undefined;
    }
};
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @throws if address is not the right length for the given chain
 */
export var tryHexToNativeString = function (h, c) { return tryUint8ArrayToNative(hexToUint8Array(h), c); };
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @deprecated since 0.3.0, use [[tryHexToNativeString]] instead.
 */
export var hexToNativeString = function (h, c) {
    if (!h) {
        return undefined;
    }
    try {
        return tryHexToNativeString(h, c);
    }
    catch (e) {
        return undefined;
    }
};
/**
 *
 * Convert an address in a chain's native representation into a 32-byte hex string
 * understood by wormhole.
 *
 * @throws if address is a malformed string for the given chain id
 */
export var tryNativeToHexString = function (address, chain) {
    var chainId = coalesceChainId(chain);
    if (isEVMChain(chainId)) {
        return uint8ArrayToHex(zeroPad(arrayify(address), 32));
    }
    else if (chainId === CHAIN_ID_SOLANA) {
        return uint8ArrayToHex(zeroPad(new PublicKey(address).toBytes(), 32));
    }
    else if (chainId === CHAIN_ID_TERRA) {
        if (isNativeDenom(address)) {
            return ("01" +
                uint8ArrayToHex(zeroPad(new Uint8Array(Buffer.from(address, "ascii")), 31)));
        }
        else {
            return uint8ArrayToHex(zeroPad(canonicalAddress(address), 32));
        }
    }
    else if (chainId === CHAIN_ID_ALGORAND) {
        return nativeStringToHexAlgorand(address);
    }
    else if (chainId === CHAIN_ID_NEAR) {
        throw Error("hexToNativeString: Near not supported yet.");
    }
    else if (chainId === CHAIN_ID_UNSET) {
        throw Error("hexToNativeString: Chain id unset");
    }
    else {
        // If this case is reached
        var _2 = chainId;
        throw Error("Don't know how to convert address from chain " + chainId);
    }
};
/**
 *
 * Convert an address in a chain's native representation into a 32-byte hex string
 * understood by wormhole.
 *
 * @deprecated since 0.3.0, use [[tryNativeToHexString]] instead.
 * @throws if address is a malformed string for the given chain id
 */
export var nativeToHexString = function (address, chain) {
    if (!address) {
        return null;
    }
    return tryNativeToHexString(address, chain);
};
/**
 *
 * Convert an address in a chain's native representation into a 32-byte array
 * understood by wormhole.
 *
 * @throws if address is a malformed string for the given chain id
 */
export function tryNativeToUint8Array(address, chain) {
    var chainId = coalesceChainId(chain);
    return hexToUint8Array(tryNativeToHexString(address, chainId));
}
/**
 *
 * Convert an address in a chain's native representation into a 32-byte hex string
 * understood by wormhole.
 *
 * @deprecated since 0.3.0, use [[tryUint8ArrayToNative]] instead.
 * @throws if address is a malformed string for the given chain id
 */
export var uint8ArrayToNative = function (a, chainId) {
    return hexToNativeString(uint8ArrayToHex(a), chainId);
};
export function chunks(array, size) {
    return Array.apply(0, new Array(Math.ceil(array.length / size))).map(function (_, index) { return array.slice(index * size, (index + 1) * size); });
}
export function textToHexString(name) {
    return Buffer.from(name, "binary").toString("hex");
}
export function textToUint8Array(name) {
    return new Uint8Array(Buffer.from(name, "binary"));
}
