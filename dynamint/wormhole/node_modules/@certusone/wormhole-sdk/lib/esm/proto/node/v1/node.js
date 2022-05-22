var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import _m0 from "protobufjs/minimal";
import { BrowserHeaders } from "browser-headers";
import { ObservationRequest } from "../../gossip/v1/gossip";
export var protobufPackage = "node.v1";
var baseInjectGovernanceVAARequest = {
    currentSetIndex: 0,
    timestamp: 0,
};
export var InjectGovernanceVAARequest = {
    encode: function (message, writer) {
        var e_1, _a;
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.currentSetIndex !== 0) {
            writer.uint32(8).uint32(message.currentSetIndex);
        }
        try {
            for (var _b = __values(message.messages), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                GovernanceMessage.encode(v, writer.uint32(18).fork()).ldelim();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (message.timestamp !== 0) {
            writer.uint32(24).uint32(message.timestamp);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseInjectGovernanceVAARequest);
        message.messages = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.currentSetIndex = reader.uint32();
                    break;
                case 2:
                    message.messages.push(GovernanceMessage.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.timestamp = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var e_2, _a;
        var message = __assign({}, baseInjectGovernanceVAARequest);
        message.messages = [];
        if (object.currentSetIndex !== undefined &&
            object.currentSetIndex !== null) {
            message.currentSetIndex = Number(object.currentSetIndex);
        }
        else {
            message.currentSetIndex = 0;
        }
        if (object.messages !== undefined && object.messages !== null) {
            try {
                for (var _b = __values(object.messages), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.messages.push(GovernanceMessage.fromJSON(e));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = Number(object.timestamp);
        }
        else {
            message.timestamp = 0;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.currentSetIndex !== undefined &&
            (obj.currentSetIndex = message.currentSetIndex);
        if (message.messages) {
            obj.messages = message.messages.map(function (e) {
                return e ? GovernanceMessage.toJSON(e) : undefined;
            });
        }
        else {
            obj.messages = [];
        }
        message.timestamp !== undefined && (obj.timestamp = message.timestamp);
        return obj;
    },
    fromPartial: function (object) {
        var e_3, _a;
        var message = __assign({}, baseInjectGovernanceVAARequest);
        message.messages = [];
        if (object.currentSetIndex !== undefined &&
            object.currentSetIndex !== null) {
            message.currentSetIndex = object.currentSetIndex;
        }
        else {
            message.currentSetIndex = 0;
        }
        if (object.messages !== undefined && object.messages !== null) {
            try {
                for (var _b = __values(object.messages), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.messages.push(GovernanceMessage.fromPartial(e));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = object.timestamp;
        }
        else {
            message.timestamp = 0;
        }
        return message;
    },
};
var baseGovernanceMessage = { sequence: "0", nonce: 0 };
export var GovernanceMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.sequence !== "0") {
            writer.uint32(16).uint64(message.sequence);
        }
        if (message.nonce !== 0) {
            writer.uint32(24).uint32(message.nonce);
        }
        if (message.guardianSet !== undefined) {
            GuardianSetUpdate.encode(message.guardianSet, writer.uint32(82).fork()).ldelim();
        }
        if (message.contractUpgrade !== undefined) {
            ContractUpgrade.encode(message.contractUpgrade, writer.uint32(90).fork()).ldelim();
        }
        if (message.bridgeRegisterChain !== undefined) {
            BridgeRegisterChain.encode(message.bridgeRegisterChain, writer.uint32(98).fork()).ldelim();
        }
        if (message.bridgeContractUpgrade !== undefined) {
            BridgeUpgradeContract.encode(message.bridgeContractUpgrade, writer.uint32(106).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGovernanceMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    message.sequence = longToString(reader.uint64());
                    break;
                case 3:
                    message.nonce = reader.uint32();
                    break;
                case 10:
                    message.guardianSet = GuardianSetUpdate.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.contractUpgrade = ContractUpgrade.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.bridgeRegisterChain = BridgeRegisterChain.decode(reader, reader.uint32());
                    break;
                case 13:
                    message.bridgeContractUpgrade = BridgeUpgradeContract.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGovernanceMessage);
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = String(object.sequence);
        }
        else {
            message.sequence = "0";
        }
        if (object.nonce !== undefined && object.nonce !== null) {
            message.nonce = Number(object.nonce);
        }
        else {
            message.nonce = 0;
        }
        if (object.guardianSet !== undefined && object.guardianSet !== null) {
            message.guardianSet = GuardianSetUpdate.fromJSON(object.guardianSet);
        }
        else {
            message.guardianSet = undefined;
        }
        if (object.contractUpgrade !== undefined &&
            object.contractUpgrade !== null) {
            message.contractUpgrade = ContractUpgrade.fromJSON(object.contractUpgrade);
        }
        else {
            message.contractUpgrade = undefined;
        }
        if (object.bridgeRegisterChain !== undefined &&
            object.bridgeRegisterChain !== null) {
            message.bridgeRegisterChain = BridgeRegisterChain.fromJSON(object.bridgeRegisterChain);
        }
        else {
            message.bridgeRegisterChain = undefined;
        }
        if (object.bridgeContractUpgrade !== undefined &&
            object.bridgeContractUpgrade !== null) {
            message.bridgeContractUpgrade = BridgeUpgradeContract.fromJSON(object.bridgeContractUpgrade);
        }
        else {
            message.bridgeContractUpgrade = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.sequence !== undefined && (obj.sequence = message.sequence);
        message.nonce !== undefined && (obj.nonce = message.nonce);
        message.guardianSet !== undefined &&
            (obj.guardianSet = message.guardianSet
                ? GuardianSetUpdate.toJSON(message.guardianSet)
                : undefined);
        message.contractUpgrade !== undefined &&
            (obj.contractUpgrade = message.contractUpgrade
                ? ContractUpgrade.toJSON(message.contractUpgrade)
                : undefined);
        message.bridgeRegisterChain !== undefined &&
            (obj.bridgeRegisterChain = message.bridgeRegisterChain
                ? BridgeRegisterChain.toJSON(message.bridgeRegisterChain)
                : undefined);
        message.bridgeContractUpgrade !== undefined &&
            (obj.bridgeContractUpgrade = message.bridgeContractUpgrade
                ? BridgeUpgradeContract.toJSON(message.bridgeContractUpgrade)
                : undefined);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGovernanceMessage);
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence;
        }
        else {
            message.sequence = "0";
        }
        if (object.nonce !== undefined && object.nonce !== null) {
            message.nonce = object.nonce;
        }
        else {
            message.nonce = 0;
        }
        if (object.guardianSet !== undefined && object.guardianSet !== null) {
            message.guardianSet = GuardianSetUpdate.fromPartial(object.guardianSet);
        }
        else {
            message.guardianSet = undefined;
        }
        if (object.contractUpgrade !== undefined &&
            object.contractUpgrade !== null) {
            message.contractUpgrade = ContractUpgrade.fromPartial(object.contractUpgrade);
        }
        else {
            message.contractUpgrade = undefined;
        }
        if (object.bridgeRegisterChain !== undefined &&
            object.bridgeRegisterChain !== null) {
            message.bridgeRegisterChain = BridgeRegisterChain.fromPartial(object.bridgeRegisterChain);
        }
        else {
            message.bridgeRegisterChain = undefined;
        }
        if (object.bridgeContractUpgrade !== undefined &&
            object.bridgeContractUpgrade !== null) {
            message.bridgeContractUpgrade = BridgeUpgradeContract.fromPartial(object.bridgeContractUpgrade);
        }
        else {
            message.bridgeContractUpgrade = undefined;
        }
        return message;
    },
};
var baseInjectGovernanceVAAResponse = {};
export var InjectGovernanceVAAResponse = {
    encode: function (message, writer) {
        var e_4, _a;
        if (writer === void 0) { writer = _m0.Writer.create(); }
        try {
            for (var _b = __values(message.digests), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                writer.uint32(10).bytes(v);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseInjectGovernanceVAAResponse);
        message.digests = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.digests.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var e_5, _a;
        var message = __assign({}, baseInjectGovernanceVAAResponse);
        message.digests = [];
        if (object.digests !== undefined && object.digests !== null) {
            try {
                for (var _b = __values(object.digests), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.digests.push(bytesFromBase64(e));
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        if (message.digests) {
            obj.digests = message.digests.map(function (e) {
                return base64FromBytes(e !== undefined ? e : new Uint8Array());
            });
        }
        else {
            obj.digests = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var e_6, _a;
        var message = __assign({}, baseInjectGovernanceVAAResponse);
        message.digests = [];
        if (object.digests !== undefined && object.digests !== null) {
            try {
                for (var _b = __values(object.digests), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.digests.push(e);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        return message;
    },
};
var baseGuardianSetUpdate = {};
export var GuardianSetUpdate = {
    encode: function (message, writer) {
        var e_7, _a;
        if (writer === void 0) { writer = _m0.Writer.create(); }
        try {
            for (var _b = __values(message.guardians), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                GuardianSetUpdate_Guardian.encode(v, writer.uint32(26).fork()).ldelim();
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGuardianSetUpdate);
        message.guardians = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 3:
                    message.guardians.push(GuardianSetUpdate_Guardian.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var e_8, _a;
        var message = __assign({}, baseGuardianSetUpdate);
        message.guardians = [];
        if (object.guardians !== undefined && object.guardians !== null) {
            try {
                for (var _b = __values(object.guardians), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.guardians.push(GuardianSetUpdate_Guardian.fromJSON(e));
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        if (message.guardians) {
            obj.guardians = message.guardians.map(function (e) {
                return e ? GuardianSetUpdate_Guardian.toJSON(e) : undefined;
            });
        }
        else {
            obj.guardians = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var e_9, _a;
        var message = __assign({}, baseGuardianSetUpdate);
        message.guardians = [];
        if (object.guardians !== undefined && object.guardians !== null) {
            try {
                for (var _b = __values(object.guardians), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.guardians.push(GuardianSetUpdate_Guardian.fromPartial(e));
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
        return message;
    },
};
var baseGuardianSetUpdate_Guardian = { pubkey: "", name: "" };
export var GuardianSetUpdate_Guardian = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.pubkey !== "") {
            writer.uint32(10).string(message.pubkey);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGuardianSetUpdate_Guardian);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pubkey = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGuardianSetUpdate_Guardian);
        if (object.pubkey !== undefined && object.pubkey !== null) {
            message.pubkey = String(object.pubkey);
        }
        else {
            message.pubkey = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.pubkey !== undefined && (obj.pubkey = message.pubkey);
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGuardianSetUpdate_Guardian);
        if (object.pubkey !== undefined && object.pubkey !== null) {
            message.pubkey = object.pubkey;
        }
        else {
            message.pubkey = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        return message;
    },
};
var baseGuardianKey = { unsafeDeterministicKey: false };
export var GuardianKey = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.unsafeDeterministicKey === true) {
            writer.uint32(16).bool(message.unsafeDeterministicKey);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGuardianKey);
        message.data = new Uint8Array();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
                    break;
                case 2:
                    message.unsafeDeterministicKey = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGuardianKey);
        message.data = new Uint8Array();
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        if (object.unsafeDeterministicKey !== undefined &&
            object.unsafeDeterministicKey !== null) {
            message.unsafeDeterministicKey = Boolean(object.unsafeDeterministicKey);
        }
        else {
            message.unsafeDeterministicKey = false;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.unsafeDeterministicKey !== undefined &&
            (obj.unsafeDeterministicKey = message.unsafeDeterministicKey);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGuardianKey);
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = new Uint8Array();
        }
        if (object.unsafeDeterministicKey !== undefined &&
            object.unsafeDeterministicKey !== null) {
            message.unsafeDeterministicKey = object.unsafeDeterministicKey;
        }
        else {
            message.unsafeDeterministicKey = false;
        }
        return message;
    },
};
var baseBridgeRegisterChain = {
    module: "",
    chainId: 0,
    emitterAddress: "",
};
export var BridgeRegisterChain = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.module !== "") {
            writer.uint32(10).string(message.module);
        }
        if (message.chainId !== 0) {
            writer.uint32(16).uint32(message.chainId);
        }
        if (message.emitterAddress !== "") {
            writer.uint32(26).string(message.emitterAddress);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseBridgeRegisterChain);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.module = reader.string();
                    break;
                case 2:
                    message.chainId = reader.uint32();
                    break;
                case 3:
                    message.emitterAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseBridgeRegisterChain);
        if (object.module !== undefined && object.module !== null) {
            message.module = String(object.module);
        }
        else {
            message.module = "";
        }
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = Number(object.chainId);
        }
        else {
            message.chainId = 0;
        }
        if (object.emitterAddress !== undefined && object.emitterAddress !== null) {
            message.emitterAddress = String(object.emitterAddress);
        }
        else {
            message.emitterAddress = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.module !== undefined && (obj.module = message.module);
        message.chainId !== undefined && (obj.chainId = message.chainId);
        message.emitterAddress !== undefined &&
            (obj.emitterAddress = message.emitterAddress);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseBridgeRegisterChain);
        if (object.module !== undefined && object.module !== null) {
            message.module = object.module;
        }
        else {
            message.module = "";
        }
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = object.chainId;
        }
        else {
            message.chainId = 0;
        }
        if (object.emitterAddress !== undefined && object.emitterAddress !== null) {
            message.emitterAddress = object.emitterAddress;
        }
        else {
            message.emitterAddress = "";
        }
        return message;
    },
};
var baseContractUpgrade = { chainId: 0, newContract: "" };
export var ContractUpgrade = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.chainId !== 0) {
            writer.uint32(8).uint32(message.chainId);
        }
        if (message.newContract !== "") {
            writer.uint32(18).string(message.newContract);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseContractUpgrade);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainId = reader.uint32();
                    break;
                case 2:
                    message.newContract = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseContractUpgrade);
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = Number(object.chainId);
        }
        else {
            message.chainId = 0;
        }
        if (object.newContract !== undefined && object.newContract !== null) {
            message.newContract = String(object.newContract);
        }
        else {
            message.newContract = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.chainId !== undefined && (obj.chainId = message.chainId);
        message.newContract !== undefined &&
            (obj.newContract = message.newContract);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseContractUpgrade);
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = object.chainId;
        }
        else {
            message.chainId = 0;
        }
        if (object.newContract !== undefined && object.newContract !== null) {
            message.newContract = object.newContract;
        }
        else {
            message.newContract = "";
        }
        return message;
    },
};
var baseBridgeUpgradeContract = {
    module: "",
    targetChainId: 0,
    newContract: "",
};
export var BridgeUpgradeContract = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.module !== "") {
            writer.uint32(10).string(message.module);
        }
        if (message.targetChainId !== 0) {
            writer.uint32(16).uint32(message.targetChainId);
        }
        if (message.newContract !== "") {
            writer.uint32(26).string(message.newContract);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseBridgeUpgradeContract);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.module = reader.string();
                    break;
                case 2:
                    message.targetChainId = reader.uint32();
                    break;
                case 3:
                    message.newContract = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseBridgeUpgradeContract);
        if (object.module !== undefined && object.module !== null) {
            message.module = String(object.module);
        }
        else {
            message.module = "";
        }
        if (object.targetChainId !== undefined && object.targetChainId !== null) {
            message.targetChainId = Number(object.targetChainId);
        }
        else {
            message.targetChainId = 0;
        }
        if (object.newContract !== undefined && object.newContract !== null) {
            message.newContract = String(object.newContract);
        }
        else {
            message.newContract = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.module !== undefined && (obj.module = message.module);
        message.targetChainId !== undefined &&
            (obj.targetChainId = message.targetChainId);
        message.newContract !== undefined &&
            (obj.newContract = message.newContract);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseBridgeUpgradeContract);
        if (object.module !== undefined && object.module !== null) {
            message.module = object.module;
        }
        else {
            message.module = "";
        }
        if (object.targetChainId !== undefined && object.targetChainId !== null) {
            message.targetChainId = object.targetChainId;
        }
        else {
            message.targetChainId = 0;
        }
        if (object.newContract !== undefined && object.newContract !== null) {
            message.newContract = object.newContract;
        }
        else {
            message.newContract = "";
        }
        return message;
    },
};
var baseFindMissingMessagesRequest = {
    emitterChain: 0,
    emitterAddress: "",
    rpcBackfill: false,
    backfillNodes: "",
};
export var FindMissingMessagesRequest = {
    encode: function (message, writer) {
        var e_10, _a;
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.emitterChain !== 0) {
            writer.uint32(8).uint32(message.emitterChain);
        }
        if (message.emitterAddress !== "") {
            writer.uint32(18).string(message.emitterAddress);
        }
        if (message.rpcBackfill === true) {
            writer.uint32(24).bool(message.rpcBackfill);
        }
        try {
            for (var _b = __values(message.backfillNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                writer.uint32(34).string(v);
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseFindMissingMessagesRequest);
        message.backfillNodes = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.emitterChain = reader.uint32();
                    break;
                case 2:
                    message.emitterAddress = reader.string();
                    break;
                case 3:
                    message.rpcBackfill = reader.bool();
                    break;
                case 4:
                    message.backfillNodes.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var e_11, _a;
        var message = __assign({}, baseFindMissingMessagesRequest);
        message.backfillNodes = [];
        if (object.emitterChain !== undefined && object.emitterChain !== null) {
            message.emitterChain = Number(object.emitterChain);
        }
        else {
            message.emitterChain = 0;
        }
        if (object.emitterAddress !== undefined && object.emitterAddress !== null) {
            message.emitterAddress = String(object.emitterAddress);
        }
        else {
            message.emitterAddress = "";
        }
        if (object.rpcBackfill !== undefined && object.rpcBackfill !== null) {
            message.rpcBackfill = Boolean(object.rpcBackfill);
        }
        else {
            message.rpcBackfill = false;
        }
        if (object.backfillNodes !== undefined && object.backfillNodes !== null) {
            try {
                for (var _b = __values(object.backfillNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.backfillNodes.push(String(e));
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.emitterChain !== undefined &&
            (obj.emitterChain = message.emitterChain);
        message.emitterAddress !== undefined &&
            (obj.emitterAddress = message.emitterAddress);
        message.rpcBackfill !== undefined &&
            (obj.rpcBackfill = message.rpcBackfill);
        if (message.backfillNodes) {
            obj.backfillNodes = message.backfillNodes.map(function (e) { return e; });
        }
        else {
            obj.backfillNodes = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var e_12, _a;
        var message = __assign({}, baseFindMissingMessagesRequest);
        message.backfillNodes = [];
        if (object.emitterChain !== undefined && object.emitterChain !== null) {
            message.emitterChain = object.emitterChain;
        }
        else {
            message.emitterChain = 0;
        }
        if (object.emitterAddress !== undefined && object.emitterAddress !== null) {
            message.emitterAddress = object.emitterAddress;
        }
        else {
            message.emitterAddress = "";
        }
        if (object.rpcBackfill !== undefined && object.rpcBackfill !== null) {
            message.rpcBackfill = object.rpcBackfill;
        }
        else {
            message.rpcBackfill = false;
        }
        if (object.backfillNodes !== undefined && object.backfillNodes !== null) {
            try {
                for (var _b = __values(object.backfillNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.backfillNodes.push(e);
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_12) throw e_12.error; }
            }
        }
        return message;
    },
};
var baseFindMissingMessagesResponse = {
    missingMessages: "",
    firstSequence: "0",
    lastSequence: "0",
};
export var FindMissingMessagesResponse = {
    encode: function (message, writer) {
        var e_13, _a;
        if (writer === void 0) { writer = _m0.Writer.create(); }
        try {
            for (var _b = __values(message.missingMessages), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                writer.uint32(10).string(v);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_13) throw e_13.error; }
        }
        if (message.firstSequence !== "0") {
            writer.uint32(16).uint64(message.firstSequence);
        }
        if (message.lastSequence !== "0") {
            writer.uint32(24).uint64(message.lastSequence);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseFindMissingMessagesResponse);
        message.missingMessages = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.missingMessages.push(reader.string());
                    break;
                case 2:
                    message.firstSequence = longToString(reader.uint64());
                    break;
                case 3:
                    message.lastSequence = longToString(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var e_14, _a;
        var message = __assign({}, baseFindMissingMessagesResponse);
        message.missingMessages = [];
        if (object.missingMessages !== undefined &&
            object.missingMessages !== null) {
            try {
                for (var _b = __values(object.missingMessages), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.missingMessages.push(String(e));
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_14) throw e_14.error; }
            }
        }
        if (object.firstSequence !== undefined && object.firstSequence !== null) {
            message.firstSequence = String(object.firstSequence);
        }
        else {
            message.firstSequence = "0";
        }
        if (object.lastSequence !== undefined && object.lastSequence !== null) {
            message.lastSequence = String(object.lastSequence);
        }
        else {
            message.lastSequence = "0";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        if (message.missingMessages) {
            obj.missingMessages = message.missingMessages.map(function (e) { return e; });
        }
        else {
            obj.missingMessages = [];
        }
        message.firstSequence !== undefined &&
            (obj.firstSequence = message.firstSequence);
        message.lastSequence !== undefined &&
            (obj.lastSequence = message.lastSequence);
        return obj;
    },
    fromPartial: function (object) {
        var e_15, _a;
        var message = __assign({}, baseFindMissingMessagesResponse);
        message.missingMessages = [];
        if (object.missingMessages !== undefined &&
            object.missingMessages !== null) {
            try {
                for (var _b = __values(object.missingMessages), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.missingMessages.push(e);
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_15) throw e_15.error; }
            }
        }
        if (object.firstSequence !== undefined && object.firstSequence !== null) {
            message.firstSequence = object.firstSequence;
        }
        else {
            message.firstSequence = "0";
        }
        if (object.lastSequence !== undefined && object.lastSequence !== null) {
            message.lastSequence = object.lastSequence;
        }
        else {
            message.lastSequence = "0";
        }
        return message;
    },
};
var baseSendObservationRequestRequest = {};
export var SendObservationRequestRequest = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.observationRequest !== undefined) {
            ObservationRequest.encode(message.observationRequest, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSendObservationRequestRequest);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.observationRequest = ObservationRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseSendObservationRequestRequest);
        if (object.observationRequest !== undefined &&
            object.observationRequest !== null) {
            message.observationRequest = ObservationRequest.fromJSON(object.observationRequest);
        }
        else {
            message.observationRequest = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.observationRequest !== undefined &&
            (obj.observationRequest = message.observationRequest
                ? ObservationRequest.toJSON(message.observationRequest)
                : undefined);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseSendObservationRequestRequest);
        if (object.observationRequest !== undefined &&
            object.observationRequest !== null) {
            message.observationRequest = ObservationRequest.fromPartial(object.observationRequest);
        }
        else {
            message.observationRequest = undefined;
        }
        return message;
    },
};
var baseSendObservationRequestResponse = {};
export var SendObservationRequestResponse = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSendObservationRequestResponse);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        var message = __assign({}, baseSendObservationRequestResponse);
        return message;
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    fromPartial: function (_) {
        var message = __assign({}, baseSendObservationRequestResponse);
        return message;
    },
};
var NodePrivilegedServiceClientImpl = /** @class */ (function () {
    function NodePrivilegedServiceClientImpl(rpc) {
        this.rpc = rpc;
        this.InjectGovernanceVAA = this.InjectGovernanceVAA.bind(this);
        this.FindMissingMessages = this.FindMissingMessages.bind(this);
        this.SendObservationRequest = this.SendObservationRequest.bind(this);
    }
    NodePrivilegedServiceClientImpl.prototype.InjectGovernanceVAA = function (request, metadata) {
        return this.rpc.unary(NodePrivilegedServiceInjectGovernanceVAADesc, InjectGovernanceVAARequest.fromPartial(request), metadata);
    };
    NodePrivilegedServiceClientImpl.prototype.FindMissingMessages = function (request, metadata) {
        return this.rpc.unary(NodePrivilegedServiceFindMissingMessagesDesc, FindMissingMessagesRequest.fromPartial(request), metadata);
    };
    NodePrivilegedServiceClientImpl.prototype.SendObservationRequest = function (request, metadata) {
        return this.rpc.unary(NodePrivilegedServiceSendObservationRequestDesc, SendObservationRequestRequest.fromPartial(request), metadata);
    };
    return NodePrivilegedServiceClientImpl;
}());
export { NodePrivilegedServiceClientImpl };
export var NodePrivilegedServiceDesc = {
    serviceName: "node.v1.NodePrivilegedService",
};
export var NodePrivilegedServiceInjectGovernanceVAADesc = {
    methodName: "InjectGovernanceVAA",
    service: NodePrivilegedServiceDesc,
    requestStream: false,
    responseStream: false,
    requestType: {
        serializeBinary: function () {
            return InjectGovernanceVAARequest.encode(this).finish();
        },
    },
    responseType: {
        deserializeBinary: function (data) {
            return __assign(__assign({}, InjectGovernanceVAAResponse.decode(data)), { toObject: function () {
                    return this;
                } });
        },
    },
};
export var NodePrivilegedServiceFindMissingMessagesDesc = {
    methodName: "FindMissingMessages",
    service: NodePrivilegedServiceDesc,
    requestStream: false,
    responseStream: false,
    requestType: {
        serializeBinary: function () {
            return FindMissingMessagesRequest.encode(this).finish();
        },
    },
    responseType: {
        deserializeBinary: function (data) {
            return __assign(__assign({}, FindMissingMessagesResponse.decode(data)), { toObject: function () {
                    return this;
                } });
        },
    },
};
export var NodePrivilegedServiceSendObservationRequestDesc = {
    methodName: "SendObservationRequest",
    service: NodePrivilegedServiceDesc,
    requestStream: false,
    responseStream: false,
    requestType: {
        serializeBinary: function () {
            return SendObservationRequestRequest.encode(this).finish();
        },
    },
    responseType: {
        deserializeBinary: function (data) {
            return __assign(__assign({}, SendObservationRequestResponse.decode(data)), { toObject: function () {
                    return this;
                } });
        },
    },
};
var GrpcWebImpl = /** @class */ (function () {
    function GrpcWebImpl(host, options) {
        this.host = host;
        this.options = options;
    }
    GrpcWebImpl.prototype.unary = function (methodDesc, _request, metadata) {
        var _this = this;
        var _a;
        var request = __assign(__assign({}, _request), methodDesc.requestType);
        var maybeCombinedMetadata = metadata && this.options.metadata
            ? new BrowserHeaders(__assign(__assign({}, (_a = this.options) === null || _a === void 0 ? void 0 : _a.metadata.headersMap), metadata === null || metadata === void 0 ? void 0 : metadata.headersMap))
            : metadata || this.options.metadata;
        return new Promise(function (resolve, reject) {
            grpc.unary(methodDesc, {
                request: request,
                host: _this.host,
                metadata: maybeCombinedMetadata,
                transport: _this.options.transport,
                debug: _this.options.debug,
                onEnd: function (response) {
                    if (response.status === grpc.Code.OK) {
                        resolve(response.message);
                    }
                    else {
                        var err = new Error(response.statusMessage);
                        err.code = response.status;
                        err.metadata = response.trailers;
                        reject(err);
                    }
                },
            });
        });
    };
    return GrpcWebImpl;
}());
export { GrpcWebImpl };
var globalThis = (function () {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
var atob = globalThis.atob ||
    (function (b64) { return globalThis.Buffer.from(b64, "base64").toString("binary"); });
function bytesFromBase64(b64) {
    var bin = atob(b64);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
var btoa = globalThis.btoa ||
    (function (bin) { return globalThis.Buffer.from(bin, "binary").toString("base64"); });
function base64FromBytes(arr) {
    var e_16, _a;
    var bin = [];
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var byte = arr_1_1.value;
            bin.push(String.fromCharCode(byte));
        }
    }
    catch (e_16_1) { e_16 = { error: e_16_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_16) throw e_16.error; }
    }
    return btoa(bin.join(""));
}
function longToString(long) {
    return long.toString();
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
