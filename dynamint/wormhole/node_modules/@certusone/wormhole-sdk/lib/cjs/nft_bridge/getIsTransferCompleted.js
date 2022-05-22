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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsTransferCompletedSolana = exports.getIsTransferCompletedTerra = exports.getIsTransferCompletedEth = void 0;
var ethers_contracts_1 = require("../ethers-contracts");
var bridge_1 = require("../bridge");
var wasm_1 = require("../solana/wasm");
var web3_js_1 = require("@solana/web3.js");
var axios_1 = __importDefault(require("axios"));
var _1 = require(".");
var __1 = require("..");
function getIsTransferCompletedEth(nftBridgeAddress, provider, signedVAA) {
    return __awaiter(this, void 0, void 0, function () {
        var nftBridge, signedVAAHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nftBridge = ethers_contracts_1.NFTBridge__factory.connect(nftBridgeAddress, provider);
                    return [4 /*yield*/, bridge_1.getSignedVAAHash(signedVAA)];
                case 1:
                    signedVAAHash = _a.sent();
                    return [4 /*yield*/, nftBridge.isTransferCompleted(signedVAAHash)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getIsTransferCompletedEth = getIsTransferCompletedEth;
function getIsTransferCompletedTerra(nftBridgeAddress, signedVAA, client, gasPriceUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var msg, gasPrices, account, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _1.redeemOnTerra(nftBridgeAddress, __1.TERRA_REDEEMED_CHECK_WALLET_ADDRESS, signedVAA)];
                case 1:
                    msg = _a.sent();
                    return [4 /*yield*/, axios_1.default.get(gasPriceUrl).then(function (result) { return result.data; })];
                case 2:
                    gasPrices = _a.sent();
                    return [4 /*yield*/, client.auth.accountInfo(__1.TERRA_REDEEMED_CHECK_WALLET_ADDRESS)];
                case 3:
                    account = _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, client.tx.estimateFee([
                            {
                                sequenceNumber: account.getSequenceNumber(),
                                publicKey: account.getPublicKey(),
                            },
                        ], {
                            msgs: [msg],
                            memo: "already redeemed calculation",
                            feeDenoms: ["uluna"],
                            gasPrices: gasPrices,
                        })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    // redeemed if the VAA was already executed
                    return [2 /*return*/, e_1.response.data.message.includes("VaaAlreadyExecuted")];
                case 7: return [2 /*return*/, false];
            }
        });
    });
}
exports.getIsTransferCompletedTerra = getIsTransferCompletedTerra;
function getIsTransferCompletedSolana(nftBridgeAddress, signedVAA, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var claim_address, claimAddress, claimInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wasm_1.importCoreWasm()];
                case 1:
                    claim_address = (_a.sent()).claim_address;
                    return [4 /*yield*/, claim_address(nftBridgeAddress, signedVAA)];
                case 2:
                    claimAddress = _a.sent();
                    return [4 /*yield*/, connection.getAccountInfo(new web3_js_1.PublicKey(claimAddress), "confirmed")];
                case 3:
                    claimInfo = _a.sent();
                    return [2 /*return*/, !!claimInfo];
            }
        });
    });
}
exports.getIsTransferCompletedSolana = getIsTransferCompletedSolana;
