import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare type ProcessInitForMintInstructionArgs = {
    bumpSeed: number;
};
export declare const processInitForMintStruct: beet.BeetArgsStruct<ProcessInitForMintInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type ProcessInitForMintInstructionAccounts = {
    authority: web3.PublicKey;
    fanout: web3.PublicKey;
    fanoutForMint: web3.PublicKey;
    mintHoldingAccount: web3.PublicKey;
    mint: web3.PublicKey;
};
export declare const processInitForMintInstructionDiscriminator: number[];
export declare function createProcessInitForMintInstruction(accounts: ProcessInitForMintInstructionAccounts, args: ProcessInitForMintInstructionArgs): web3.TransactionInstruction;
