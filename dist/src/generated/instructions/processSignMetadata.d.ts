import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const processSignMetadataStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export declare type ProcessSignMetadataInstructionAccounts = {
    authority: web3.PublicKey;
    fanout: web3.PublicKey;
    holdingAccount: web3.PublicKey;
    metadata: web3.PublicKey;
    tokenMetadataProgram: web3.PublicKey;
};
export declare const processSignMetadataInstructionDiscriminator: number[];
export declare function createProcessSignMetadataInstruction(accounts: ProcessSignMetadataInstructionAccounts): web3.TransactionInstruction;
