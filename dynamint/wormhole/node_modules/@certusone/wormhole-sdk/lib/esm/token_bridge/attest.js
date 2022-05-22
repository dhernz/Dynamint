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
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { bigIntToBytes, decodeAddress, getApplicationAddress, makeApplicationCallTxnFromObject, makePaymentTxnWithSuggestedParamsFromObject, OnApplicationComplete, } from "algosdk";
import { isNativeDenom } from "..";
import { getMessageFee, optin } from "../algorand";
import { Bridge__factory } from "../ethers-contracts";
import { getBridgeFeeIx, ixFromRust } from "../solana";
import { importTokenWasm } from "../solana/wasm";
import { textToHexString, textToUint8Array, uint8ArrayToHex } from "../utils";
import { safeBigIntToNumber } from "../utils/bigint";
import { createNonce } from "../utils/createNonce";
export function attestFromEth(tokenBridgeAddress, signer, tokenAddress, overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var bridge, v, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bridge = Bridge__factory.connect(tokenBridgeAddress, signer);
                    return [4 /*yield*/, bridge.attestToken(tokenAddress, createNonce(), overrides)];
                case 1:
                    v = _a.sent();
                    return [4 /*yield*/, v.wait()];
                case 2:
                    receipt = _a.sent();
                    return [2 /*return*/, receipt];
            }
        });
    });
}
export function attestFromTerra(tokenBridgeAddress, walletAddress, asset) {
    return __awaiter(this, void 0, void 0, function () {
        var nonce, isNativeAsset;
        return __generator(this, function (_a) {
            nonce = Math.round(Math.random() * 100000);
            isNativeAsset = isNativeDenom(asset);
            return [2 /*return*/, new MsgExecuteContract(walletAddress, tokenBridgeAddress, {
                    create_asset_meta: {
                        asset_info: isNativeAsset
                            ? {
                                native_token: { denom: asset },
                            }
                            : {
                                token: {
                                    contract_addr: asset,
                                },
                            },
                        nonce: nonce,
                    },
                })];
        });
    });
}
export function attestFromSolana(connection, bridgeAddress, tokenBridgeAddress, payerAddress, mintAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var nonce, transferIx, attest_ix, messageKey, ix, transaction, blockhash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonce = createNonce().readUInt32LE(0);
                    return [4 /*yield*/, getBridgeFeeIx(connection, bridgeAddress, payerAddress)];
                case 1:
                    transferIx = _a.sent();
                    return [4 /*yield*/, importTokenWasm()];
                case 2:
                    attest_ix = (_a.sent()).attest_ix;
                    messageKey = Keypair.generate();
                    ix = ixFromRust(attest_ix(tokenBridgeAddress, bridgeAddress, payerAddress, messageKey.publicKey.toString(), mintAddress, nonce));
                    transaction = new Transaction().add(transferIx, ix);
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 3:
                    blockhash = (_a.sent()).blockhash;
                    transaction.recentBlockhash = blockhash;
                    transaction.feePayer = new PublicKey(payerAddress);
                    transaction.partialSign(messageKey);
                    return [2 /*return*/, transaction];
            }
        });
    });
}
/**
 * Attest an already created asset
 * If you create a new asset on algorand and want to transfer it elsewhere,
 * you create an attestation for it on algorand... pass that vaa to the target chain..
 * submit it.. then you can transfer from algorand to that target chain
 * @param client An Algodv2 client
 * @param tokenBridgeId The ID of the token bridge
 * @param senderAcct The account paying fees
 * @param assetId The asset index
 * @returns Transaction ID
 */
export function attestFromAlgorand(client, tokenBridgeId, bridgeId, senderAddr, assetId) {
    return __awaiter(this, void 0, void 0, function () {
        var tbAddr, decTbAddr, aa, txs, _a, emitterAddr, emitterOptInTxs, wormhole, creatorAcctInfo, creatorAddr, bPgmName, assetInfo, creatorAddr_1, result, suggParams, firstTxn, mfee, feeTxn, accts, appTxn;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tbAddr = getApplicationAddress(tokenBridgeId);
                    decTbAddr = decodeAddress(tbAddr).publicKey;
                    aa = uint8ArrayToHex(decTbAddr);
                    txs = [];
                    return [4 /*yield*/, optin(client, senderAddr, bridgeId, BigInt(0), aa)];
                case 1:
                    _a = _b.sent(), emitterAddr = _a.addr, emitterOptInTxs = _a.txs;
                    txs.push.apply(txs, __spreadArray([], __read(emitterOptInTxs)));
                    wormhole = false;
                    creatorAcctInfo = false;
                    creatorAddr = "";
                    bPgmName = textToUint8Array("attestToken");
                    if (!(assetId !== BigInt(0))) return [3 /*break*/, 4];
                    return [4 /*yield*/, client
                            .getAssetByID(safeBigIntToNumber(assetId))
                            .do()];
                case 2:
                    assetInfo = _b.sent();
                    creatorAddr_1 = assetInfo.params.creator;
                    return [4 /*yield*/, client.accountInformation(creatorAddr_1).do()];
                case 3:
                    creatorAcctInfo = _b.sent();
                    wormhole = creatorAcctInfo["auth-addr"] === tbAddr;
                    return [3 /*break*/, 5];
                case 4:
                    wormhole = false;
                    _b.label = 5;
                case 5:
                    if (!!wormhole) return [3 /*break*/, 7];
                    return [4 /*yield*/, optin(client, senderAddr, tokenBridgeId, assetId, textToHexString("native"))];
                case 6:
                    result = _b.sent();
                    creatorAddr = result.addr;
                    txs.push.apply(txs, __spreadArray([], __read(result.txs)));
                    _b.label = 7;
                case 7: return [4 /*yield*/, client.getTransactionParams().do()];
                case 8:
                    suggParams = _b.sent();
                    firstTxn = makeApplicationCallTxnFromObject({
                        from: senderAddr,
                        appIndex: safeBigIntToNumber(tokenBridgeId),
                        onComplete: OnApplicationComplete.NoOpOC,
                        appArgs: [textToUint8Array("nop")],
                        suggestedParams: suggParams,
                    });
                    txs.push({ tx: firstTxn, signer: null });
                    return [4 /*yield*/, getMessageFee(client, bridgeId)];
                case 9:
                    mfee = _b.sent();
                    if (mfee > BigInt(0)) {
                        feeTxn = makePaymentTxnWithSuggestedParamsFromObject({
                            from: senderAddr,
                            suggestedParams: suggParams,
                            to: getApplicationAddress(tokenBridgeId),
                            amount: mfee,
                        });
                        txs.push({ tx: feeTxn, signer: null });
                    }
                    accts = [
                        emitterAddr,
                        creatorAddr,
                        getApplicationAddress(bridgeId),
                    ];
                    if (creatorAcctInfo) {
                        accts.push(creatorAcctInfo["address"]);
                    }
                    appTxn = makeApplicationCallTxnFromObject({
                        appArgs: [bPgmName, bigIntToBytes(assetId, 8)],
                        accounts: accts,
                        appIndex: safeBigIntToNumber(tokenBridgeId),
                        foreignApps: [safeBigIntToNumber(bridgeId)],
                        foreignAssets: [safeBigIntToNumber(assetId)],
                        from: senderAddr,
                        onComplete: OnApplicationComplete.NoOpOC,
                        suggestedParams: suggParams,
                    });
                    if (mfee > BigInt(0)) {
                        appTxn.fee *= 3;
                    }
                    else {
                        appTxn.fee *= 2;
                    }
                    txs.push({ tx: appTxn, signer: null });
                    return [2 /*return*/, txs];
            }
        });
    });
}
