/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import { MembershipModel } from '../types/MembershipModel';
export declare type FanoutArgs = {
    authority: web3.PublicKey;
    name: string;
    accountKey: web3.PublicKey;
    totalShares: beet.bignum;
    totalMembers: beet.bignum;
    totalInflow: beet.bignum;
    lastSnapshotAmount: beet.bignum;
    bumpSeed: number;
    accountOwnerBumpSeed: number;
    totalAvailableShares: beet.bignum;
    membershipModel: MembershipModel;
    membershipMint: beet.COption<web3.PublicKey>;
    totalStakedShares: beet.COption<beet.bignum>;
};
export declare class Fanout implements FanoutArgs {
    readonly authority: web3.PublicKey;
    readonly name: string;
    readonly accountKey: web3.PublicKey;
    readonly totalShares: beet.bignum;
    readonly totalMembers: beet.bignum;
    readonly totalInflow: beet.bignum;
    readonly lastSnapshotAmount: beet.bignum;
    readonly bumpSeed: number;
    readonly accountOwnerBumpSeed: number;
    readonly totalAvailableShares: beet.bignum;
    readonly membershipModel: MembershipModel;
    readonly membershipMint: beet.COption<web3.PublicKey>;
    readonly totalStakedShares: beet.COption<beet.bignum>;
    private constructor();
    static fromArgs(args: FanoutArgs): Fanout;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Fanout, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey): Promise<Fanout>;
    static deserialize(buf: Buffer, offset?: number): [Fanout, number];
    serialize(): [Buffer, number];
    static byteSize(args: FanoutArgs): number;
    static getMinimumBalanceForRentExemption(args: FanoutArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        authority: string;
        name: string;
        accountKey: string;
        totalShares: number | {
            toNumber: () => number;
        };
        totalMembers: number | {
            toNumber: () => number;
        };
        totalInflow: number | {
            toNumber: () => number;
        };
        lastSnapshotAmount: number | {
            toNumber: () => number;
        };
        bumpSeed: number;
        accountOwnerBumpSeed: number;
        totalAvailableShares: number | {
            toNumber: () => number;
        };
        membershipModel: string;
        membershipMint: web3.PublicKey;
        totalStakedShares: beet.bignum;
    };
}
export declare const fanoutBeet: beet.FixableBeetStruct<Fanout, FanoutArgs & {
    accountDiscriminator: number[];
}>;
