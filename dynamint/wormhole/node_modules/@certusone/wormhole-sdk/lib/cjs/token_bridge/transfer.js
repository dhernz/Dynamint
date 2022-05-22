"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.transferFromAlgorand = exports.transferFromSolana = exports.transferNativeSol = exports.transferFromTerra = exports.transferFromEthNative = exports.transferFromEth = exports.approveEth = exports.getAllowanceEth = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var terra_js_1 = require("@terra-money/terra.js");
var algosdk_1 = require("algosdk");
var __1 = require("..");
var algorand_1 = require("../algorand");
var bridge_1 = require("../bridge");
var ethers_contracts_1 = require("../ethers-contracts");
var solana_1 = require("../solana");
var wasm_1 = require("../solana/wasm");
var utils_1 = require("../utils");
var bigint_1 = require("../utils/bigint");
function getAllowanceEth(tokenBridgeAddress, tokenAddress, signer) {
    return __awaiter(this, void 0, void 0, function () {
        var token, signerAddress, allowance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = ethers_contracts_1.TokenImplementation__factory.connect(tokenAddress, signer);
                    return [4 /*yield*/, signer.getAddress()];
                case 1:
                    signerAddress = _a.sent();
                    return [4 /*yield*/, token.allowance(signerAddress, tokenBridgeAddress)];
                case 2:
                    allowance = _a.sent();
                    return [2 /*return*/, allowance];
            }
        });
    });
}
exports.getAllowanceEth = getAllowanceEth;
function approveEth(tokenBridgeAddress, tokenAddress, signer, amount, overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = ethers_contracts_1.TokenImplementation__factory.connect(tokenAddress, signer);
                    return [4 /*yield*/, token.approve(tokenBridgeAddress, amount, overrides)];
                case 1: return [4 /*yield*/, (_a.sent()).wait()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.approveEth = approveEth;
function transferFromEth(tokenBridgeAddress, signer, tokenAddress, amount, recipientChain, recipientAddress, relayerFee, overrides) {
    if (relayerFee === void 0) { relayerFee = 0; }
    if (overrides === void 0) { overrides = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var recipientChainId, bridge, v, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recipientChainId = utils_1.coalesceChainId(recipientChain);
                    bridge = ethers_contracts_1.Bridge__factory.connect(tokenBridgeAddress, signer);
                    return [4 /*yield*/, bridge.transferTokens(tokenAddress, amount, recipientChainId, recipientAddress, relayerFee, utils_1.createNonce(), overrides)];
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
exports.transferFromEth = transferFromEth;
function transferFromEthNative(tokenBridgeAddress, signer, amount, recipientChain, recipientAddress, relayerFee, overrides) {
    if (relayerFee === void 0) { relayerFee = 0; }
    if (overrides === void 0) { overrides = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var recipientChainId, bridge, v, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recipientChainId = utils_1.coalesceChainId(recipientChain);
                    bridge = ethers_contracts_1.Bridge__factory.connect(tokenBridgeAddress, signer);
                    return [4 /*yield*/, bridge.wrapAndTransferETH(recipientChainId, recipientAddress, relayerFee, utils_1.createNonce(), __assign(__assign({}, overrides), { value: amount }))];
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
exports.transferFromEthNative = transferFromEthNative;
function transferFromTerra(walletAddress, tokenBridgeAddress, tokenAddress, amount, recipientChain, recipientAddress, relayerFee) {
    if (relayerFee === void 0) { relayerFee = "0"; }
    return __awaiter(this, void 0, void 0, function () {
        var recipientChainId, nonce, isNativeAsset;
        var _a;
        return __generator(this, function (_b) {
            recipientChainId = utils_1.coalesceChainId(recipientChain);
            nonce = Math.round(Math.random() * 100000);
            isNativeAsset = __1.isNativeDenom(tokenAddress);
            return [2 /*return*/, isNativeAsset
                    ? [
                        new terra_js_1.MsgExecuteContract(walletAddress, tokenBridgeAddress, {
                            deposit_tokens: {},
                        }, (_a = {}, _a[tokenAddress] = amount, _a)),
                        new terra_js_1.MsgExecuteContract(walletAddress, tokenBridgeAddress, {
                            initiate_transfer: {
                                asset: {
                                    amount: amount,
                                    info: {
                                        native_token: {
                                            denom: tokenAddress,
                                        },
                                    },
                                },
                                recipient_chain: recipientChainId,
                                recipient: Buffer.from(recipientAddress).toString("base64"),
                                fee: relayerFee,
                                nonce: nonce,
                            },
                        }, {}),
                    ]
                    : [
                        new terra_js_1.MsgExecuteContract(walletAddress, tokenAddress, {
                            increase_allowance: {
                                spender: tokenBridgeAddress,
                                amount: amount,
                                expires: {
                                    never: {},
                                },
                            },
                        }, {}),
                        new terra_js_1.MsgExecuteContract(walletAddress, tokenBridgeAddress, {
                            initiate_transfer: {
                                asset: {
                                    amount: amount,
                                    info: {
                                        token: {
                                            contract_addr: tokenAddress,
                                        },
                                    },
                                },
                                recipient_chain: recipientChainId,
                                recipient: Buffer.from(recipientAddress).toString("base64"),
                                fee: relayerFee,
                                nonce: nonce,
                            },
                        }, {}),
                    ]];
        });
    });
}
exports.transferFromTerra = transferFromTerra;
function transferNativeSol(connection, bridgeAddress, tokenBridgeAddress, payerAddress, amount, targetAddress, targetChain, relayerFee) {
    if (relayerFee === void 0) { relayerFee = BigInt(0); }
    return __awaiter(this, void 0, void 0, function () {
        var rentBalance, mintPublicKey, payerPublicKey, ancillaryKeypair, createAncillaryAccountIx, initialBalanceTransferIx, initAccountIx, _a, transfer_native_ix, approval_authority_address, nonce, transferIx, approvalIx, messageKey, ix, closeAccountIx, blockhash, transaction;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, spl_token_1.Token.getMinBalanceRentForExemptAccount(connection)];
                case 1:
                    rentBalance = _b.sent();
                    mintPublicKey = new web3_js_1.PublicKey(utils_1.WSOL_ADDRESS);
                    payerPublicKey = new web3_js_1.PublicKey(payerAddress);
                    ancillaryKeypair = web3_js_1.Keypair.generate();
                    createAncillaryAccountIx = web3_js_1.SystemProgram.createAccount({
                        fromPubkey: payerPublicKey,
                        newAccountPubkey: ancillaryKeypair.publicKey,
                        lamports: rentBalance,
                        space: spl_token_1.AccountLayout.span,
                        programId: spl_token_1.TOKEN_PROGRAM_ID,
                    });
                    initialBalanceTransferIx = web3_js_1.SystemProgram.transfer({
                        fromPubkey: payerPublicKey,
                        lamports: Number(amount),
                        toPubkey: ancillaryKeypair.publicKey,
                    });
                    return [4 /*yield*/, spl_token_1.Token.createInitAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, mintPublicKey, ancillaryKeypair.publicKey, payerPublicKey)];
                case 2:
                    initAccountIx = _b.sent();
                    return [4 /*yield*/, wasm_1.importTokenWasm()];
                case 3:
                    _a = _b.sent(), transfer_native_ix = _a.transfer_native_ix, approval_authority_address = _a.approval_authority_address;
                    nonce = utils_1.createNonce().readUInt32LE(0);
                    return [4 /*yield*/, solana_1.getBridgeFeeIx(connection, bridgeAddress, payerAddress)];
                case 4:
                    transferIx = _b.sent();
                    approvalIx = spl_token_1.Token.createApproveInstruction(spl_token_1.TOKEN_PROGRAM_ID, ancillaryKeypair.publicKey, new web3_js_1.PublicKey(approval_authority_address(tokenBridgeAddress)), payerPublicKey, //owner
                    [], new spl_token_1.u64(amount.toString(16), 16));
                    messageKey = web3_js_1.Keypair.generate();
                    ix = solana_1.ixFromRust(transfer_native_ix(tokenBridgeAddress, bridgeAddress, payerAddress, messageKey.publicKey.toString(), ancillaryKeypair.publicKey.toString(), utils_1.WSOL_ADDRESS, nonce, amount, relayerFee, targetAddress, utils_1.coalesceChainId(targetChain)));
                    closeAccountIx = spl_token_1.Token.createCloseAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, ancillaryKeypair.publicKey, //account to close
                    payerPublicKey, //Remaining funds destination
                    payerPublicKey, //authority
                    []);
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 5:
                    blockhash = (_b.sent()).blockhash;
                    transaction = new web3_js_1.Transaction();
                    transaction.recentBlockhash = blockhash;
                    transaction.feePayer = new web3_js_1.PublicKey(payerAddress);
                    transaction.add(createAncillaryAccountIx);
                    transaction.add(initialBalanceTransferIx);
                    transaction.add(initAccountIx);
                    transaction.add(transferIx, approvalIx, ix);
                    transaction.add(closeAccountIx);
                    transaction.partialSign(messageKey);
                    transaction.partialSign(ancillaryKeypair);
                    return [2 /*return*/, transaction];
            }
        });
    });
}
exports.transferNativeSol = transferNativeSol;
function transferFromSolana(connection, bridgeAddress, tokenBridgeAddress, payerAddress, fromAddress, mintAddress, amount, targetAddress, targetChain, originAddress, originChain, fromOwnerAddress, relayerFee) {
    if (relayerFee === void 0) { relayerFee = BigInt(0); }
    return __awaiter(this, void 0, void 0, function () {
        var originChainId, nonce, transferIx, _a, transfer_native_ix, transfer_wrapped_ix, approval_authority_address, approvalIx, messageKey, isSolanaNative, ix, transaction, blockhash;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    originChainId = originChain
                        ? utils_1.coalesceChainId(originChain)
                        : undefined;
                    nonce = utils_1.createNonce().readUInt32LE(0);
                    return [4 /*yield*/, solana_1.getBridgeFeeIx(connection, bridgeAddress, payerAddress)];
                case 1:
                    transferIx = _b.sent();
                    return [4 /*yield*/, wasm_1.importTokenWasm()];
                case 2:
                    _a = _b.sent(), transfer_native_ix = _a.transfer_native_ix, transfer_wrapped_ix = _a.transfer_wrapped_ix, approval_authority_address = _a.approval_authority_address;
                    approvalIx = spl_token_1.Token.createApproveInstruction(spl_token_1.TOKEN_PROGRAM_ID, new web3_js_1.PublicKey(fromAddress), new web3_js_1.PublicKey(approval_authority_address(tokenBridgeAddress)), new web3_js_1.PublicKey(fromOwnerAddress || payerAddress), [], new spl_token_1.u64(amount.toString(16), 16));
                    messageKey = web3_js_1.Keypair.generate();
                    isSolanaNative = originChainId === undefined || originChainId === utils_1.CHAIN_ID_SOLANA;
                    if (!isSolanaNative && !originAddress) {
                        throw new Error("originAddress is required when specifying originChain");
                    }
                    ix = solana_1.ixFromRust(isSolanaNative
                        ? transfer_native_ix(tokenBridgeAddress, bridgeAddress, payerAddress, messageKey.publicKey.toString(), fromAddress, mintAddress, nonce, amount, relayerFee, targetAddress, utils_1.coalesceChainId(targetChain))
                        : transfer_wrapped_ix(tokenBridgeAddress, bridgeAddress, payerAddress, messageKey.publicKey.toString(), fromAddress, fromOwnerAddress || payerAddress, originChainId, // checked by isSolanaNative
                        originAddress, // checked by throw
                        nonce, amount, relayerFee, targetAddress, utils_1.coalesceChainId(targetChain)));
                    transaction = new web3_js_1.Transaction().add(transferIx, approvalIx, ix);
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 3:
                    blockhash = (_b.sent()).blockhash;
                    transaction.recentBlockhash = blockhash;
                    transaction.feePayer = new web3_js_1.PublicKey(payerAddress);
                    transaction.partialSign(messageKey);
                    return [2 /*return*/, transaction];
            }
        });
    });
}
exports.transferFromSolana = transferFromSolana;
/**
 * Transfers an asset from Algorand to a receiver on another chain
 * @param client AlgodV2 client
 * @param tokenBridgeId Application ID of the token bridge
 * @param bridgeId Application ID of the core bridge
 * @param sender Sending account
 * @param assetId Asset index
 * @param qty Quantity to transfer
 * @param receiver Receiving account
 * @param chain Reeiving chain
 * @param fee Transfer fee
 * @param payload payload for payload3 transfers
 * @returns Sequence number of confirmation
 */
function transferFromAlgorand(client, tokenBridgeId, bridgeId, senderAddr, assetId, qty, receiver, chain, fee, payload) {
    if (payload === void 0) { payload = null; }
    return __awaiter(this, void 0, void 0, function () {
        var recipientChainId, tokenAddr, applAddr, txs, _a, emitterAddr, emitterOptInTxs, creator, creatorAcctInfo, wormhole, assetInfo, authAddr, params, msgFee, payTxn, bNat, result, _b, payTxn, bOptin, txn, t, accounts, t_1, t_2, args, acTxn;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    recipientChainId = utils_1.coalesceChainId(chain);
                    tokenAddr = algosdk_1.getApplicationAddress(tokenBridgeId);
                    applAddr = bridge_1.getEmitterAddressAlgorand(tokenBridgeId);
                    txs = [];
                    return [4 /*yield*/, algorand_1.optin(client, senderAddr, bridgeId, BigInt(0), applAddr)];
                case 1:
                    _a = _c.sent(), emitterAddr = _a.addr, emitterOptInTxs = _a.txs;
                    txs.push.apply(txs, __spreadArray([], __read(emitterOptInTxs)));
                    wormhole = false;
                    if (!(assetId !== BigInt(0))) return [3 /*break*/, 4];
                    return [4 /*yield*/, client
                            .getAssetByID(bigint_1.safeBigIntToNumber(assetId))
                            .do()];
                case 2:
                    assetInfo = _c.sent();
                    creator = assetInfo["params"]["creator"];
                    return [4 /*yield*/, client.accountInformation(creator).do()];
                case 3:
                    creatorAcctInfo = _c.sent();
                    authAddr = creatorAcctInfo["auth-addr"];
                    if (authAddr === tokenAddr) {
                        wormhole = true;
                    }
                    _c.label = 4;
                case 4: return [4 /*yield*/, client.getTransactionParams().do()];
                case 5:
                    params = _c.sent();
                    return [4 /*yield*/, algorand_1.getMessageFee(client, bridgeId)];
                case 6:
                    msgFee = _c.sent();
                    if (msgFee > 0) {
                        payTxn = algosdk_1.makePaymentTxnWithSuggestedParamsFromObject({
                            from: senderAddr,
                            suggestedParams: params,
                            to: algosdk_1.getApplicationAddress(tokenBridgeId),
                            amount: msgFee,
                        });
                        txs.push({ tx: payTxn, signer: null });
                    }
                    if (!!wormhole) return [3 /*break*/, 8];
                    bNat = Buffer.from("native", "binary").toString("hex");
                    return [4 /*yield*/, algorand_1.optin(client, senderAddr, tokenBridgeId, assetId, bNat)];
                case 7:
                    result = _c.sent();
                    creator = result.addr;
                    txs.push.apply(txs, __spreadArray([], __read(result.txs)));
                    _c.label = 8;
                case 8:
                    _b = assetId !== BigInt(0);
                    if (!_b) return [3 /*break*/, 10];
                    return [4 /*yield*/, algorand_1.assetOptinCheck(client, assetId, creator)];
                case 9:
                    _b = !(_c.sent());
                    _c.label = 10;
                case 10:
                    if (_b) {
                        payTxn = algosdk_1.makePaymentTxnWithSuggestedParamsFromObject({
                            from: senderAddr,
                            to: creator,
                            amount: 100000,
                            suggestedParams: params,
                        });
                        txs.push({ tx: payTxn, signer: null });
                        bOptin = utils_1.textToUint8Array("optin");
                        txn = algosdk_1.makeApplicationCallTxnFromObject({
                            from: senderAddr,
                            appIndex: bigint_1.safeBigIntToNumber(tokenBridgeId),
                            onComplete: algosdk_1.OnApplicationComplete.NoOpOC,
                            appArgs: [bOptin, algosdk_1.bigIntToBytes(assetId, 8)],
                            foreignAssets: [bigint_1.safeBigIntToNumber(assetId)],
                            accounts: [creator],
                            suggestedParams: params,
                        });
                        txn.fee *= 2;
                        txs.push({ tx: txn, signer: null });
                    }
                    t = algosdk_1.makeApplicationCallTxnFromObject({
                        from: senderAddr,
                        appIndex: bigint_1.safeBigIntToNumber(tokenBridgeId),
                        onComplete: algosdk_1.OnApplicationComplete.NoOpOC,
                        appArgs: [utils_1.textToUint8Array("nop")],
                        suggestedParams: params,
                    });
                    txs.push({ tx: t, signer: null });
                    accounts = [];
                    if (assetId === BigInt(0)) {
                        t_1 = algosdk_1.makePaymentTxnWithSuggestedParamsFromObject({
                            from: senderAddr,
                            to: creator,
                            amount: qty,
                            suggestedParams: params,
                        });
                        txs.push({ tx: t_1, signer: null });
                        accounts = [emitterAddr, creator, creator];
                    }
                    else {
                        t_2 = algosdk_1.makeAssetTransferTxnWithSuggestedParamsFromObject({
                            from: senderAddr,
                            to: creator,
                            suggestedParams: params,
                            amount: qty,
                            assetIndex: bigint_1.safeBigIntToNumber(assetId),
                        });
                        txs.push({ tx: t_2, signer: null });
                        accounts = [emitterAddr, creator, creatorAcctInfo["address"]];
                    }
                    args = [
                        utils_1.textToUint8Array("sendTransfer"),
                        algosdk_1.bigIntToBytes(assetId, 8),
                        algosdk_1.bigIntToBytes(qty, 8),
                        utils_1.hexToUint8Array(receiver),
                        algosdk_1.bigIntToBytes(recipientChainId, 8),
                        algosdk_1.bigIntToBytes(fee, 8),
                    ];
                    if (payload != null) {
                        args.push(payload);
                    }
                    acTxn = algosdk_1.makeApplicationCallTxnFromObject({
                        from: senderAddr,
                        appIndex: bigint_1.safeBigIntToNumber(tokenBridgeId),
                        onComplete: algosdk_1.OnApplicationComplete.NoOpOC,
                        appArgs: args,
                        foreignApps: [bigint_1.safeBigIntToNumber(bridgeId)],
                        foreignAssets: [bigint_1.safeBigIntToNumber(assetId)],
                        accounts: accounts,
                        suggestedParams: params,
                    });
                    acTxn.fee *= 2;
                    txs.push({ tx: acTxn, signer: null });
                    return [2 /*return*/, txs];
            }
        });
    });
}
exports.transferFromAlgorand = transferFromAlgorand;
