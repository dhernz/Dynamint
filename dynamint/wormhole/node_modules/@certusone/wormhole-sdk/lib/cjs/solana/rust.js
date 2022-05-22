"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ixFromRust = void 0;
var web3_js_1 = require("@solana/web3.js");
// begin from clients\solana\main.ts
function ixFromRust(data) {
    var keys = data.accounts.map(accountMetaFromRust);
    return new web3_js_1.TransactionInstruction({
        programId: new web3_js_1.PublicKey(data.program_id),
        data: Buffer.from(data.data),
        keys: keys,
    });
}
exports.ixFromRust = ixFromRust;
function accountMetaFromRust(meta) {
    return {
        pubkey: new web3_js_1.PublicKey(meta.pubkey),
        isSigner: meta.is_signer,
        isWritable: meta.is_writable,
    };
}
// end from clients\solana\main.ts
