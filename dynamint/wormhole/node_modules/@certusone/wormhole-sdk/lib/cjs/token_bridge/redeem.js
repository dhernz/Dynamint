"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemOnAlgorand = exports.redeemOnSolana = exports.redeemAndUnwrapOnSolana = exports.redeemOnTerra = exports.redeemOnEthNative = exports.redeemOnEth = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var terra_js_1 = require("@terra-money/terra.js");
var js_base64_1 = require("js-base64");
var algorand_1 = require("../algorand");
var ethers_contracts_1 = require("../ethers-contracts");
var solana_1 = require("../solana");
var wasm_1 = require("../solana/wasm");
var utils_1 = require("../utils");
var array_1 = require("../utils/array");
var parseVaa_1 = require("../utils/parseVaa");
function redeemOnEth(tokenBridgeAddress, signer, signedVAA, overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var bridge, v, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bridge = ethers_contracts_1.Bridge__factory.connect(tokenBridgeAddress, signer);
                    return [4 /*yield*/, bridge.completeTransfer(signedVAA, overrides)];
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
exports.redeemOnEth = redeemOnEth;
function redeemOnEthNative(tokenBridgeAddress, signer, signedVAA, overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var bridge, v, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bridge = ethers_contracts_1.Bridge__factory.connect(tokenBridgeAddress, signer);
                    return [4 /*yield*/, bridge.completeTransferAndUnwrapETH(signedVAA, overrides)];
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
exports.redeemOnEthNative = redeemOnEthNative;
function redeemOnTerra(tokenBridgeAddress, walletAddress, signedVAA) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new terra_js_1.MsgExecuteContract(walletAddress, tokenBridgeAddress, {
                    submit_vaa: {
                        data: js_base64_1.fromUint8Array(signedVAA),
                    },
                })];
        });
    });
}
exports.redeemOnTerra = redeemOnTerra;
function redeemAndUnwrapOnSolana(connection, bridgeAddress, tokenBridgeAddress, payerAddress, signedVAA) {
    return __awaiter(this, void 0, void 0, function () {
        var parse_vaa, complete_transfer_native_ix, parsedVAA, parsedPayload, targetAddress, targetPublicKey, targetAmount, rentBalance, mintPublicKey, payerPublicKey, ancillaryKeypair, completeTransferIx, createAncillaryAccountIx, initAccountIx, balanceTransferIx, closeAccountIx, blockhash, transaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wasm_1.importCoreWasm()];
                case 1:
                    parse_vaa = (_a.sent()).parse_vaa;
                    return [4 /*yield*/, wasm_1.importTokenWasm()];
                case 2:
                    complete_transfer_native_ix = (_a.sent()).complete_transfer_native_ix;
                    parsedVAA = parse_vaa(signedVAA);
                    parsedPayload = parseVaa_1.parseTransferPayload(Buffer.from(new Uint8Array(parsedVAA.payload)));
                    targetAddress = array_1.hexToNativeString(parsedPayload.targetAddress, utils_1.CHAIN_ID_SOLANA);
                    if (!targetAddress) {
                        throw new Error("Failed to read the target address.");
                    }
                    targetPublicKey = new web3_js_1.PublicKey(targetAddress);
                    targetAmount = parsedPayload.amount *
                        BigInt(utils_1.WSOL_DECIMALS - utils_1.MAX_VAA_DECIMALS) *
                        BigInt(10);
                    return [4 /*yield*/, spl_token_1.Token.getMinBalanceRentForExemptAccount(connection)];
                case 3:
                    rentBalance = _a.sent();
                    mintPublicKey = new web3_js_1.PublicKey(utils_1.WSOL_ADDRESS);
                    payerPublicKey = new web3_js_1.PublicKey(payerAddress);
                    ancillaryKeypair = web3_js_1.Keypair.generate();
                    completeTransferIx = solana_1.ixFromRust(complete_transfer_native_ix(tokenBridgeAddress, bridgeAddress, payerAddress, signedVAA));
                    createAncillaryAccountIx = web3_js_1.SystemProgram.createAccount({
                        fromPubkey: payerPublicKey,
                        newAccountPubkey: ancillaryKeypair.publicKey,
                        lamports: rentBalance,
                        space: spl_token_1.AccountLayout.span,
                        programId: spl_token_1.TOKEN_PROGRAM_ID,
                    });
                    return [4 /*yield*/, spl_token_1.Token.createInitAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, mintPublicKey, ancillaryKeypair.publicKey, payerPublicKey)];
                case 4:
                    initAccountIx = _a.sent();
                    balanceTransferIx = spl_token_1.Token.createTransferInstruction(spl_token_1.TOKEN_PROGRAM_ID, targetPublicKey, ancillaryKeypair.publicKey, payerPublicKey, [], new spl_token_1.u64(targetAmount.toString(16), 16));
                    closeAccountIx = spl_token_1.Token.createCloseAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, ancillaryKeypair.publicKey, //account to close
                    payerPublicKey, //Remaining funds destination
                    payerPublicKey, //authority
                    []);
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 5:
                    blockhash = (_a.sent()).blockhash;
                    transaction = new web3_js_1.Transaction();
                    transaction.recentBlockhash = blockhash;
                    transaction.feePayer = new web3_js_1.PublicKey(payerAddress);
                    transaction.add(completeTransferIx);
                    transaction.add(createAncillaryAccountIx);
                    transaction.add(initAccountIx);
                    transaction.add(balanceTransferIx);
                    transaction.add(closeAccountIx);
                    transaction.partialSign(ancillaryKeypair);
                    return [2 /*return*/, transaction];
            }
        });
    });
}
exports.redeemAndUnwrapOnSolana = redeemAndUnwrapOnSolana;
function redeemOnSolana(connection, bridgeAddress, tokenBridgeAddress, payerAddress, signedVAA, feeRecipientAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var parse_vaa, parsedVAA, isSolanaNative, _a, complete_transfer_wrapped_ix, complete_transfer_native_ix, ixs, transaction, blockhash;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, wasm_1.importCoreWasm()];
                case 1:
                    parse_vaa = (_c.sent()).parse_vaa;
                    parsedVAA = parse_vaa(signedVAA);
                    isSolanaNative = Buffer.from(new Uint8Array(parsedVAA.payload)).readUInt16BE(65) ===
                        utils_1.CHAIN_ID_SOLANA;
                    return [4 /*yield*/, wasm_1.importTokenWasm()];
                case 2:
                    _a = _c.sent(), complete_transfer_wrapped_ix = _a.complete_transfer_wrapped_ix, complete_transfer_native_ix = _a.complete_transfer_native_ix;
                    ixs = [];
                    if (isSolanaNative) {
                        ixs.push(solana_1.ixFromRust(complete_transfer_native_ix(tokenBridgeAddress, bridgeAddress, payerAddress, signedVAA, feeRecipientAddress)));
                    }
                    else {
                        ixs.push(solana_1.ixFromRust(complete_transfer_wrapped_ix(tokenBridgeAddress, bridgeAddress, payerAddress, signedVAA, feeRecipientAddress)));
                    }
                    transaction = (_b = new web3_js_1.Transaction()).add.apply(_b, __spreadArray([], __read(ixs)));
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 3:
                    blockhash = (_c.sent()).blockhash;
                    transaction.recentBlockhash = blockhash;
                    transaction.feePayer = new web3_js_1.PublicKey(payerAddress);
                    return [2 /*return*/, transaction];
            }
        });
    });
}
exports.redeemOnSolana = redeemOnSolana;
/**
 * This basically just submits the VAA to Algorand
 * @param client AlgodV2 client
 * @param tokenBridgeId Token bridge ID
 * @param bridgeId Core bridge ID
 * @param vaa The VAA to be redeemed
 * @param acct Sending account
 * @returns Transaction ID(s)
 */
function redeemOnAlgorand(client, tokenBridgeId, bridgeId, vaa, senderAddr) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, algorand_1._submitVAAAlgorand(client, tokenBridgeId, bridgeId, vaa, senderAddr)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.redeemOnAlgorand = redeemOnAlgorand;
