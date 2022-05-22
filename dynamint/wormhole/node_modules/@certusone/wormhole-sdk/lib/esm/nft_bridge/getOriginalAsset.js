var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { PublicKey } from "@solana/web3.js";
import { BigNumber } from "ethers";
import { arrayify, zeroPad } from "ethers/lib/utils";
import { canonicalAddress } from "..";
import { TokenImplementation__factory } from "../ethers-contracts";
import { importNftWasm } from "../solana/wasm";
import { CHAIN_ID_SOLANA, CHAIN_ID_TERRA, coalesceChainId, } from "../utils";
import { getIsWrappedAssetEth } from "./getIsWrappedAsset";
/**
 * Returns a origin chain and asset address on {originChain} for a provided Wormhole wrapped address
 * @param tokenBridgeAddress
 * @param provider
 * @param wrappedAddress
 * @returns
 */
export function getOriginalAssetEth(tokenBridgeAddress, provider, wrappedAddress, tokenId, lookupChain) {
    return __awaiter(this, void 0, void 0, function () {
        var isWrapped, token, chainId, assetAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getIsWrappedAssetEth(tokenBridgeAddress, provider, wrappedAddress)];
                case 1:
                    isWrapped = _a.sent();
                    if (!isWrapped) return [3 /*break*/, 4];
                    token = TokenImplementation__factory.connect(wrappedAddress, provider);
                    return [4 /*yield*/, token.chainId()];
                case 2:
                    chainId = (_a.sent());
                    return [4 /*yield*/, token.nativeContract()];
                case 3:
                    assetAddress = _a.sent();
                    return [2 /*return*/, {
                            isWrapped: true,
                            chainId: chainId,
                            assetAddress: chainId === CHAIN_ID_SOLANA
                                ? arrayify(BigNumber.from(tokenId))
                                : arrayify(assetAddress),
                            tokenId: tokenId,
                        }];
                case 4: return [2 /*return*/, {
                        isWrapped: false,
                        chainId: coalesceChainId(lookupChain),
                        assetAddress: zeroPad(arrayify(wrappedAddress), 32),
                        tokenId: tokenId,
                    }];
            }
        });
    });
}
/**
 * Returns a origin chain and asset address on {originChain} for a provided Wormhole wrapped address
 * @param connection
 * @param tokenBridgeAddress
 * @param mintAddress
 * @returns
 */
export function getOriginalAssetSol(connection, tokenBridgeAddress, mintAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, parse_wrapped_meta, wrapped_meta_address, wrappedMetaAddress, wrappedMetaAddressPK, wrappedMetaAccountInfo, parsed, token_id_arr, token_id_bytes, _b, _c, elem, token_id;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!mintAddress) return [3 /*break*/, 3];
                    return [4 /*yield*/, importNftWasm()];
                case 1:
                    _a = _e.sent(), parse_wrapped_meta = _a.parse_wrapped_meta, wrapped_meta_address = _a.wrapped_meta_address;
                    wrappedMetaAddress = wrapped_meta_address(tokenBridgeAddress, new PublicKey(mintAddress).toBytes());
                    wrappedMetaAddressPK = new PublicKey(wrappedMetaAddress);
                    return [4 /*yield*/, connection.getAccountInfo(wrappedMetaAddressPK)];
                case 2:
                    wrappedMetaAccountInfo = _e.sent();
                    if (wrappedMetaAccountInfo) {
                        parsed = parse_wrapped_meta(wrappedMetaAccountInfo.data);
                        token_id_arr = parsed.token_id;
                        token_id_bytes = [];
                        try {
                            for (_b = __values(token_id_arr.reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                elem = _c.value;
                                token_id_bytes.push.apply(token_id_bytes, __spreadArray([], __read(bigToUint8Array(elem))));
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        token_id = BigNumber.from(token_id_bytes).toString();
                        return [2 /*return*/, {
                                isWrapped: true,
                                chainId: parsed.chain,
                                assetAddress: parsed.token_address,
                                tokenId: token_id,
                            }];
                    }
                    _e.label = 3;
                case 3:
                    try {
                        return [2 /*return*/, {
                                isWrapped: false,
                                chainId: CHAIN_ID_SOLANA,
                                assetAddress: new PublicKey(mintAddress).toBytes(),
                            }];
                    }
                    catch (e) { }
                    return [2 /*return*/, {
                            isWrapped: false,
                            chainId: CHAIN_ID_SOLANA,
                            assetAddress: new Uint8Array(32),
                        }];
            }
        });
    });
}
// Derived from https://www.jackieli.dev/posts/bigint-to-uint8array/
var big0 = BigInt(0);
var big1 = BigInt(1);
var big8 = BigInt(8);
function bigToUint8Array(big) {
    if (big < big0) {
        var bits = (BigInt(big.toString(2).length) / big8 + big1) * big8;
        var prefix1 = big1 << bits;
        big += prefix1;
    }
    var hex = big.toString(16);
    if (hex.length % 2) {
        hex = "0" + hex;
    }
    else if (hex[0] === "8") {
        // maximum positive need to prepend 0 otherwise resuts in negative number
        hex = "00" + hex;
    }
    var len = hex.length / 2;
    var u8 = new Uint8Array(len);
    var i = 0;
    var j = 0;
    while (i < len) {
        u8[i] = parseInt(hex.slice(j, j + 2), 16);
        i += 1;
        j += 2;
    }
    return u8;
}
export function getOriginalAssetTerra(client, wrappedAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client.wasm.contractQuery(wrappedAddress, {
                            wrapped_asset_info: {},
                        })];
                case 1:
                    result = _a.sent();
                    if (result) {
                        return [2 /*return*/, {
                                isWrapped: true,
                                chainId: result.asset_chain,
                                assetAddress: new Uint8Array(Buffer.from(result.asset_address, "base64")),
                            }];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, {
                        isWrapped: false,
                        chainId: CHAIN_ID_TERRA,
                        assetAddress: zeroPad(canonicalAddress(wrappedAddress), 32),
                    }];
            }
        });
    });
}
