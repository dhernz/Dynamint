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
import { Keypair, PublicKey, Transaction, } from "@solana/web3.js";
import { chunks } from "..";
import { sendAndConfirmTransactionsWithRetry } from "../utils/solana";
import { ixFromRust } from "./rust";
import { importCoreWasm } from "./wasm";
export function postVaaWithRetry(connection, signTransaction, bridge_id, payer, vaa, maxRetries) {
    return __awaiter(this, void 0, void 0, function () {
        var unsignedTransactions, signature_set, instructions, finalInstruction, batchableChunks, finalTransaction, partialSignWrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    unsignedTransactions = [];
                    signature_set = Keypair.generate();
                    return [4 /*yield*/, createVerifySignaturesInstructions(connection, bridge_id, payer, vaa, signature_set)];
                case 1:
                    instructions = _a.sent();
                    return [4 /*yield*/, createPostVaaInstruction(bridge_id, payer, vaa, signature_set)];
                case 2:
                    finalInstruction = _a.sent();
                    if (!finalInstruction) {
                        return [2 /*return*/, Promise.reject("Failed to construct the transaction.")];
                    }
                    batchableChunks = chunks(instructions, 2);
                    batchableChunks.forEach(function (chunk) {
                        var transaction;
                        if (chunk.length === 1) {
                            transaction = new Transaction().add(chunk[0]);
                        }
                        else {
                            transaction = new Transaction().add(chunk[0], chunk[1]);
                        }
                        unsignedTransactions.push(transaction);
                    });
                    finalTransaction = new Transaction().add(finalInstruction);
                    partialSignWrapper = function (transaction) {
                        transaction.partialSign(signature_set);
                        return signTransaction(transaction);
                    };
                    return [4 /*yield*/, sendAndConfirmTransactionsWithRetry(connection, partialSignWrapper, payer, unsignedTransactions, maxRetries)];
                case 3:
                    _a.sent();
                    //While the signature_set is used to create the final instruction, it doesn't need to sign it.
                    return [4 /*yield*/, sendAndConfirmTransactionsWithRetry(connection, signTransaction, payer, [finalTransaction], maxRetries)];
                case 4:
                    //While the signature_set is used to create the final instruction, it doesn't need to sign it.
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
}
/*
This returns an array of instructions required to verify the signatures of a VAA, and upload it to the blockchain.
signature_set should be a new keypair, and also needs to partial sign the transaction when these instructions are submitted.
*/
export function createVerifySignaturesInstructions(connection, bridge_id, payer, vaa, signature_set) {
    return __awaiter(this, void 0, void 0, function () {
        var output, _a, guardian_set_address, parse_guardian_set, parse_vaa, verify_signatures_ix, guardian_set_index, guardian_addr, acc, guardian_data, txs, txs_1, txs_1_1, tx, ixs;
        var e_1, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    output = [];
                    return [4 /*yield*/, importCoreWasm()];
                case 1:
                    _a = _c.sent(), guardian_set_address = _a.guardian_set_address, parse_guardian_set = _a.parse_guardian_set, parse_vaa = _a.parse_vaa, verify_signatures_ix = _a.verify_signatures_ix;
                    guardian_set_index = parse_vaa(new Uint8Array(vaa)).guardian_set_index;
                    guardian_addr = new PublicKey(guardian_set_address(bridge_id, guardian_set_index));
                    return [4 /*yield*/, connection.getAccountInfo(guardian_addr)];
                case 2:
                    acc = _c.sent();
                    if ((acc === null || acc === void 0 ? void 0 : acc.data) === undefined) {
                        return [2 /*return*/, output];
                    }
                    guardian_data = parse_guardian_set(new Uint8Array(acc === null || acc === void 0 ? void 0 : acc.data));
                    txs = verify_signatures_ix(bridge_id, payer, guardian_set_index, guardian_data, signature_set.publicKey.toString(), vaa);
                    try {
                        // Add transfer instruction to transaction
                        for (txs_1 = __values(txs), txs_1_1 = txs_1.next(); !txs_1_1.done; txs_1_1 = txs_1.next()) {
                            tx = txs_1_1.value;
                            ixs = tx.map(function (v) {
                                return ixFromRust(v);
                            });
                            output.push(ixs[0], ixs[1]);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (txs_1_1 && !txs_1_1.done && (_b = txs_1.return)) _b.call(txs_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [2 /*return*/, output];
            }
        });
    });
}
/*
This will return the postVaaInstruction. This should only be executed after the verifySignaturesInstructions have been executed.
signatureSetKeypair should be the same keypair used for verifySignaturesInstructions, but does not need to partialSign the transaction
when this instruction is submitted.
*/
export function createPostVaaInstruction(bridge_id, payer, vaa, signatureSetKeypair) {
    return __awaiter(this, void 0, void 0, function () {
        var post_vaa_ix;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, importCoreWasm()];
                case 1:
                    post_vaa_ix = (_a.sent()).post_vaa_ix;
                    return [2 /*return*/, ixFromRust(post_vaa_ix(bridge_id, payer, signatureSetKeypair.publicKey.toString(), vaa))];
            }
        });
    });
}
/*
  @deprecated
  Instead, either use postVaaWithRetry or create, sign, and send the verifySignaturesInstructions & postVaaInstruction yourself.
  
  This function is equivalent to a postVaaWithRetry with a maxRetries of 0.
*/
export function postVaa(connection, signTransaction, bridge_id, payer, vaa) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, guardian_set_address, parse_guardian_set, parse_vaa, post_vaa_ix, verify_signatures_ix, guardian_set_index, guardian_addr, acc, guardian_data, signature_set, txs, txs_2, txs_2_1, tx, ixs, transaction_1, blockhash_1, signed_1, txid_1, e_2_1, ix, transaction, blockhash, signed, txid;
        var e_2, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, importCoreWasm()];
                case 1:
                    _a = _d.sent(), guardian_set_address = _a.guardian_set_address, parse_guardian_set = _a.parse_guardian_set, parse_vaa = _a.parse_vaa, post_vaa_ix = _a.post_vaa_ix, verify_signatures_ix = _a.verify_signatures_ix;
                    guardian_set_index = parse_vaa(new Uint8Array(vaa)).guardian_set_index;
                    guardian_addr = new PublicKey(guardian_set_address(bridge_id, guardian_set_index));
                    return [4 /*yield*/, connection.getAccountInfo(guardian_addr)];
                case 2:
                    acc = _d.sent();
                    if ((acc === null || acc === void 0 ? void 0 : acc.data) === undefined) {
                        return [2 /*return*/];
                    }
                    guardian_data = parse_guardian_set(new Uint8Array(acc === null || acc === void 0 ? void 0 : acc.data));
                    signature_set = Keypair.generate();
                    txs = verify_signatures_ix(bridge_id, payer, guardian_set_index, guardian_data, signature_set.publicKey.toString(), vaa);
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 11, 12, 13]);
                    txs_2 = __values(txs), txs_2_1 = txs_2.next();
                    _d.label = 4;
                case 4:
                    if (!!txs_2_1.done) return [3 /*break*/, 10];
                    tx = txs_2_1.value;
                    ixs = tx.map(function (v) {
                        return ixFromRust(v);
                    });
                    transaction_1 = (_c = new Transaction()).add.apply(_c, __spreadArray([], __read(ixs)));
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 5:
                    blockhash_1 = (_d.sent()).blockhash;
                    transaction_1.recentBlockhash = blockhash_1;
                    transaction_1.feePayer = new PublicKey(payer);
                    transaction_1.partialSign(signature_set);
                    return [4 /*yield*/, signTransaction(transaction_1)];
                case 6:
                    signed_1 = _d.sent();
                    return [4 /*yield*/, connection.sendRawTransaction(signed_1.serialize())];
                case 7:
                    txid_1 = _d.sent();
                    return [4 /*yield*/, connection.confirmTransaction(txid_1)];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9:
                    txs_2_1 = txs_2.next();
                    return [3 /*break*/, 4];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_2_1 = _d.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (txs_2_1 && !txs_2_1.done && (_b = txs_2.return)) _b.call(txs_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 13:
                    ix = ixFromRust(post_vaa_ix(bridge_id, payer, signature_set.publicKey.toString(), vaa));
                    transaction = new Transaction().add(ix);
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 14:
                    blockhash = (_d.sent()).blockhash;
                    transaction.recentBlockhash = blockhash;
                    transaction.feePayer = new PublicKey(payer);
                    return [4 /*yield*/, signTransaction(transaction)];
                case 15:
                    signed = _d.sent();
                    return [4 /*yield*/, connection.sendRawTransaction(signed.serialize())];
                case 16:
                    txid = _d.sent();
                    return [4 /*yield*/, connection.confirmTransaction(txid)];
                case 17:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
