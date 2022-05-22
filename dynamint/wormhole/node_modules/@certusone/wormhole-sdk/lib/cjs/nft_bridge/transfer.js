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
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferFromTerra = exports.transferFromSolana = exports.transferFromEth = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var terra_js_1 = require("@terra-money/terra.js");
var ethers_contracts_1 = require("../ethers-contracts");
var solana_1 = require("../solana");
var wasm_1 = require("../solana/wasm");
var utils_1 = require("../utils");
function transferFromEth(tokenBridgeAddress, signer, tokenAddress, tokenID, recipientChain, recipientAddress, overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var recipientChainId, token, bridge, v, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recipientChainId = utils_1.coalesceChainId(recipientChain);
                    token = ethers_contracts_1.NFTImplementation__factory.connect(tokenAddress, signer);
                    return [4 /*yield*/, token.approve(tokenBridgeAddress, tokenID, overrides)];
                case 1: return [4 /*yield*/, (_a.sent()).wait()];
                case 2:
                    _a.sent();
                    bridge = ethers_contracts_1.NFTBridge__factory.connect(tokenBridgeAddress, signer);
                    return [4 /*yield*/, bridge.transferNFT(tokenAddress, tokenID, recipientChainId, recipientAddress, utils_1.createNonce(), overrides)];
                case 3:
                    v = _a.sent();
                    return [4 /*yield*/, v.wait()];
                case 4:
                    receipt = _a.sent();
                    return [2 /*return*/, receipt];
            }
        });
    });
}
exports.transferFromEth = transferFromEth;
function transferFromSolana(connection, bridgeAddress, tokenBridgeAddress, payerAddress, fromAddress, mintAddress, targetAddress, targetChain, originAddress, originChain, originTokenId) {
    return __awaiter(this, void 0, void 0, function () {
        var originChainId, nonce, transferIx, _a, transfer_native_ix, transfer_wrapped_ix, approval_authority_address, approvalIx, messageKey, isSolanaNative, ix, transaction, blockhash;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    originChainId = originChain ? utils_1.coalesceChainId(originChain) : undefined;
                    nonce = utils_1.createNonce().readUInt32LE(0);
                    return [4 /*yield*/, solana_1.getBridgeFeeIx(connection, bridgeAddress, payerAddress)];
                case 1:
                    transferIx = _b.sent();
                    return [4 /*yield*/, wasm_1.importNftWasm()];
                case 2:
                    _a = _b.sent(), transfer_native_ix = _a.transfer_native_ix, transfer_wrapped_ix = _a.transfer_wrapped_ix, approval_authority_address = _a.approval_authority_address;
                    approvalIx = spl_token_1.Token.createApproveInstruction(spl_token_1.TOKEN_PROGRAM_ID, new web3_js_1.PublicKey(fromAddress), new web3_js_1.PublicKey(approval_authority_address(tokenBridgeAddress)), new web3_js_1.PublicKey(payerAddress), [], Number(1));
                    messageKey = web3_js_1.Keypair.generate();
                    isSolanaNative = originChain === undefined || originChain === utils_1.CHAIN_ID_SOLANA;
                    if (!isSolanaNative && (!originAddress || !originTokenId)) {
                        throw new Error("originAddress and originTokenId are required when specifying originChain");
                    }
                    ix = solana_1.ixFromRust(isSolanaNative
                        ? transfer_native_ix(tokenBridgeAddress, bridgeAddress, payerAddress, messageKey.publicKey.toString(), fromAddress, mintAddress, nonce, targetAddress, utils_1.coalesceChainId(targetChain))
                        : transfer_wrapped_ix(tokenBridgeAddress, bridgeAddress, payerAddress, messageKey.publicKey.toString(), fromAddress, payerAddress, originChainId, // checked by isSolanaNative
                        originAddress, // checked by throw
                        originTokenId, // checked by throw
                        nonce, targetAddress, utils_1.coalesceChainId(targetChain)));
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
function transferFromTerra(walletAddress, tokenBridgeAddress, tokenAddress, tokenID, recipientChain, recipientAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var recipientChainId, nonce;
        return __generator(this, function (_a) {
            recipientChainId = utils_1.coalesceChainId(recipientChain);
            nonce = Math.round(Math.random() * 100000);
            return [2 /*return*/, [
                    new terra_js_1.MsgExecuteContract(walletAddress, tokenAddress, {
                        approve: {
                            spender: tokenBridgeAddress,
                            token_id: tokenID,
                        },
                    }, {}),
                    new terra_js_1.MsgExecuteContract(walletAddress, tokenBridgeAddress, {
                        initiate_transfer: {
                            contract_addr: tokenAddress,
                            token_id: tokenID,
                            recipient_chain: recipientChainId,
                            recipient: Buffer.from(recipientAddress).toString("base64"),
                            nonce: nonce,
                        },
                    }, {}),
                ]];
        });
    });
}
exports.transferFromTerra = transferFromTerra;
