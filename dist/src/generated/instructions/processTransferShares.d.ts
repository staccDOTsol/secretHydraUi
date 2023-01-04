import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare type ProcessTransferSharesInstructionArgs = {
    shares: beet.bignum;
};
export declare const processTransferSharesStruct: beet.BeetArgsStruct<ProcessTransferSharesInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type ProcessTransferSharesInstructionAccounts = {
    authority: web3.PublicKey;
    fromMember: web3.PublicKey;
    toMember: web3.PublicKey;
    fanout: web3.PublicKey;
    fromMembershipAccount: web3.PublicKey;
    toMembershipAccount: web3.PublicKey;
};
export declare const processTransferSharesInstructionDiscriminator: number[];
export declare function createProcessTransferSharesInstruction(accounts: ProcessTransferSharesInstructionAccounts, args: ProcessTransferSharesInstructionArgs): web3.TransactionInstruction;
