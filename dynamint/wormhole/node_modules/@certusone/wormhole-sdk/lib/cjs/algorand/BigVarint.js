"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encodeHex = exports.encode = exports.encodingLength = void 0;
// Forever grateful to https://github.com/joeltg/big-varint/blob/main/src/unsigned.ts
var LIMIT = BigInt(0x7f);
function encodingLength(value) {
    var i = 0;
    for (; value >= BigInt(0x80); i++) {
        value >>= BigInt(7);
    }
    return i + 1;
}
exports.encodingLength = encodingLength;
function encode(i, buffer, byteOffset) {
    if (i < BigInt(0)) {
        throw new RangeError("value must be unsigned");
    }
    var byteLength = encodingLength(i);
    buffer = buffer || new ArrayBuffer(byteLength);
    byteOffset = byteOffset || 0;
    if (buffer.byteLength < byteOffset + byteLength) {
        throw new RangeError("the buffer is too small to encode the number at the offset");
    }
    var array = new Uint8Array(buffer, byteOffset);
    var offset = 0;
    while (LIMIT < i) {
        array[offset++] = Number(i & LIMIT) | 0x80;
        i >>= BigInt(7);
    }
    array[offset] = Number(i);
    return array;
}
exports.encode = encode;
function encodeHex(i, buffer, byteOffset) {
    return Buffer.from(encode(i, buffer, byteOffset)).toString("hex");
}
exports.encodeHex = encodeHex;
function decode(data, offset) {
    if (offset === void 0) { offset = 0; }
    var i = BigInt(0);
    var n = 0;
    var b;
    do {
        b = data[offset + n];
        if (b === undefined) {
            throw new RangeError("offset out of range");
        }
        i += BigInt(b & 0x7f) << BigInt(n * 7);
        n++;
    } while (0x80 <= b);
    return i;
}
exports.decode = decode;
