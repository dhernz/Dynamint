"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNativeId = exports.isNativeDenom = exports.isNativeTerra = exports.humanAddress = exports.canonicalAddress = void 0;
var bytes_1 = require("@ethersproject/bytes");
var bech32_1 = require("bech32");
function canonicalAddress(humanAddress) {
    return new Uint8Array(bech32_1.bech32.fromWords(bech32_1.bech32.decode(humanAddress).words));
}
exports.canonicalAddress = canonicalAddress;
function humanAddress(canonicalAddress) {
    return bech32_1.bech32.encode("terra", bech32_1.bech32.toWords(canonicalAddress));
}
exports.humanAddress = humanAddress;
// from https://github.com/terra-money/station/blob/dca7de43958ce075c6e46605622203b9859b0e14/src/lib/utils/is.ts#L12
var isNativeTerra = function (string) {
    if (string === void 0) { string = ""; }
    return string.startsWith("u") && string.length === 4;
};
exports.isNativeTerra = isNativeTerra;
// from https://github.com/terra-money/station/blob/dca7de43958ce075c6e46605622203b9859b0e14/src/lib/utils/is.ts#L20
var isNativeDenom = function (string) {
    if (string === void 0) { string = ""; }
    return exports.isNativeTerra(string) || string === "uluna";
};
exports.isNativeDenom = isNativeDenom;
function buildNativeId(denom) {
    var bytes = [];
    for (var i = 0; i < denom.length; i++) {
        bytes.push(denom.charCodeAt(i));
    }
    var padded = bytes_1.zeroPad(new Uint8Array(bytes), 32);
    padded[0] = 1;
    return padded;
}
exports.buildNativeId = buildNativeId;
