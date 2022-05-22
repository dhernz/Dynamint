import { grpc } from "@improbable-eng/grpc-web";
import _m0 from "protobufjs/minimal";
import { ObservationRequest } from "../../gossip/v1/gossip";
export declare const protobufPackage = "node.v1";
export interface InjectGovernanceVAARequest {
    /** Index of the current guardian set. */
    currentSetIndex: number;
    /** List of governance VAA messages to inject. */
    messages: GovernanceMessage[];
    /** UNIX wall time in seconds */
    timestamp: number;
}
export interface GovernanceMessage {
    /**
     * Sequence number. This is critical for replay protection - make sure the sequence number
     * is unique for every new manually injected governance VAA. Sequences are tracked
     * by emitter, and manually injected VAAs all use a single hardcoded emitter.
     *
     * We use random sequence numbers for the manual emitter.
     */
    sequence: string;
    /** Random nonce for disambiguation. Must be identical across all nodes. */
    nonce: number;
    guardianSet: GuardianSetUpdate | undefined;
    contractUpgrade: ContractUpgrade | undefined;
    bridgeRegisterChain: BridgeRegisterChain | undefined;
    bridgeContractUpgrade: BridgeUpgradeContract | undefined;
}
export interface InjectGovernanceVAAResponse {
    /** Canonical digests of the submitted VAAs. */
    digests: Uint8Array[];
}
/**
 * GuardianSet represents a new guardian set to be submitted to and signed by the node.
 * During the genesis procedure, this data structure will be assembled using off-chain collaborative tooling
 * like GitHub using a human-readable encoding, so readability is a concern.
 */
export interface GuardianSetUpdate {
    guardians: GuardianSetUpdate_Guardian[];
}
/** List of guardian set members. */
export interface GuardianSetUpdate_Guardian {
    /**
     * Guardian key pubkey. Stored as hex string with 0x prefix for human readability -
     * this is the canonical Ethereum representation.
     */
    pubkey: string;
    /** Optional descriptive name. Not stored on any chain, purely informational. */
    name: string;
}
/** GuardianKey specifies the on-disk format for a node's guardian key. */
export interface GuardianKey {
    /** data is the binary representation of the secp256k1 private key. */
    data: Uint8Array;
    /** Whether this key is deterministically generated and unsuitable for production mode. */
    unsafeDeterministicKey: boolean;
}
export interface BridgeRegisterChain {
    /** Module identifier of the token or NFT bridge (typically "TokenBridge" or "NFTBridge") */
    module: string;
    /** ID of the chain to be registered. */
    chainId: number;
    /** Hex-encoded emitter address to be registered (without leading 0x). */
    emitterAddress: string;
}
/** ContractUpgrade represents a Wormhole contract update to be submitted to and signed by the node. */
export interface ContractUpgrade {
    /** ID of the chain where the Wormhole contract should be updated (uint8). */
    chainId: number;
    /** Hex-encoded address (without leading 0x) address of the new program/contract. */
    newContract: string;
}
export interface BridgeUpgradeContract {
    /** Module identifier of the token or NFT bridge (typically "TokenBridge" or "NFTBridge"). */
    module: string;
    /** ID of the chain where the bridge contract should be updated (uint16). */
    targetChainId: number;
    /** Hex-encoded address (without leading 0x) of the new program/contract. */
    newContract: string;
}
export interface FindMissingMessagesRequest {
    /** Emitter chain ID to iterate. */
    emitterChain: number;
    /** Hex-encoded (without leading 0x) emitter address to iterate. */
    emitterAddress: string;
    /** Whether to attempt to backfill missing messages from a list of remote nodes. */
    rpcBackfill: boolean;
    /** List of remote nodes to backfill from. */
    backfillNodes: string[];
}
export interface FindMissingMessagesResponse {
    /** List of missing sequence numbers. */
    missingMessages: string[];
    /** Range processed */
    firstSequence: string;
    lastSequence: string;
}
export interface SendObservationRequestRequest {
    observationRequest: ObservationRequest | undefined;
}
export interface SendObservationRequestResponse {
}
export declare const InjectGovernanceVAARequest: {
    encode(message: InjectGovernanceVAARequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): InjectGovernanceVAARequest;
    fromJSON(object: any): InjectGovernanceVAARequest;
    toJSON(message: InjectGovernanceVAARequest): unknown;
    fromPartial(object: DeepPartial<InjectGovernanceVAARequest>): InjectGovernanceVAARequest;
};
export declare const GovernanceMessage: {
    encode(message: GovernanceMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GovernanceMessage;
    fromJSON(object: any): GovernanceMessage;
    toJSON(message: GovernanceMessage): unknown;
    fromPartial(object: DeepPartial<GovernanceMessage>): GovernanceMessage;
};
export declare const InjectGovernanceVAAResponse: {
    encode(message: InjectGovernanceVAAResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): InjectGovernanceVAAResponse;
    fromJSON(object: any): InjectGovernanceVAAResponse;
    toJSON(message: InjectGovernanceVAAResponse): unknown;
    fromPartial(object: DeepPartial<InjectGovernanceVAAResponse>): InjectGovernanceVAAResponse;
};
export declare const GuardianSetUpdate: {
    encode(message: GuardianSetUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GuardianSetUpdate;
    fromJSON(object: any): GuardianSetUpdate;
    toJSON(message: GuardianSetUpdate): unknown;
    fromPartial(object: DeepPartial<GuardianSetUpdate>): GuardianSetUpdate;
};
export declare const GuardianSetUpdate_Guardian: {
    encode(message: GuardianSetUpdate_Guardian, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GuardianSetUpdate_Guardian;
    fromJSON(object: any): GuardianSetUpdate_Guardian;
    toJSON(message: GuardianSetUpdate_Guardian): unknown;
    fromPartial(object: DeepPartial<GuardianSetUpdate_Guardian>): GuardianSetUpdate_Guardian;
};
export declare const GuardianKey: {
    encode(message: GuardianKey, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GuardianKey;
    fromJSON(object: any): GuardianKey;
    toJSON(message: GuardianKey): unknown;
    fromPartial(object: DeepPartial<GuardianKey>): GuardianKey;
};
export declare const BridgeRegisterChain: {
    encode(message: BridgeRegisterChain, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): BridgeRegisterChain;
    fromJSON(object: any): BridgeRegisterChain;
    toJSON(message: BridgeRegisterChain): unknown;
    fromPartial(object: DeepPartial<BridgeRegisterChain>): BridgeRegisterChain;
};
export declare const ContractUpgrade: {
    encode(message: ContractUpgrade, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ContractUpgrade;
    fromJSON(object: any): ContractUpgrade;
    toJSON(message: ContractUpgrade): unknown;
    fromPartial(object: DeepPartial<ContractUpgrade>): ContractUpgrade;
};
export declare const BridgeUpgradeContract: {
    encode(message: BridgeUpgradeContract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): BridgeUpgradeContract;
    fromJSON(object: any): BridgeUpgradeContract;
    toJSON(message: BridgeUpgradeContract): unknown;
    fromPartial(object: DeepPartial<BridgeUpgradeContract>): BridgeUpgradeContract;
};
export declare const FindMissingMessagesRequest: {
    encode(message: FindMissingMessagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): FindMissingMessagesRequest;
    fromJSON(object: any): FindMissingMessagesRequest;
    toJSON(message: FindMissingMessagesRequest): unknown;
    fromPartial(object: DeepPartial<FindMissingMessagesRequest>): FindMissingMessagesRequest;
};
export declare const FindMissingMessagesResponse: {
    encode(message: FindMissingMessagesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): FindMissingMessagesResponse;
    fromJSON(object: any): FindMissingMessagesResponse;
    toJSON(message: FindMissingMessagesResponse): unknown;
    fromPartial(object: DeepPartial<FindMissingMessagesResponse>): FindMissingMessagesResponse;
};
export declare const SendObservationRequestRequest: {
    encode(message: SendObservationRequestRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SendObservationRequestRequest;
    fromJSON(object: any): SendObservationRequestRequest;
    toJSON(message: SendObservationRequestRequest): unknown;
    fromPartial(object: DeepPartial<SendObservationRequestRequest>): SendObservationRequestRequest;
};
export declare const SendObservationRequestResponse: {
    encode(_: SendObservationRequestResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SendObservationRequestResponse;
    fromJSON(_: any): SendObservationRequestResponse;
    toJSON(_: SendObservationRequestResponse): unknown;
    fromPartial(_: DeepPartial<SendObservationRequestResponse>): SendObservationRequestResponse;
};
/**
 * NodePrivilegedService exposes an administrative API. It runs on a UNIX socket and is authenticated
 * using Linux filesystem permissions.
 */
export interface NodePrivilegedService {
    /**
     * InjectGovernanceVAA injects a governance VAA into the guardian node.
     * The node will inject the VAA into the aggregator and sign/broadcast the VAA signature.
     *
     * A consensus majority of nodes on the network will have to inject the VAA within the
     * VAA timeout window for it to reach consensus.
     */
    InjectGovernanceVAA(request: DeepPartial<InjectGovernanceVAARequest>, metadata?: grpc.Metadata): Promise<InjectGovernanceVAAResponse>;
    /**
     * FindMissingMessages will detect message sequence gaps in the local VAA store for a
     * specific emitter chain and address. Start and end slots are the lowest and highest
     * sequence numbers available in the local store, respectively.
     *
     * An error is returned if more than 1000 gaps are found.
     */
    FindMissingMessages(request: DeepPartial<FindMissingMessagesRequest>, metadata?: grpc.Metadata): Promise<FindMissingMessagesResponse>;
    /**
     * SendObservationRequest broadcasts a signed observation request to the gossip network
     * using the node's guardian key. The network rate limits these requests to one per second.
     * Requests at higher rates will fail silently.
     */
    SendObservationRequest(request: DeepPartial<SendObservationRequestRequest>, metadata?: grpc.Metadata): Promise<SendObservationRequestResponse>;
}
export declare class NodePrivilegedServiceClientImpl implements NodePrivilegedService {
    private readonly rpc;
    constructor(rpc: Rpc);
    InjectGovernanceVAA(request: DeepPartial<InjectGovernanceVAARequest>, metadata?: grpc.Metadata): Promise<InjectGovernanceVAAResponse>;
    FindMissingMessages(request: DeepPartial<FindMissingMessagesRequest>, metadata?: grpc.Metadata): Promise<FindMissingMessagesResponse>;
    SendObservationRequest(request: DeepPartial<SendObservationRequestRequest>, metadata?: grpc.Metadata): Promise<SendObservationRequestResponse>;
}
export declare const NodePrivilegedServiceDesc: {
    serviceName: string;
};
export declare const NodePrivilegedServiceInjectGovernanceVAADesc: UnaryMethodDefinitionish;
export declare const NodePrivilegedServiceFindMissingMessagesDesc: UnaryMethodDefinitionish;
export declare const NodePrivilegedServiceSendObservationRequestDesc: UnaryMethodDefinitionish;
interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
    requestStream: any;
    responseStream: any;
}
declare type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;
interface Rpc {
    unary<T extends UnaryMethodDefinitionish>(methodDesc: T, request: any, metadata: grpc.Metadata | undefined): Promise<any>;
}
export declare class GrpcWebImpl {
    private host;
    private options;
    constructor(host: string, options: {
        transport?: grpc.TransportFactory;
        debug?: boolean;
        metadata?: grpc.Metadata;
    });
    unary<T extends UnaryMethodDefinitionish>(methodDesc: T, _request: any, metadata: grpc.Metadata | undefined): Promise<any>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
