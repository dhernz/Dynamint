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
import { chainIDFromJSON, chainIDToJSON, } from "../../publicrpc/v1/publicrpc";
import { Observable } from "rxjs";
import { BrowserHeaders } from "browser-headers";
import { share } from "rxjs/operators";
export var protobufPackage = "spy.v1";
var baseEmitterFilter = { chainId: 0, emitterAddress: "" };
export var EmitterFilter = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.chainId !== 0) {
            writer.uint32(8).int32(message.chainId);
        }
        if (message.emitterAddress !== "") {
            writer.uint32(18).string(message.emitterAddress);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseEmitterFilter);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainId = reader.int32();
                    break;
                case 2:
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
        var message = __assign({}, baseEmitterFilter);
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = chainIDFromJSON(object.chainId);
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
        message.chainId !== undefined &&
            (obj.chainId = chainIDToJSON(message.chainId));
        message.emitterAddress !== undefined &&
            (obj.emitterAddress = message.emitterAddress);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseEmitterFilter);
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
var baseFilterEntry = {};
export var FilterEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.emitterFilter !== undefined) {
            EmitterFilter.encode(message.emitterFilter, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseFilterEntry);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.emitterFilter = EmitterFilter.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseFilterEntry);
        if (object.emitterFilter !== undefined && object.emitterFilter !== null) {
            message.emitterFilter = EmitterFilter.fromJSON(object.emitterFilter);
        }
        else {
            message.emitterFilter = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.emitterFilter !== undefined &&
            (obj.emitterFilter = message.emitterFilter
                ? EmitterFilter.toJSON(message.emitterFilter)
                : undefined);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseFilterEntry);
        if (object.emitterFilter !== undefined && object.emitterFilter !== null) {
            message.emitterFilter = EmitterFilter.fromPartial(object.emitterFilter);
        }
        else {
            message.emitterFilter = undefined;
        }
        return message;
    },
};
var baseSubscribeSignedVAARequest = {};
export var SubscribeSignedVAARequest = {
    encode: function (message, writer) {
        var e_1, _a;
        if (writer === void 0) { writer = _m0.Writer.create(); }
        try {
            for (var _b = __values(message.filters), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                FilterEntry.encode(v, writer.uint32(10).fork()).ldelim();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSubscribeSignedVAARequest);
        message.filters = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filters.push(FilterEntry.decode(reader, reader.uint32()));
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
        var message = __assign({}, baseSubscribeSignedVAARequest);
        message.filters = [];
        if (object.filters !== undefined && object.filters !== null) {
            try {
                for (var _b = __values(object.filters), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.filters.push(FilterEntry.fromJSON(e));
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
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        if (message.filters) {
            obj.filters = message.filters.map(function (e) {
                return e ? FilterEntry.toJSON(e) : undefined;
            });
        }
        else {
            obj.filters = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var e_3, _a;
        var message = __assign({}, baseSubscribeSignedVAARequest);
        message.filters = [];
        if (object.filters !== undefined && object.filters !== null) {
            try {
                for (var _b = __values(object.filters), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.filters.push(FilterEntry.fromPartial(e));
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
        return message;
    },
};
var baseSubscribeSignedVAAResponse = {};
export var SubscribeSignedVAAResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.vaaBytes.length !== 0) {
            writer.uint32(10).bytes(message.vaaBytes);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSubscribeSignedVAAResponse);
        message.vaaBytes = new Uint8Array();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.vaaBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseSubscribeSignedVAAResponse);
        message.vaaBytes = new Uint8Array();
        if (object.vaaBytes !== undefined && object.vaaBytes !== null) {
            message.vaaBytes = bytesFromBase64(object.vaaBytes);
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.vaaBytes !== undefined &&
            (obj.vaaBytes = base64FromBytes(message.vaaBytes !== undefined ? message.vaaBytes : new Uint8Array()));
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseSubscribeSignedVAAResponse);
        if (object.vaaBytes !== undefined && object.vaaBytes !== null) {
            message.vaaBytes = object.vaaBytes;
        }
        else {
            message.vaaBytes = new Uint8Array();
        }
        return message;
    },
};
var SpyRPCServiceClientImpl = /** @class */ (function () {
    function SpyRPCServiceClientImpl(rpc) {
        this.rpc = rpc;
        this.SubscribeSignedVAA = this.SubscribeSignedVAA.bind(this);
    }
    SpyRPCServiceClientImpl.prototype.SubscribeSignedVAA = function (request, metadata) {
        return this.rpc.invoke(SpyRPCServiceSubscribeSignedVAADesc, SubscribeSignedVAARequest.fromPartial(request), metadata);
    };
    return SpyRPCServiceClientImpl;
}());
export { SpyRPCServiceClientImpl };
export var SpyRPCServiceDesc = {
    serviceName: "spy.v1.SpyRPCService",
};
export var SpyRPCServiceSubscribeSignedVAADesc = {
    methodName: "SubscribeSignedVAA",
    service: SpyRPCServiceDesc,
    requestStream: false,
    responseStream: true,
    requestType: {
        serializeBinary: function () {
            return SubscribeSignedVAARequest.encode(this).finish();
        },
    },
    responseType: {
        deserializeBinary: function (data) {
            return __assign(__assign({}, SubscribeSignedVAAResponse.decode(data)), { toObject: function () {
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
    GrpcWebImpl.prototype.invoke = function (methodDesc, _request, metadata) {
        var _this = this;
        var _a;
        // Status Response Codes (https://developers.google.com/maps-booking/reference/grpc-api/status_codes)
        var upStreamCodes = [2, 4, 8, 9, 10, 13, 14, 15];
        var DEFAULT_TIMEOUT_TIME = 3000;
        var request = __assign(__assign({}, _request), methodDesc.requestType);
        var maybeCombinedMetadata = metadata && this.options.metadata
            ? new BrowserHeaders(__assign(__assign({}, (_a = this.options) === null || _a === void 0 ? void 0 : _a.metadata.headersMap), metadata === null || metadata === void 0 ? void 0 : metadata.headersMap))
            : metadata || this.options.metadata;
        return new Observable(function (observer) {
            var upStream = function () {
                var client = grpc.invoke(methodDesc, {
                    host: _this.host,
                    request: request,
                    transport: _this.options.streamingTransport || _this.options.transport,
                    metadata: maybeCombinedMetadata,
                    debug: _this.options.debug,
                    onMessage: function (next) { return observer.next(next); },
                    onEnd: function (code, message) {
                        if (code === 0) {
                            observer.complete();
                        }
                        else if (upStreamCodes.includes(code)) {
                            setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
                        }
                        else {
                            observer.error(new Error("Error " + code + " " + message));
                        }
                    },
                });
                observer.add(function () { return client.close(); });
            };
            upStream();
        }).pipe(share());
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
    var e_4, _a;
    var bin = [];
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var byte = arr_1_1.value;
            bin.push(String.fromCharCode(byte));
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return btoa(bin.join(""));
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
