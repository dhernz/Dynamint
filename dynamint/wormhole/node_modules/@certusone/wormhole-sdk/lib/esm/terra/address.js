import { zeroPad } from "@ethersproject/bytes";
import { bech32 } from "bech32";
export function canonicalAddress(humanAddress) {
    return new Uint8Array(bech32.fromWords(bech32.decode(humanAddress).words));
}
export function humanAddress(canonicalAddress) {
    return bech32.encode("terra", bech32.toWords(canonicalAddress));
}
// from https://github.com/terra-money/station/blob/dca7de43958ce075c6e46605622203b9859b0e14/src/lib/utils/is.ts#L12
export var isNativeTerra = function (string) {
    if (string === void 0) { string = ""; }
    return string.startsWith("u") && string.length === 4;
};
// from https://github.com/terra-money/station/blob/dca7de43958ce075c6e46605622203b9859b0e14/src/lib/utils/is.ts#L20
export var isNativeDenom = function (string) {
    if (string === void 0) { string = ""; }
    return isNativeTerra(string) || string === "uluna";
};
export function buildNativeId(denom) {
    var bytes = [];
    for (var i = 0; i < denom.length; i++) {
        bytes.push(denom.charCodeAt(i));
    }
    var padded = zeroPad(new Uint8Array(bytes), 32);
    padded[0] = 1;
    return padded;
}
