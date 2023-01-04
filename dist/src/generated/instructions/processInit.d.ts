import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { InitializeFanoutArgs } from '../types/InitializeFanoutArgs';
import { MembershipModel } from '../types/MembershipModel';
export declare type ProcessInitInstructionArgs = {
    args: InitializeFanoutArgs;
    model: MembershipModel;
};
export declare const processInitStruct: beet.FixableBeetArgsStruct<ProcessInitInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type ProcessInitInstructionAccounts = {
    authority: web3.PublicKey;
    fanout: web3.PublicKey;
    holdingAccount: web3.PublicKey;
    membershipMint: web3.PublicKey;
};
export declare const processInitInstructionDiscriminator: number[];
export declare function createProcessInitInstruction(accounts: ProcessInitInstructionAccounts, args: ProcessInitInstructionArgs): web3.TransactionInstruction;
