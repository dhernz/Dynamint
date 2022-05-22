"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeBigIntToNumber = void 0;
function safeBigIntToNumber(b) {
    if (b < BigInt(Number.MIN_SAFE_INTEGER) ||
        b > BigInt(Number.MAX_SAFE_INTEGER)) {
        throw new Error("integer is unsafe");
    }
    return Number(b);
}
exports.safeBigIntToNumber = safeBigIntToNumber;
