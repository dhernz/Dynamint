import { BigNumber } from "ethers";
import { Implementation__factory } from "../ethers-contracts";
export function parseSequenceFromLogEth(receipt, bridgeAddress) {
    // TODO: dangerous!(?)
    var bridgeLog = receipt.logs.filter(function (l) {
        return l.address === bridgeAddress;
    })[0];
    var sequence = Implementation__factory.createInterface().parseLog(bridgeLog).args.sequence;
    return sequence.toString();
}
export function parseSequencesFromLogEth(receipt, bridgeAddress) {
    // TODO: dangerous!(?)
    var bridgeLogs = receipt.logs.filter(function (l) {
        return l.address === bridgeAddress;
    });
    return bridgeLogs.map(function (bridgeLog) {
        var sequence = Implementation__factory.createInterface().parseLog(bridgeLog).args.sequence;
        return sequence.toString();
    });
}
export function parseSequenceFromLogTerra(info) {
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
export function parseSequencesFromLogTerra(info) {
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
var SOLANA_SEQ_LOG = "Program log: Sequence: ";
export function parseSequenceFromLogSolana(info) {
    var _a, _b, _c, _d;
    // TODO: better parsing, safer
    var sequence = (_d = (_c = (_b = (_a = info.meta) === null || _a === void 0 ? void 0 : _a.logMessages) === null || _b === void 0 ? void 0 : _b.filter(function (msg) { return msg.startsWith(SOLANA_SEQ_LOG); })) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.replace(SOLANA_SEQ_LOG, "");
    if (!sequence) {
        throw new Error("sequence not found");
    }
    return sequence.toString();
}
export function parseSequencesFromLogSolana(info) {
    var _a, _b;
    // TODO: better parsing, safer
    return (_b = (_a = info.meta) === null || _a === void 0 ? void 0 : _a.logMessages) === null || _b === void 0 ? void 0 : _b.filter(function (msg) { return msg.startsWith(SOLANA_SEQ_LOG); }).map(function (msg) { return msg.replace(SOLANA_SEQ_LOG, ""); });
}
export function parseSequenceFromLogAlgorand(result) {
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
                sequence = BigNumber.from(txn.logs[0].slice(0, 8)).toString();
            }
        });
    }
    return sequence;
}
