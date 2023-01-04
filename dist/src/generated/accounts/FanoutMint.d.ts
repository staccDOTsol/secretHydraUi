/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
export declare type FanoutMintArgs = {
    mint: web3.PublicKey;
    fanout: web3.PublicKey;
    tokenAccount: web3.PublicKey;
    totalInflow: beet.bignum;
    lastSnapshotAmount: beet.bignum;
    bumpSeed: number;
};
export declare class FanoutMint implements FanoutMintArgs {
    readonly mint: web3.PublicKey;
    readonly fanout: web3.PublicKey;
    readonly tokenAccount: web3.PublicKey;
    readonly totalInflow: beet.bignum;
    readonly lastSnapshotAmount: beet.bignum;
    readonly bumpSeed: number;
    private constructor();
    static fromArgs(args: FanoutMintArgs): FanoutMint;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [FanoutMint, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey): Promise<FanoutMint>;
    static deserialize(buf: Buffer, offset?: number): [FanoutMint, number];
    serialize(): [Buffer, number];
    static get byteSize(): number;
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    pretty(): {
        mint: string;
        fanout: string;
        tokenAccount: string;
        totalInflow: number | {
            toNumber: () => number;
        };
        lastSnapshotAmount: number | {
            toNumber: () => number;
        };
        bumpSeed: number;
    };
}
export declare const fanoutMintBeet: beet.BeetStruct<FanoutMint, FanoutMintArgs & {
    accountDiscriminator: number[];
}>;
