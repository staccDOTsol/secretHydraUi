import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare type ProcessDistributeWalletInstructionArgs = {
    distributeForMint: boolean;
};
export declare const processDistributeWalletStruct: beet.BeetArgsStruct<ProcessDistributeWalletInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type ProcessDistributeWalletInstructionAccounts = {
    payer: web3.PublicKey;
    member: web3.PublicKey;
    membershipVoucher: web3.PublicKey;
    fanout: web3.PublicKey;
    holdingAccount: web3.PublicKey;
    fanoutForMint: web3.PublicKey;
    fanoutForMintMembershipVoucher: web3.PublicKey;
    fanoutMint: web3.PublicKey;
    fanoutMintMemberTokenAccount: web3.PublicKey;
};
export declare const processDistributeWalletInstructionDiscriminator: number[];
export declare function createProcessDistributeWalletInstruction(accounts: ProcessDistributeWalletInstructionAccounts, args: ProcessDistributeWalletInstructionArgs): web3.TransactionInstruction;
