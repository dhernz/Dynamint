import { grpc } from "@improbable-eng/grpc-web";
import _m0 from "protobufjs/minimal";
import { ChainID } from "../../publicrpc/v1/publicrpc";
import { Observable } from "rxjs";
export declare const protobufPackage = "spy.v1";
/** A MessageFilter represents an exact match for an emitter. */
export interface EmitterFilter {
    /** Source chain */
    chainId: ChainID;
    /** Hex-encoded (without leading 0x) emitter address. */
    emitterAddress: string;
}
export interface FilterEntry {
    emitterFilter: EmitterFilter | undefined;
}
export interface SubscribeSignedVAARequest {
    /**
     * List of filters to apply to the stream (OR).
     * If empty, all messages are streamed.
     */
    filters: FilterEntry[];
}
export interface SubscribeSignedVAAResponse {
    /** Raw VAA bytes */
    vaaBytes: Uint8Array;
}
export declare const EmitterFilter: {
    encode(message: EmitterFilter, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): EmitterFilter;
    fromJSON(object: any): EmitterFilter;
    toJSON(message: EmitterFilter): unknown;
    fromPartial(object: DeepPartial<EmitterFilter>): EmitterFilter;
};
export declare const FilterEntry: {
    encode(message: FilterEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): FilterEntry;
    fromJSON(object: any): FilterEntry;
    toJSON(message: FilterEntry): unknown;
    fromPartial(object: DeepPartial<FilterEntry>): FilterEntry;
};
export declare const SubscribeSignedVAARequest: {
    encode(message: SubscribeSignedVAARequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscribeSignedVAARequest;
    fromJSON(object: any): SubscribeSignedVAARequest;
    toJSON(message: SubscribeSignedVAARequest): unknown;
    fromPartial(object: DeepPartial<SubscribeSignedVAARequest>): SubscribeSignedVAARequest;
};
export declare const SubscribeSignedVAAResponse: {
    encode(message: SubscribeSignedVAAResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscribeSignedVAAResponse;
    fromJSON(object: any): SubscribeSignedVAAResponse;
    toJSON(message: SubscribeSignedVAAResponse): unknown;
    fromPartial(object: DeepPartial<SubscribeSignedVAAResponse>): SubscribeSignedVAAResponse;
};
/** SpyRPCService exposes a gossip introspection service, allowing sniffing of gossip messages. */
export interface SpyRPCService {
    /** SubscribeSignedVAA returns a stream of signed VAA messages received on the network. */
    SubscribeSignedVAA(request: DeepPartial<SubscribeSignedVAARequest>, metadata?: grpc.Metadata): Observable<SubscribeSignedVAAResponse>;
}
export declare class SpyRPCServiceClientImpl implements SpyRPCService {
    private readonly rpc;
    constructor(rpc: Rpc);
    SubscribeSignedVAA(request: DeepPartial<SubscribeSignedVAARequest>, metadata?: grpc.Metadata): Observable<SubscribeSignedVAAResponse>;
}
export declare const SpyRPCServiceDesc: {
    serviceName: string;
};
export declare const SpyRPCServiceSubscribeSignedVAADesc: UnaryMethodDefinitionish;
interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
    requestStream: any;
    responseStream: any;
}
declare type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;
interface Rpc {
    unary<T extends UnaryMethodDefinitionish>(methodDesc: T, request: any, metadata: grpc.Metadata | undefined): Promise<any>;
    invoke<T extends UnaryMethodDefinitionish>(methodDesc: T, request: any, metadata: grpc.Metadata | undefined): Observable<any>;
}
export declare class GrpcWebImpl {
    private host;
    private options;
    constructor(host: string, options: {
        transport?: grpc.TransportFactory;
        streamingTransport?: grpc.TransportFactory;
        debug?: boolean;
        metadata?: grpc.Metadata;
    });
    unary<T extends UnaryMethodDefinitionish>(methodDesc: T, _request: any, metadata: grpc.Metadata | undefined): Promise<any>;
    invoke<T extends UnaryMethodDefinitionish>(methodDesc: T, _request: any, metadata: grpc.Metadata | undefined): Observable<any>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
