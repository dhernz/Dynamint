"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTransferPayload = exports.parseNFTPayload = exports.METADATA_REPLACE = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
exports.METADATA_REPLACE = new RegExp("\u0000", "g");
// TODO: remove `as ChainId` in next minor version as we can't ensure it will match our type definition
// note: actual first byte is message type
//     0   [u8; 32] token_address
//     32  u16      token_chain
//     34  [u8; 32] symbol
//     66  [u8; 32] name
//     98  u256     tokenId
//     130 u8       uri_len
//     131 [u8;len] uri
//     ?   [u8; 32] recipient
//     ?   u16      recipient_chain
var parseNFTPayload = function (arr) {
    var originAddress = arr.slice(1, 1 + 32).toString("hex");
    var originChain = arr.readUInt16BE(33);
    var symbol = Buffer.from(arr.slice(35, 35 + 32))
        .toString("utf8")
        .replace(exports.METADATA_REPLACE, "");
    var name = Buffer.from(arr.slice(67, 67 + 32))
        .toString("utf8")
        .replace(exports.METADATA_REPLACE, "");
    var tokenId = bignumber_1.BigNumber.from(arr.slice(99, 99 + 32));
    var uri_len = arr.readUInt8(131);
    var uri = Buffer.from(arr.slice(132, 132 + uri_len))
        .toString("utf8")
        .replace(exports.METADATA_REPLACE, "");
    var target_offset = 132 + uri_len;
    var targetAddress = arr
        .slice(target_offset, target_offset + 32)
        .toString("hex");
    var targetChain = arr.readUInt16BE(target_offset + 32);
    return {
        originAddress: originAddress,
        originChain: originChain,
        symbol: symbol,
        name: name,
        tokenId: tokenId,
        uri: uri,
        targetAddress: targetAddress,
        targetChain: targetChain,
    };
};
exports.parseNFTPayload = parseNFTPayload;
//     0   u256     amount
//     32  [u8; 32] token_address
//     64  u16      token_chain
//     66  [u8; 32] recipient
//     98  u16      recipient_chain
//     100 u256     fee
var parseTransferPayload = function (arr) { return ({
    amount: bignumber_1.BigNumber.from(arr.slice(1, 1 + 32)).toBigInt(),
    originAddress: arr.slice(33, 33 + 32).toString("hex"),
    originChain: arr.readUInt16BE(65),
    targetAddress: arr.slice(67, 67 + 32).toString("hex"),
    targetChain: arr.readUInt16BE(99),
    fee: bignumber_1.BigNumber.from(arr.slice(101, 101 + 32)).toBigInt(),
}); };
exports.parseTransferPayload = parseTransferPayload;
//This returns a corrected amount, which accounts for the difference between the VAA
//decimals, and the decimals of the asset.
// const normalizeVaaAmount = (
//   amount: bigint,
//   assetDecimals: number
// ): bigint => {
//   const MAX_VAA_DECIMALS = 8;
//   if (assetDecimals <= MAX_VAA_DECIMALS) {
//     return amount;
//   }
//   const decimalStringVaa = formatUnits(amount, MAX_VAA_DECIMALS);
//   const normalizedAmount = parseUnits(decimalStringVaa, assetDecimals);
//   const normalizedBigInt = BigInt(truncate(normalizedAmount.toString(), 0));
//   return normalizedBigInt;
// };
// function truncate(str: string, maxDecimalDigits: number) {
//   if (str.includes(".")) {
//     const parts = str.split(".");
//     return parts[0] + "." + parts[1].slice(0, maxDecimalDigits);
//   }
//   return str;
// }
