import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare type ProcessSetForTokenMemberStakeInstructionArgs = {
    shares: beet.bignum;
};
export declare const processSetForTokenMemberStakeStruct: beet.BeetArgsStruct<ProcessSetForTokenMemberStakeInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type ProcessSetForTokenMemberStakeInstructionAccounts = {
    authority: web3.PublicKey;
    member: web3.PublicKey;
    fanout: web3.PublicKey;
    membershipVoucher: web3.PublicKey;
    membershipMint: web3.PublicKey;
    membershipMintTokenAccount: web3.PublicKey;
    memberStakeAccount: web3.PublicKey;
};
export declare const processSetForTokenMemberStakeInstructionDiscriminator: number[];
export declare function createProcessSetForTokenMemberStakeInstruction(accounts: ProcessSetForTokenMemberStakeInstructionAccounts, args: ProcessSetForTokenMemberStakeInstructionArgs): web3.TransactionInstruction;
