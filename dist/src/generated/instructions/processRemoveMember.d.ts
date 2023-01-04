import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const processRemoveMemberStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export declare type ProcessRemoveMemberInstructionAccounts = {
    authority: web3.PublicKey;
    member: web3.PublicKey;
    fanout: web3.PublicKey;
    membershipAccount: web3.PublicKey;
    destination: web3.PublicKey;
};
export declare const processRemoveMemberInstructionDiscriminator: number[];
export declare function createProcessRemoveMemberInstruction(accounts: ProcessRemoveMemberInstructionAccounts): web3.TransactionInstruction;
