import { ChainId, ChainName } from "../utils/consts";
export declare function getSignedVAA(host: string, emitterChain: ChainId | ChainName, emitterAddress: string, sequence: string, extraGrpcOpts?: {}): Promise<import("../proto/publicrpc/v1/publicrpc").GetSignedVAAResponse>;
