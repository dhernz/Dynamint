/**
 *
 * Copyright 2022 Wormhole Project Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { ChainId } from "../utils";
export declare class TestLib {
    zeroBytes: string;
    singleGuardianKey: string[];
    singleGuardianPrivKey: string[];
    constructor();
    hexStringToUint8Array(hs: string): Uint8Array;
    uint8ArrayToHexString(arr: Uint8Array, add0x: boolean): string;
    guardianKeys: string[];
    guardianPrivKeys: string[];
    encoder(type: string, val: any): any;
    ord(c: any): any;
    genGuardianSetUpgrade(signers: any, guardianSet: number, targetSet: number, nonce: number, seq: number, guardianKeys: string[]): string;
    genGSetFee(signers: any, guardianSet: number, nonce: number, seq: number, amt: number): string;
    genGFeePayout(signers: any, guardianSet: number, nonce: number, seq: number, amt: number, dest: Uint8Array): string;
    getTokenEmitter(chain: number): string;
    getNftEmitter(chain: ChainId): string;
    genRegisterChain(signers: any, guardianSet: number, nonce: number, seq: number, chain: string): string;
    genAssetMeta(signers: any, guardianSet: number, nonce: number, seq: number, tokenAddress: string, chain: number, decimals: number, symbol: string, name: string): string;
    genTransfer(signers: any, guardianSet: number, nonce: number, seq: number, amount: number, tokenAddress: string, tokenChain: number, toAddress: string, toChain: number, fee: number): string;
    /**
     * Create a packed and signed VAA for testing.
     * See https://github.com/certusone/wormhole/blob/dev.v2/design/0001_generic_message_passing.md
     *
     * @param {} guardianSetIndex  The guardian set index
     * @param {*} signers The list of private keys for signing the VAA
     * @param {*} timestamp The timestamp of VAA
     * @param {*} nonce The nonce.
     * @param {*} emitterChainId The emitter chain identifier
     * @param {*} emitterAddress The emitter chain address, prefixed with 0x
     * @param {*} sequence The sequence.
     * @param {*} consistencyLevel  The reported consistency level
     * @param {*} payload This VAA Payload hex string, prefixed with 0x
     */
    createSignedVAA(guardianSetIndex: number, signers: any, timestamp: number, nonce: number, emitterChainId: number, emitterAddress: string, sequence: number, consistencyLevel: number, payload: string): string;
    zeroPadBytes(value: string, length: number): string;
}
