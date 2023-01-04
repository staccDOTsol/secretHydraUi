import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { AddMemberArgs } from '../types/AddMemberArgs';
export declare type ProcessAddMemberNftInstructionArgs = {
    args: AddMemberArgs;
};
export declare const processAddMemberNftStruct: beet.BeetArgsStruct<ProcessAddMemberNftInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type ProcessAddMemberNftInstructionAccounts = {
    authority: web3.PublicKey;
    fanout: web3.PublicKey;
    membershipAccount: web3.PublicKey;
    mint: web3.PublicKey;
    metadata: web3.PublicKey;
};
export declare const processAddMemberNftInstructionDiscriminator: number[];
export declare function createProcessAddMemberNftInstruction(accounts: ProcessAddMemberNftInstructionAccounts, args: ProcessAddMemberNftInstructionArgs): web3.TransactionInstruction;
