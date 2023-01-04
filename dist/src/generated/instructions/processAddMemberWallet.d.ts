import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { AddMemberArgs } from '../types/AddMemberArgs';
export declare type ProcessAddMemberWalletInstructionArgs = {
    args: AddMemberArgs;
};
export declare const processAddMemberWalletStruct: beet.BeetArgsStruct<ProcessAddMemberWalletInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type ProcessAddMemberWalletInstructionAccounts = {
    authority: web3.PublicKey;
    member: web3.PublicKey;
    fanout: web3.PublicKey;
    membershipAccount: web3.PublicKey;
};
export declare const processAddMemberWalletInstructionDiscriminator: number[];
export declare function createProcessAddMemberWalletInstruction(accounts: ProcessAddMemberWalletInstructionAccounts, args: ProcessAddMemberWalletInstructionArgs): web3.TransactionInstruction;
