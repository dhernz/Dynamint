import { ChainId, ChainName } from "..";
export declare function getSignedVAAWithRetry(hosts: string[], emitterChain: ChainId | ChainName, emitterAddress: string, sequence: string, extraGrpcOpts?: {}, retryTimeout?: number, retryAttempts?: number): Promise<import("../proto/publicrpc/v1/publicrpc").GetSignedVAAResponse>;
export default getSignedVAAWithRetry;
