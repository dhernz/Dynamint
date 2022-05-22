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
import { LogicSigAccount } from "algosdk";
import { id } from "ethers/lib/utils";
import { hexToUint8Array } from "../utils";
import { encodeHex } from "./BigVarint";
var TmplSig = /** @class */ (function () {
    function TmplSig(algoClient) {
        this.algoClient = algoClient;
        this.sourceHash = "";
        this.bytecode = new Uint8Array();
    }
    TmplSig.prototype.compile = function (source) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = id(source);
                        if (!(hash !== this.sourceHash)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.algoClient.compile(source).do()];
                    case 1:
                        response = _a.sent();
                        this.bytecode = new Uint8Array(Buffer.from(response.result, "base64"));
                        this.sourceHash = hash;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Populate data in the TEAL source and return the LogicSig object based on the resulting compiled bytecode.
     * @param data The data to populate fields with.
     * @notes emitterId must be prefixed with '0x'. appAddress must be decoded with algoSDK and prefixed with '0x'.
     * @returns A LogicSig object.
     */
    TmplSig.prototype.populate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var byteString;
            return __generator(this, function (_a) {
                byteString = [
                    "0620010181",
                    encodeHex(data.addrIdx),
                    "4880",
                    encodeHex(BigInt(data.emitterId.length / 2)),
                    data.emitterId,
                    "483110810612443119221244311881",
                    encodeHex(data.appId),
                    "1244312080",
                    encodeHex(BigInt(data.appAddress.length / 2)),
                    data.appAddress,
                    "124431018100124431093203124431153203124422",
                ].join("");
                this.bytecode = hexToUint8Array(byteString);
                return [2 /*return*/, new LogicSigAccount(this.bytecode)];
            });
        });
    };
    return TmplSig;
}());
export { TmplSig };
