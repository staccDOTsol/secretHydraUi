import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare type ProcessDistributeNftInstructionArgs = {
    distributeForMint: boolean;
};
export declare const processDistributeNftStruct: beet.BeetArgsStruct<ProcessDistributeNftInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type ProcessDistributeNftInstructionAccounts = {
    payer: web3.PublicKey;
    member: web3.PublicKey;
    membershipMintTokenAccount: web3.PublicKey;
    membershipKey: web3.PublicKey;
    membershipVoucher: web3.PublicKey;
    fanout: web3.PublicKey;
    holdingAccount: web3.PublicKey;
    fanoutForMint: web3.PublicKey;
    fanoutForMintMembershipVoucher: web3.PublicKey;
    fanoutMint: web3.PublicKey;
    fanoutMintMemberTokenAccount: web3.PublicKey;
};
export declare const processDistributeNftInstructionDiscriminator: number[];
export declare function createProcessDistributeNftInstruction(accounts: ProcessDistributeNftInstructionAccounts, args: ProcessDistributeNftInstructionArgs): web3.TransactionInstruction;
