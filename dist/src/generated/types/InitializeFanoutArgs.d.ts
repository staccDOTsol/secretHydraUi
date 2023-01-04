import * as beet from '@metaplex-foundation/beet';
export declare type InitializeFanoutArgs = {
    bumpSeed: number;
    nativeAccountBumpSeed: number;
    name: string;
    totalShares: beet.bignum;
};
export declare const initializeFanoutArgsBeet: beet.FixableBeetArgsStruct<InitializeFanoutArgs>;
