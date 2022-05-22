"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textToUint8Array = exports.textToHexString = exports.chunks = exports.uint8ArrayToNative = exports.tryNativeToUint8Array = exports.nativeToHexString = exports.tryNativeToHexString = exports.hexToNativeString = exports.tryHexToNativeString = exports.hexToNativeAssetString = exports.tryHexToNativeAssetString = exports.tryUint8ArrayToNative = exports.hexToUint8Array = exports.uint8ArrayToHex = exports.nativeTerraHexToDenom = exports.isHexNativeTerra = void 0;
var bytes_1 = require("@ethersproject/bytes");
var web3_js_1 = require("@solana/web3.js");
var utils_1 = require("ethers/lib/utils");
var algorand_1 = require("../algorand");
var terra_1 = require("../terra");
var consts_1 = require("./consts");
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
var isHexNativeTerra = function (h) { return h.startsWith("01"); };
exports.isHexNativeTerra = isHexNativeTerra;
var nativeTerraHexToDenom = function (h) {
    return Buffer.from(utils_1.stripZeros(exports.hexToUint8Array(h.substr(2)))).toString("ascii");
};
exports.nativeTerraHexToDenom = nativeTerraHexToDenom;
var uint8ArrayToHex = function (a) {
    return Buffer.from(a).toString("hex");
};
exports.uint8ArrayToHex = uint8ArrayToHex;
var hexToUint8Array = function (h) {
    return new Uint8Array(Buffer.from(h, "hex"));
};
exports.hexToUint8Array = hexToUint8Array;
/**
 *
 * Convert an address in a wormhole's 32-byte array representation into a chain's
 * native string representation.
 *
 * @throws if address is not the right length for the given chain
 */
var tryUint8ArrayToNative = function (a, chain) {
    var chainId = consts_1.coalesceChainId(chain);
    if (consts_1.isEVMChain(chainId)) {
        return utils_1.hexZeroPad(utils_1.hexValue(a), 20);
    }
    else if (chainId === consts_1.CHAIN_ID_SOLANA) {
        return new web3_js_1.PublicKey(a).toString();
    }
    else if (chainId === consts_1.CHAIN_ID_TERRA) {
        var h = exports.uint8ArrayToHex(a);
        if (exports.isHexNativeTerra(h)) {
            return exports.nativeTerraHexToDenom(h);
        }
        else {
            return terra_1.humanAddress(a.slice(-20)); // terra expects 20 bytes, not 32
        }
    }
    else if (chainId === consts_1.CHAIN_ID_ALGORAND) {
        return algorand_1.uint8ArrayToNativeStringAlgorand(a);
    }
    else if (chainId === consts_1.CHAIN_ID_NEAR) {
        throw Error("uint8ArrayToNative: Near not supported yet.");
    }
    else if (chainId === consts_1.CHAIN_ID_UNSET) {
        throw Error("uint8ArrayToNative: Chain id unset");
    }
    else {
        // This case is never reached
        var _1 = chainId;
        throw Error("Don't know how to convert address for chain " + chainId);
    }
};
exports.tryUint8ArrayToNative = tryUint8ArrayToNative;
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @throws if address is not the right length for the given chain
 */
var tryHexToNativeAssetString = function (h, c) {
    return c === consts_1.CHAIN_ID_ALGORAND
        ? // Algorand assets are represented by their asset ids, not an address
            algorand_1.hexToNativeAssetStringAlgorand(h)
        : exports.tryHexToNativeString(h, c);
};
exports.tryHexToNativeAssetString = tryHexToNativeAssetString;
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @deprecated since 0.3.0, use [[tryHexToNativeString]] instead.
 */
var hexToNativeAssetString = function (h, c) {
    if (!h) {
        return undefined;
    }
    try {
        return exports.tryHexToNativeAssetString(h, c);
    }
    catch (e) {
        return undefined;
    }
};
exports.hexToNativeAssetString = hexToNativeAssetString;
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @throws if address is not the right length for the given chain
 */
var tryHexToNativeString = function (h, c) { return exports.tryUint8ArrayToNative(exports.hexToUint8Array(h), c); };
exports.tryHexToNativeString = tryHexToNativeString;
/**
 *
 * Convert an address in a wormhole's 32-byte hex representation into a chain's native
 * string representation.
 *
 * @deprecated since 0.3.0, use [[tryHexToNativeString]] instead.
 */
var hexToNativeString = function (h, c) {
    if (!h) {
        return undefined;
    }
    try {
        return exports.tryHexToNativeString(h, c);
    }
    catch (e) {
        return undefined;
    }
};
exports.hexToNativeString = hexToNativeString;
/**
 *
 * Convert an address in a chain's native representation into a 32-byte hex string
 * understood by wormhole.
 *
 * @throws if address is a malformed string for the given chain id
 */
var tryNativeToHexString = function (address, chain) {
    var chainId = consts_1.coalesceChainId(chain);
    if (consts_1.isEVMChain(chainId)) {
        return exports.uint8ArrayToHex(bytes_1.zeroPad(bytes_1.arrayify(address), 32));
    }
    else if (chainId === consts_1.CHAIN_ID_SOLANA) {
        return exports.uint8ArrayToHex(bytes_1.zeroPad(new web3_js_1.PublicKey(address).toBytes(), 32));
    }
    else if (chainId === consts_1.CHAIN_ID_TERRA) {
        if (terra_1.isNativeDenom(address)) {
            return ("01" +
                exports.uint8ArrayToHex(bytes_1.zeroPad(new Uint8Array(Buffer.from(address, "ascii")), 31)));
        }
        else {
            return exports.uint8ArrayToHex(bytes_1.zeroPad(terra_1.canonicalAddress(address), 32));
        }
    }
    else if (chainId === consts_1.CHAIN_ID_ALGORAND) {
        return algorand_1.nativeStringToHexAlgorand(address);
    }
    else if (chainId === consts_1.CHAIN_ID_NEAR) {
        throw Error("hexToNativeString: Near not supported yet.");
    }
    else if (chainId === consts_1.CHAIN_ID_UNSET) {
        throw Error("hexToNativeString: Chain id unset");
    }
    else {
        // If this case is reached
        var _2 = chainId;
        throw Error("Don't know how to convert address from chain " + chainId);
    }
};
exports.tryNativeToHexString = tryNativeToHexString;
/**
 *
 * Convert an address in a chain's native representation into a 32-byte hex string
 * understood by wormhole.
 *
 * @deprecated since 0.3.0, use [[tryNativeToHexString]] instead.
 * @throws if address is a malformed string for the given chain id
 */
var nativeToHexString = function (address, chain) {
    if (!address) {
        return null;
    }
    return exports.tryNativeToHexString(address, chain);
};
exports.nativeToHexString = nativeToHexString;
/**
 *
 * Convert an address in a chain's native representation into a 32-byte array
 * understood by wormhole.
 *
 * @throws if address is a malformed string for the given chain id
 */
function tryNativeToUint8Array(address, chain) {
    var chainId = consts_1.coalesceChainId(chain);
    return exports.hexToUint8Array(exports.tryNativeToHexString(address, chainId));
}
exports.tryNativeToUint8Array = tryNativeToUint8Array;
/**
 *
 * Convert an address in a chain's native representation into a 32-byte hex string
 * understood by wormhole.
 *
 * @deprecated since 0.3.0, use [[tryUint8ArrayToNative]] instead.
 * @throws if address is a malformed string for the given chain id
 */
var uint8ArrayToNative = function (a, chainId) {
    return exports.hexToNativeString(exports.uint8ArrayToHex(a), chainId);
};
exports.uint8ArrayToNative = uint8ArrayToNative;
function chunks(array, size) {
    return Array.apply(0, new Array(Math.ceil(array.length / size))).map(function (_, index) { return array.slice(index * size, (index + 1) * size); });
}
exports.chunks = chunks;
function textToHexString(name) {
    return Buffer.from(name, "binary").toString("hex");
}
exports.textToHexString = textToHexString;
function textToUint8Array(name) {
    return new Uint8Array(Buffer.from(name, "binary"));
}
exports.textToUint8Array = textToUint8Array;
