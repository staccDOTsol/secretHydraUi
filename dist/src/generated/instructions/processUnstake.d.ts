import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const processUnstakeStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export declare type ProcessUnstakeInstructionAccounts = {
    member: web3.PublicKey;
    fanout: web3.PublicKey;
    membershipVoucher: web3.PublicKey;
    membershipMint: web3.PublicKey;
    membershipMintTokenAccount: web3.PublicKey;
    memberStakeAccount: web3.PublicKey;
    instructions: web3.PublicKey;
};
export declare const processUnstakeInstructionDiscriminator: number[];
export declare function createProcessUnstakeInstruction(accounts: ProcessUnstakeInstructionAccounts): web3.TransactionInstruction;
