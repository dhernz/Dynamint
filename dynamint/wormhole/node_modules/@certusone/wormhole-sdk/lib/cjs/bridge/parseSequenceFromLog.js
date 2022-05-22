"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSequenceFromLogAlgorand = exports.parseSequencesFromLogSolana = exports.parseSequenceFromLogSolana = exports.parseSequencesFromLogTerra = exports.parseSequenceFromLogTerra = exports.parseSequencesFromLogEth = exports.parseSequenceFromLogEth = void 0;
var ethers_1 = require("ethers");
var ethers_contracts_1 = require("../ethers-contracts");
function parseSequenceFromLogEth(receipt, bridgeAddress) {
    // TODO: dangerous!(?)
    var bridgeLog = receipt.logs.filter(function (l) {
        return l.address === bridgeAddress;
    })[0];
    var sequence = ethers_contracts_1.Implementation__factory.createInterface().parseLog(bridgeLog).args.sequence;
    return sequence.toString();
}
exports.parseSequenceFromLogEth = parseSequenceFromLogEth;
function parseSequencesFromLogEth(receipt, bridgeAddress) {
    // TODO: dangerous!(?)
    var bridgeLogs = receipt.logs.filter(function (l) {
        return l.address === bridgeAddress;
    });
    return bridgeLogs.map(function (bridgeLog) {
        var sequence = ethers_contracts_1.Implementation__factory.createInterface().parseLog(bridgeLog).args.sequence;
        return sequence.toString();
    });
}
exports.parseSequencesFromLogEth = parseSequencesFromLogEth;
function parseSequenceFromLogTerra(info) {
    // Scan for the Sequence attribute in all the outputs of the transaction.
    // TODO: Make this not horrible.
    var sequence = "";
    var jsonLog = JSON.parse(info.raw_log);
    jsonLog.map(function (row) {
        row.events.map(function (event) {
            event.attributes.map(function (attribute) {
                if (attribute.key === "message.sequence") {
                    sequence = attribute.value;
                }
            });
        });
    });
    return sequence.toString();
}
exports.parseSequenceFromLogTerra = parseSequenceFromLogTerra;
function parseSequencesFromLogTerra(info) {
    // Scan for the Sequence attribute in all the outputs of the transaction.
    // TODO: Make this not horrible.
    var sequences = [];
    var jsonLog = JSON.parse(info.raw_log);
    jsonLog.map(function (row) {
        row.events.map(function (event) {
            event.attributes.map(function (attribute) {
                if (attribute.key === "message.sequence") {
                    sequences.push(attribute.value.toString());
                }
            });
        });
    });
    return sequences;
}
exports.parseSequencesFromLogTerra = parseSequencesFromLogTerra;
var SOLANA_SEQ_LOG = "Program log: Sequence: ";
function parseSequenceFromLogSolana(info) {
    var _a, _b, _c, _d;
    // TODO: better parsing, safer
    var sequence = (_d = (_c = (_b = (_a = info.meta) === null || _a === void 0 ? void 0 : _a.logMessages) === null || _b === void 0 ? void 0 : _b.filter(function (msg) { return msg.startsWith(SOLANA_SEQ_LOG); })) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.replace(SOLANA_SEQ_LOG, "");
    if (!sequence) {
        throw new Error("sequence not found");
    }
    return sequence.toString();
}
exports.parseSequenceFromLogSolana = parseSequenceFromLogSolana;
function parseSequencesFromLogSolana(info) {
    var _a, _b;
    // TODO: better parsing, safer
    return (_b = (_a = info.meta) === null || _a === void 0 ? void 0 : _a.logMessages) === null || _b === void 0 ? void 0 : _b.filter(function (msg) { return msg.startsWith(SOLANA_SEQ_LOG); }).map(function (msg) { return msg.replace(SOLANA_SEQ_LOG, ""); });
}
exports.parseSequencesFromLogSolana = parseSequencesFromLogSolana;
function parseSequenceFromLogAlgorand(result) {
    var sequence = "";
    if (result["inner-txns"]) {
        var innerTxns = result["inner-txns"];
        var iTxn = /** @class */ (function () {
            function iTxn() {
            }
            return iTxn;
        }());
        innerTxns.forEach(function (txn) {
            if (txn.logs) {
                sequence = ethers_1.BigNumber.from(txn.logs[0].slice(0, 8)).toString();
            }
        });
    }
    return sequence;
}
exports.parseSequenceFromLogAlgorand = parseSequenceFromLogAlgorand;
