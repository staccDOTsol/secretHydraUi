import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare type ProcessSetTokenMemberStakeInstructionArgs = {
    shares: beet.bignum;
};
export declare const processSetTokenMemberStakeStruct: beet.BeetArgsStruct<ProcessSetTokenMemberStakeInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type ProcessSetTokenMemberStakeInstructionAccounts = {
    member: web3.PublicKey;
    fanout: web3.PublicKey;
    membershipVoucher: web3.PublicKey;
    membershipMint: web3.PublicKey;
    membershipMintTokenAccount: web3.PublicKey;
    memberStakeAccount: web3.PublicKey;
};
export declare const processSetTokenMemberStakeInstructionDiscriminator: number[];
export declare function createProcessSetTokenMemberStakeInstruction(accounts: ProcessSetTokenMemberStakeInstructionAccounts, args: ProcessSetTokenMemberStakeInstructionArgs): web3.TransactionInstruction;
