/// <reference types="node" />
import { AccountInfo, Connection, Finality, PublicKey, RpcResponseAndContext, SignatureResult, Signer, Transaction, TransactionInstruction, TransactionSignature } from '@solana/web3.js';
import { MembershipModel } from './generated/types';
export * from './generated/types';
export * from './generated/accounts';
export * from './generated/errors';
interface InitializeFanoutArgs {
    name: string;
    membershipModel: MembershipModel;
    totalShares: number;
    mint?: PublicKey;
}
interface InitializeFanoutForMintArgs {
    fanout: PublicKey;
    mint: PublicKey;
    mintTokenAccount?: PublicKey;
}
interface AddMemberArgs {
    shares: number;
    fanout: PublicKey;
    fanoutNativeAccount?: PublicKey;
    membershipKey: PublicKey;
}
interface StakeMemberArgs {
    shares: number;
    fanout: PublicKey;
    fanoutAuthority?: PublicKey;
    membershipMint?: PublicKey;
    membershipMintTokenAccount?: PublicKey;
    fanoutNativeAccount?: PublicKey;
    member: PublicKey;
    payer: PublicKey;
}
interface SignMetadataArgs {
    fanout: PublicKey;
    authority?: PublicKey;
    holdingAccount?: PublicKey;
    metadata: PublicKey;
}
interface UnstakeMemberArgs {
    fanout: PublicKey;
    membershipMint?: PublicKey;
    membershipMintTokenAccount?: PublicKey;
    fanoutNativeAccount?: PublicKey;
    member: PublicKey;
    payer: PublicKey;
}
interface DistributeMemberArgs {
    distributeForMint: boolean;
    member: PublicKey;
    membershipKey?: PublicKey;
    fanout: PublicKey;
    fanoutMint?: PublicKey;
    payer: PublicKey;
}
interface DistributeTokenMemberArgs {
    distributeForMint: boolean;
    member: PublicKey;
    membershipMint: PublicKey;
    fanout: PublicKey;
    fanoutMint?: PublicKey;
    membershipMintTokenAccount?: PublicKey;
    payer: PublicKey;
}
interface DistributeAllArgs {
    fanout: PublicKey;
    mint: PublicKey;
    payer: PublicKey;
}
interface TransferSharesArgs {
    fanout: PublicKey;
    fromMember: PublicKey;
    toMember: PublicKey;
    shares: number;
}
interface RemoveMemberArgs {
    fanout: PublicKey;
    member: PublicKey;
    destination: PublicKey;
}
export interface TransactionResult {
    RpcResponseAndContext: RpcResponseAndContext<SignatureResult>;
    TransactionSignature: TransactionSignature;
}
export interface Wallet {
    signTransaction(tx: Transaction): Promise<Transaction>;
    signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
    publicKey: PublicKey;
}
export declare class FanoutClient {
    connection: Connection;
    wallet: Wallet;
    static ID: PublicKey;
    static init(connection: Connection, wallet: Wallet): Promise<FanoutClient>;
    constructor(connection: Connection, wallet: Wallet);
    fetch<T>(key: PublicKey, type: any): Promise<T>;
    getAccountInfo(key: PublicKey): Promise<AccountInfo<Buffer>>;
    getMembers({ fanout }: {
        fanout: PublicKey;
    }): Promise<PublicKey[]>;
    executeBig<Output>(command: Promise<any>, payer?: PublicKey, finality?: Finality): Promise<Output>;
    sendInstructions(instructions: TransactionInstruction[], signers: Signer[], payer?: PublicKey): Promise<TransactionResult>;
    private throwingSend;
    static fanoutKey(name: string, programId?: PublicKey): Promise<[PublicKey, number]>;
    static fanoutForMintKey(fanout: PublicKey, mint: PublicKey, programId?: PublicKey): Promise<[PublicKey, number]>;
    static membershipVoucher(fanout: PublicKey, membershipKey: PublicKey, programId?: PublicKey): Promise<[PublicKey, number]>;
    static mintMembershipVoucher(fanoutForMintConfig: PublicKey, membershipKey: PublicKey, fanoutMint: PublicKey, programId?: PublicKey): Promise<[PublicKey, number]>;
    static freezeAuthority(mint: PublicKey, programId?: PublicKey): Promise<[PublicKey, number]>;
    static nativeAccount(fanoutAccountKey: PublicKey, programId?: PublicKey): Promise<[PublicKey, number]>;
    initializeFanoutInstructions(opts: InitializeFanoutArgs): Promise<any>;
    initializeFanoutForMintInstructions(opts: InitializeFanoutForMintArgs): Promise<any>;
    addMemberWalletInstructions(opts: AddMemberArgs): Promise<any>;
    addMemberNftInstructions(opts: AddMemberArgs): Promise<any>;
    unstakeTokenMemberInstructions(opts: UnstakeMemberArgs): Promise<any>;
    stakeForTokenMemberInstructions(opts: StakeMemberArgs): Promise<any>;
    stakeTokenMemberInstructions(opts: StakeMemberArgs): Promise<any>;
    signMetadataInstructions(opts: SignMetadataArgs): Promise<any>;
    distributeTokenMemberInstructions(opts: DistributeTokenMemberArgs): Promise<any>;
    distributeAllInstructions({ fanout, mint, payer, }: DistributeAllArgs): Promise<any>;
    distributeAll(opts: DistributeAllArgs): Promise<null>;
    distributeNftMemberInstructions(opts: DistributeMemberArgs): Promise<any>;
    distributeWalletMemberInstructions(opts: DistributeMemberArgs): Promise<any>;
    transferSharesInstructions(opts: TransferSharesArgs): Promise<any>;
    removeMemberInstructions(opts: RemoveMemberArgs): Promise<any>;
    initializeFanout(opts: InitializeFanoutArgs): Promise<{
        fanout: PublicKey;
        nativeAccount: PublicKey;
    }>;
    initializeFanoutForMint(opts: InitializeFanoutForMintArgs): Promise<{
        fanoutForMint: PublicKey;
        tokenAccount: PublicKey;
    }>;
    addMemberNft(opts: AddMemberArgs): Promise;
    addMemberWallet(opts: AddMemberArgs): Promise;
    stakeTokenMember(opts: StakeMemberArgs): Promise<any>;
    stakeForTokenMember(opts: StakeMemberArgs): Promise<any>;
    signMetadata(opts: SignMetadataArgs): Promise<any>;
    removeMember(opts: RemoveMemberArgs): Promise<any>;
    transferShares(opts: TransferSharesArgs): Promise<any>;
    unstakeTokenMember(opts: UnstakeMemberArgs): Promise<any>;
    distributeNft(opts: DistributeMemberArgs): Promise<{
        membershipVoucher: PublicKey;
        fanoutForMintMembershipVoucher?: PublicKey;
        holdingAccount: PublicKey;
    }>;
    distributeWallet(opts: DistributeMemberArgs): Promise<{
        membershipVoucher: PublicKey;
        fanoutForMintMembershipVoucher?: PublicKey;
        holdingAccount: PublicKey;
    }>;
    distributeToken(opts: DistributeTokenMemberArgs): Promise<{
        membershipVoucher: PublicKey;
        fanoutForMintMembershipVoucher?: PublicKey;
        holdingAccount: PublicKey;
    }>;
}
