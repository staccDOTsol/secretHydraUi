/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
export declare type FanoutMembershipVoucherArgs = {
    fanout: web3.PublicKey;
    totalInflow: beet.bignum;
    lastInflow: beet.bignum;
    bumpSeed: number;
    membershipKey: web3.PublicKey;
    shares: beet.bignum;
};
export declare class FanoutMembershipVoucher implements FanoutMembershipVoucherArgs {
    readonly fanout: web3.PublicKey;
    readonly totalInflow: beet.bignum;
    readonly lastInflow: beet.bignum;
    readonly bumpSeed: number;
    readonly membershipKey: web3.PublicKey;
    readonly shares: beet.bignum;
    private constructor();
    static fromArgs(args: FanoutMembershipVoucherArgs): FanoutMembershipVoucher;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [FanoutMembershipVoucher, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey): Promise<FanoutMembershipVoucher>;
    static deserialize(buf: Buffer, offset?: number): [FanoutMembershipVoucher, number];
    serialize(): [Buffer, number];
    static get byteSize(): number;
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    pretty(): {
        fanout: string;
        totalInflow: number | {
            toNumber: () => number;
        };
        lastInflow: number | {
            toNumber: () => number;
        };
        bumpSeed: number;
        membershipKey: string;
        shares: number | {
            toNumber: () => number;
        };
    };
}
export declare const fanoutMembershipVoucherBeet: beet.BeetStruct<FanoutMembershipVoucher, FanoutMembershipVoucherArgs & {
    accountDiscriminator: number[];
}>;
