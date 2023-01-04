import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare type ProcessDistributeTokenInstructionArgs = {
    distributeForMint: boolean;
};
export declare const processDistributeTokenStruct: beet.BeetArgsStruct<ProcessDistributeTokenInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type ProcessDistributeTokenInstructionAccounts = {
    payer: web3.PublicKey;
    member: web3.PublicKey;
    membershipMintTokenAccount: web3.PublicKey;
    membershipVoucher: web3.PublicKey;
    fanout: web3.PublicKey;
    holdingAccount: web3.PublicKey;
    fanoutForMint: web3.PublicKey;
    fanoutForMintMembershipVoucher: web3.PublicKey;
    fanoutMint: web3.PublicKey;
    fanoutMintMemberTokenAccount: web3.PublicKey;
    membershipMint: web3.PublicKey;
    memberStakeAccount: web3.PublicKey;
};
export declare const processDistributeTokenInstructionDiscriminator: number[];
export declare function createProcessDistributeTokenInstruction(accounts: ProcessDistributeTokenInstructionAccounts, args: ProcessDistributeTokenInstructionArgs): web3.TransactionInstruction;
