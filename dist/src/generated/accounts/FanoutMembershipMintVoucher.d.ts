/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
export declare type FanoutMembershipMintVoucherArgs = {
    fanout: web3.PublicKey;
    fanoutMint: web3.PublicKey;
    lastInflow: beet.bignum;
    bumpSeed: number;
};
export declare class FanoutMembershipMintVoucher implements FanoutMembershipMintVoucherArgs {
    readonly fanout: web3.PublicKey;
    readonly fanoutMint: web3.PublicKey;
    readonly lastInflow: beet.bignum;
    readonly bumpSeed: number;
    private constructor();
    static fromArgs(args: FanoutMembershipMintVoucherArgs): FanoutMembershipMintVoucher;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [FanoutMembershipMintVoucher, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey): Promise<FanoutMembershipMintVoucher>;
    static deserialize(buf: Buffer, offset?: number): [FanoutMembershipMintVoucher, number];
    serialize(): [Buffer, number];
    static get byteSize(): number;
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    pretty(): {
        fanout: string;
        fanoutMint: string;
        lastInflow: number | {
            toNumber: () => number;
        };
        bumpSeed: number;
    };
}
export declare const fanoutMembershipMintVoucherBeet: beet.BeetStruct<FanoutMembershipMintVoucher, FanoutMembershipMintVoucherArgs & {
    accountDiscriminator: number[];
}>;
