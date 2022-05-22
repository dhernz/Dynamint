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
exports.getEmitterAddressAlgorand = exports.getEmitterAddressTerra = exports.getEmitterAddressSolana = exports.getEmitterAddressEth = void 0;
var web3_js_1 = require("@solana/web3.js");
var algosdk_1 = require("algosdk");
var bech32_1 = require("bech32");
var utils_1 = require("ethers/lib/utils");
var wasm_1 = require("../solana/wasm");
var utils_2 = require("../utils");
function getEmitterAddressEth(contractAddress) {
    return Buffer.from(utils_1.zeroPad(utils_1.arrayify(contractAddress), 32)).toString("hex");
}
exports.getEmitterAddressEth = getEmitterAddressEth;
function getEmitterAddressSolana(programAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var emitter_address;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wasm_1.importTokenWasm()];
                case 1:
                    emitter_address = (_a.sent()).emitter_address;
                    return [2 /*return*/, Buffer.from(utils_1.zeroPad(new web3_js_1.PublicKey(emitter_address(programAddress)).toBytes(), 32)).toString("hex")];
            }
        });
    });
}
exports.getEmitterAddressSolana = getEmitterAddressSolana;
function getEmitterAddressTerra(programAddress) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Buffer.from(utils_1.zeroPad(bech32_1.bech32.fromWords(bech32_1.bech32.decode(programAddress).words), 32)).toString("hex")];
        });
    });
}
exports.getEmitterAddressTerra = getEmitterAddressTerra;
function getEmitterAddressAlgorand(appId) {
    var appAddr = algosdk_1.getApplicationAddress(appId);
    var decAppAddr = algosdk_1.decodeAddress(appAddr).publicKey;
    var aa = utils_2.uint8ArrayToHex(decAppAddr);
    return aa;
}
exports.getEmitterAddressAlgorand = getEmitterAddressAlgorand;
