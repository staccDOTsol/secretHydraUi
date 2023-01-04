"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FanoutClient = void 0;
const anchor_1 = require("@project-serum/anchor");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const systemErrors_1 = require("./systemErrors");
const instructions_1 = require("./generated/instructions");
const types_1 = require("./generated/types");
const Token = require('@solana/spl-token')
const accounts_1 = require("./generated/accounts");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const bs58_1 = __importDefault(require("bs58"));
const utils_1 = require("./utils");
__exportStar(require("./generated/types"), exports);
__exportStar(require("./generated/accounts"), exports);
__exportStar(require("./generated/errors"), exports);
const MPL_TM_BUF = new web3_js_1.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s").toBuffer();
const MPL_TM_PREFIX = 'metadata';
class FanoutClient {
    constructor(connection, wallet) {
        this.connection = connection;
        this.wallet = wallet;
    }
    static async init(connection, wallet) {
        return new FanoutClient(connection, wallet);
    }
    async fetch(key, type) {
        const a = await this.connection.getAccountInfo(key);
        return type.fromAccountInfo(a)[0];
    }
    async getAccountInfo(key) {
        const a = await this.connection.getAccountInfo(key);
        if (!a) {
            throw Error('Account not found');
        }
        return a;
    }
    async getMembers({ fanout }) {
        const name = 'fanoutMembershipVoucher';
        const descriminator = anchor_1.BorshAccountsCoder.accountDiscriminator(name);
        const filters = [
            {
                memcmp: {
                    offset: 0,
                    bytes: bs58_1.default.encode(Buffer.concat([descriminator, fanout.toBuffer()])),
                },
            },
        ];
        const members = await this.connection.getProgramAccounts(FanoutClient.ID, {
            dataSlice: {
                length: 32,
                offset: 8 + 32 + 8 + 8 + 1,
            },
            filters,
        });
        return members.map((mem) => new web3_js_1.PublicKey(mem.account.data));
    }
    async executeBig(command, payer = this.wallet.publicKey, finality) {
        const { instructions, signers, output } = await command;
        if (instructions.length > 0) {
            await sendMultipleInstructions(new Map(), new anchor_1.AnchorProvider(this.connection, this.wallet, {}), instructions, signers, payer || this.wallet.publicKey, finality);
        }
        return output;
    }
    async sendInstructions(instructions, signers, payer) {
        let tx = new web3_js_1.Transaction();
        tx.feePayer = payer || this.wallet.publicKey;
        tx.add(...instructions);
        tx.recentBlockhash = (await this.connection.getRecentBlockhash()).blockhash;
        if ((signers === null || signers === void 0 ? void 0 : signers.length) > 0) {
            await tx.sign(...signers);
        }
        else {
            tx = await this.wallet.signTransaction(tx);
        }
        try {
            const sig = await this.connection.sendRawTransaction(tx.serialize(), {
                skipPreflight: true,
            });
            return {
                RpcResponseAndContext: await this.connection.confirmTransaction(sig, this.connection.commitment),
                TransactionSignature: sig,
            };
        }
        catch (e) {
            const wrappedE = systemErrors_1.ProgramError.parse(e);
            throw wrappedE == null ? e : wrappedE;
        }
    }
    async throwingSend(instructions, signers, payer) {
        const res = await this.sendInstructions(instructions, signers, payer || this.wallet.publicKey);
        if (res.RpcResponseAndContext.value.err != null) {
            console.log(await this.connection.getConfirmedTransaction(res.TransactionSignature));
            throw new Error(JSON.stringify(res.RpcResponseAndContext.value.err));
        }
        return res;
    }
    static async fanoutKey(name, programId = FanoutClient.ID) {
        return await web3_js_1.PublicKey.findProgramAddress([Buffer.from('fanout-config'), Buffer.from(name)], programId);
    }
    static async fanoutForMintKey(fanout, mint, programId = FanoutClient.ID) {
        return await web3_js_1.PublicKey.findProgramAddress([Buffer.from('fanout-config'), fanout.toBuffer(), mint.toBuffer()], programId);
    }
    static async membershipVoucher(fanout, membershipKey, programId = FanoutClient.ID) {
        return await web3_js_1.PublicKey.findProgramAddress([Buffer.from('fanout-membership'), fanout.toBuffer(), membershipKey.toBuffer()], programId);
    }
    static async mintMembershipVoucher(fanoutForMintConfig, membershipKey, fanoutMint, programId = FanoutClient.ID) {
        return await web3_js_1.PublicKey.findProgramAddress([
            Buffer.from('fanout-membership'),
            fanoutForMintConfig.toBuffer(),
            membershipKey.toBuffer(),
            fanoutMint.toBuffer(),
        ], programId);
    }
    static async freezeAuthority(mint, programId = FanoutClient.ID) {
        return await web3_js_1.PublicKey.findProgramAddress([Buffer.from('freeze-authority'), mint.toBuffer()], programId);
    }
    static async nativeAccount(fanoutAccountKey, programId = FanoutClient.ID) {
        return await web3_js_1.PublicKey.findProgramAddress([Buffer.from('fanout-native-account'), fanoutAccountKey.toBuffer()], programId);
    }
    async initializeFanoutInstructions(opts) {
        const [fanoutConfig, fanoutConfigBumpSeed] = await FanoutClient.fanoutKey(opts.name);
        const [holdingAccount, holdingAccountBumpSeed] = await FanoutClient.nativeAccount(fanoutConfig);
        const instructions = [];
        const signers = [];
        let membershipMint = spl_token_1.NATIVE_MINT;
        if (opts.membershipModel == types_1.MembershipModel.Token) {
            if (!opts.mint) {
                throw new Error('Missing mint account for token based membership model');
            }
            membershipMint = opts.mint;
        }
        instructions.push((0, instructions_1.createProcessInitInstruction)({
            authority: this.wallet.publicKey,
            holdingAccount: holdingAccount,
            fanout: fanoutConfig,
            membershipMint: membershipMint,
        }, {
            args: {
                bumpSeed: fanoutConfigBumpSeed,
                nativeAccountBumpSeed: holdingAccountBumpSeed,
                totalShares: opts.totalShares,
                name: opts.name,
            },
            model: opts.membershipModel,
        }));
        return {
            output: {
                fanout: fanoutConfig,
                nativeAccount: holdingAccount,
            },
            instructions,
            signers,
        };
    }
    async initializeFanoutForMintInstructions(opts) {
        const [fanoutMintConfig, fanoutConfigBumpSeed] = await FanoutClient.fanoutForMintKey(opts.fanout, opts.mint);
        const instructions = [];
        const signers = [];
        const tokenAccountForMint = opts.mintTokenAccount ||
            (await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, opts.mint, opts.fanout, true));
        instructions.push(Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, opts.mint, tokenAccountForMint, opts.fanout, this.wallet.publicKey));
        instructions.push((0, instructions_1.createProcessInitForMintInstruction)({
            authority: this.wallet.publicKey,
            mintHoldingAccount: tokenAccountForMint,
            fanout: opts.fanout,
            mint: opts.mint,
            fanoutForMint: fanoutMintConfig,
        }, {
            bumpSeed: fanoutConfigBumpSeed,
        }));
        return {
            output: {
                tokenAccount: tokenAccountForMint,
                fanoutForMint: fanoutMintConfig,
            },
            instructions,
            signers,
        };
    }
    async addMemberWalletInstructions(opts) {
        const [membershipAccount] = await FanoutClient.membershipVoucher(opts.fanout, opts.membershipKey);
        const instructions = [];
        const signers = [];
        instructions.push((0, instructions_1.createProcessAddMemberWalletInstruction)({
            authority: this.wallet.publicKey,
            fanout: opts.fanout,
            membershipAccount,
            member: opts.membershipKey,
        }, {
            args: {
                shares: opts.shares,
            },
        }));
        return {
            output: {
                membershipAccount,
            },
            instructions,
            signers,
        };
    }
    async addMemberNftInstructions(opts) {
        const [membershipAccount, _vb] = await FanoutClient.membershipVoucher(opts.fanout, opts.membershipKey);
        const instructions = [];
        const signers = [];
        const [metadata, _md] = await web3_js_1.PublicKey.findProgramAddress([Buffer.from(MPL_TM_PREFIX), MPL_TM_BUF, opts.membershipKey.toBuffer()], new web3_js_1.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"));
        instructions.push((0, instructions_1.createProcessAddMemberNftInstruction)({
            authority: this.wallet.publicKey,
            fanout: opts.fanout,
            membershipAccount,
            mint: opts.membershipKey,
            metadata,
        }, {
            args: {
                shares: opts.shares,
            },
        }));
        return {
            output: {
                membershipAccount,
            },
            instructions,
            signers,
        };
    }
    async unstakeTokenMemberInstructions(opts) {
        const instructions = [];
        const signers = [];
        let mint = opts.membershipMint;
        if (!mint) {
            const data = await this.fetch(opts.fanout, accounts_1.Fanout);
            mint = data.membershipMint;
        }
        const [voucher, _vbump] = await FanoutClient.membershipVoucher(opts.fanout, opts.member);
        const stakeAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, voucher, true);
        const membershipMintTokenAccount = opts.membershipMintTokenAccount ||
            (await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, opts.member, true));
        instructions.push((0, instructions_1.createProcessUnstakeInstruction)({
            instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            fanout: opts.fanout,
            member: opts.member,
            memberStakeAccount: stakeAccount,
            membershipVoucher: voucher,
            membershipMint: mint,
            membershipMintTokenAccount: membershipMintTokenAccount,
        }));
        return {
            output: {
                membershipVoucher: voucher,
                membershipMintTokenAccount,
                stakeAccount,
            },
            instructions,
            signers,
        };
    }
    async stakeForTokenMemberInstructions(opts) {
        const instructions = [];
        const signers = [];
        let mint = opts.membershipMint;
        let auth = opts.fanoutAuthority;
        if (!mint || !auth) {
            const data = await this.fetch(opts.fanout, accounts_1.Fanout);
            mint = data.membershipMint;
            auth = data.authority;
        }
        const [voucher, _vbump] = await FanoutClient.membershipVoucher(opts.fanout, opts.member);
        const stakeAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, voucher, true);
        const membershipMintTokenAccount = opts.membershipMintTokenAccount ||
            (await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, auth, true));
        try {
            await this.connection.getTokenAccountBalance(stakeAccount);
        }
        catch (e) {
            instructions.push(await Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, stakeAccount, voucher, opts.payer));
        }
        try {
            await this.connection.getTokenAccountBalance(membershipMintTokenAccount);
        }
        catch (e) {
            throw new Error('Membership mint token account for authority must be initialized');
        }
        instructions.push((0, instructions_1.createProcessSetForTokenMemberStakeInstruction)({
            fanout: opts.fanout,
            authority: auth,
            member: opts.member,
            memberStakeAccount: stakeAccount,
            membershipVoucher: voucher,
            membershipMint: mint,
            membershipMintTokenAccount: membershipMintTokenAccount,
        }, {
            shares: opts.shares,
        }));
        return {
            output: {
                membershipVoucher: voucher,
                membershipMintTokenAccount,
                stakeAccount,
            },
            instructions,
            signers,
        };
    }
    async stakeTokenMemberInstructions(opts) {
        const instructions = [];
        const signers = [];
        let mint = opts.membershipMint;
        if (!mint) {
            const data = await this.fetch(opts.fanout, accounts_1.Fanout);
            mint = data.membershipMint;
        }
        const [voucher, _vbump] = await FanoutClient.membershipVoucher(opts.fanout, opts.member);
        const stakeAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, voucher, true);
        const membershipMintTokenAccount = opts.membershipMintTokenAccount ||
            (await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, opts.member, true));
        try {
            await this.connection.getTokenAccountBalance(stakeAccount);
        }
        catch (e) {
            instructions.push(await Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, stakeAccount, voucher, opts.payer));
        }
        try {
            await this.connection.getTokenAccountBalance(membershipMintTokenAccount);
        }
        catch (e) {
            throw new Error('Membership mint token account for member must be initialized');
        }
        instructions.push((0, instructions_1.createProcessSetTokenMemberStakeInstruction)({
            fanout: opts.fanout,
            member: opts.member,
            memberStakeAccount: stakeAccount,
            membershipVoucher: voucher,
            membershipMint: mint,
            membershipMintTokenAccount: membershipMintTokenAccount,
        }, {
            shares: opts.shares,
        }));
        return {
            output: {
                membershipVoucher: voucher,
                membershipMintTokenAccount,
                stakeAccount,
            },
            instructions,
            signers,
        };
    }
    async signMetadataInstructions(opts) {
        let authority = opts.authority, holdingAccount = opts.holdingAccount;
        if (!authority || !holdingAccount) {
            const fanoutObj = await this.fetch(opts.fanout, accounts_1.Fanout);
            authority = fanoutObj.authority;
            holdingAccount = fanoutObj.accountKey;
        }
        const instructions = [];
        const signers = [];
        instructions.push((0, instructions_1.createProcessSignMetadataInstruction)({
            fanout: opts.fanout,
            authority: authority,
            holdingAccount: holdingAccount,
            metadata: opts.metadata,
            tokenMetadataProgram: new web3_js_1.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
        }));
        return {
            output: {},
            instructions,
            signers,
        };
    }
    async distributeTokenMemberInstructions(opts) {
        const instructions = [];
        const signers = [];
        const fanoutMint = opts.fanoutMint || spl_token_1.NATIVE_MINT;
        let holdingAccount;
        const [fanoutForMint] = await FanoutClient.fanoutForMintKey(opts.fanout, fanoutMint);
        const fanoutMintMemberTokenAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, fanoutMint, opts.member, true);
        const [fanoutForMintMembershipVoucher] = await FanoutClient.mintMembershipVoucher(fanoutForMint, opts.member, fanoutMint);
        if (opts.distributeForMint) {
            holdingAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, fanoutMint, opts.fanout, true);
            try {
                await this.connection.getTokenAccountBalance(fanoutMintMemberTokenAccount);
            }
            catch (e) {
                instructions.push(Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, fanoutMint, fanoutMintMemberTokenAccount, opts.member, opts.payer));
            }
        }
        else {
            const [nativeAccount, _nativeAccountBump] = await FanoutClient.nativeAccount(opts.fanout);
            holdingAccount = nativeAccount;
        }
        const [membershipVoucher] = await FanoutClient.membershipVoucher(opts.fanout, opts.member);
        const stakeAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, opts.membershipMint, membershipVoucher, true);
        const membershipMintTokenAccount = opts.membershipMintTokenAccount ||
            (await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, opts.membershipMint, opts.member, true));
        try {
            await this.connection.getTokenAccountBalance(stakeAccount);
        }
        catch (e) {
            instructions.push(await Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, opts.membershipMint, stakeAccount, membershipVoucher, opts.payer));
        }
        instructions.push((0, instructions_1.createProcessDistributeTokenInstruction)({
            memberStakeAccount: stakeAccount,
            membershipMint: opts.membershipMint,
            fanoutForMint: fanoutForMint,
            fanoutMint: fanoutMint,
            membershipVoucher: membershipVoucher,
            fanoutForMintMembershipVoucher,
            holdingAccount,
            membershipMintTokenAccount: membershipMintTokenAccount,
            fanoutMintMemberTokenAccount,
            payer: opts.payer,
            member: opts.member,
            fanout: opts.fanout,
        }, {
            distributeForMint: opts.distributeForMint,
        }));
        return {
            output: {
                membershipVoucher,
                fanoutForMintMembershipVoucher,
                holdingAccount,
            },
            instructions,
            signers,
        };
    }
    async distributeAllInstructions({ fanout, mint, payer, }) {
        const fanoutAcct = await accounts_1.Fanout.fromAccountAddress(this.connection, fanout);
        const members = await this.getMembers({ fanout });
        const instructions = await Promise.all(members.map(async (member) => {
            switch (fanoutAcct.membershipModel) {
                case types_1.MembershipModel.Token:
                    return this.distributeTokenMemberInstructions({
                        distributeForMint: !mint.equals(spl_token_1.NATIVE_MINT),
                        membershipMint: fanoutAcct.membershipMint,
                        fanout,
                        member,
                        fanoutMint: mint,
                        payer: payer,
                    });
                case types_1.MembershipModel.Wallet:
                    return this.distributeWalletMemberInstructions({
                        distributeForMint: !mint.equals(spl_token_1.NATIVE_MINT),
                        member,
                        fanout,
                        fanoutMint: mint,
                        payer: payer,
                    });
                case types_1.MembershipModel.NFT:
                    const account = (await this.connection.getTokenLargestAccounts(member)).value[0]
                        .address;
                    const wallet = (await getTokenAccount(this.provider, account)).owner;
                    return this.distributeNftMemberInstructions({
                        distributeForMint: !mint.equals(spl_token_1.NATIVE_MINT),
                        fanout,
                        fanoutMint: mint,
                        membershipKey: member,
                        member: wallet,
                        payer: payer,
                    });
            }
        }));
        const grouped = (0, utils_1.chunks)(instructions, 3);
        return {
            instructions: grouped.map((i) => i.map((o) => o.instructions).flat()),
            signers: grouped.map((i) => i.map((o) => o.signers).flat()),
            output: null,
        };
    }
    async distributeAll(opts) {
        return this.executeBig(this.distributeAllInstructions(opts), opts.payer);
    }
    async distributeNftMemberInstructions(opts) {
        if (!opts.membershipKey) {
            throw new Error('No membership key');
        }
        const instructions = [];
        const signers = [];
        const fanoutMint = opts.fanoutMint || spl_token_1.NATIVE_MINT;
        let holdingAccount;
        const [fanoutForMint] = await FanoutClient.fanoutForMintKey(opts.fanout, fanoutMint);
        const [fanoutForMintMembershipVoucher] = await FanoutClient.mintMembershipVoucher(fanoutForMint, opts.membershipKey, fanoutMint);
        const fanoutMintMemberTokenAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, fanoutMint, opts.member, true);
        if (opts.distributeForMint) {
            holdingAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, fanoutMint, opts.fanout, true);
            try {
                await this.connection.getTokenAccountBalance(fanoutMintMemberTokenAccount);
            }
            catch (e) {
                instructions.push(Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, fanoutMint, fanoutMintMemberTokenAccount, opts.member, opts.payer));
            }
        }
        else {
            const [nativeAccount, _nativeAccountBump] = await FanoutClient.nativeAccount(opts.fanout);
            holdingAccount = nativeAccount;
        }
        const membershipKeyTokenAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, opts.membershipKey, opts.member, true);
        console.log(membershipKeyTokenAccount.toBase58())
        const [membershipVoucher] = await FanoutClient.membershipVoucher(opts.fanout, opts.membershipKey);
        instructions.push((0, instructions_1.createProcessDistributeNftInstruction)({
            fanoutForMint: fanoutForMint,
            fanoutMint: fanoutMint,
            membershipKey: opts.membershipKey,
            membershipVoucher: membershipVoucher,
            fanoutForMintMembershipVoucher,
            holdingAccount,
            membershipMintTokenAccount: membershipKeyTokenAccount,
            fanoutMintMemberTokenAccount,
            payer: opts.payer,
            member: opts.member,
            fanout: opts.fanout,
        }, {
            distributeForMint: opts.distributeForMint,
        }));
        return {
            output: {
                membershipVoucher,
                fanoutForMintMembershipVoucher,
                holdingAccount,
            },
            instructions,
            signers,
        };
    }
    async distributeWalletMemberInstructions(opts) {
        const instructions = [];
        const signers = [];
        const fanoutMint = opts.fanoutMint || spl_token_1.NATIVE_MINT;
        let holdingAccount;
        const [fanoutForMint] = await FanoutClient.fanoutForMintKey(opts.fanout, fanoutMint);
        const [fanoutForMintMembershipVoucher] = await FanoutClient.mintMembershipVoucher(fanoutForMint, opts.member, fanoutMint);
        const fanoutMintMemberTokenAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, fanoutMint, opts.member, true);
        if (opts.distributeForMint) {
            holdingAccount = await Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, fanoutMint, opts.fanout, true);
            try {
                await this.connection.getTokenAccountBalance(fanoutMintMemberTokenAccount);
            }
            catch (e) {
                instructions.push(Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, fanoutMint, fanoutMintMemberTokenAccount, opts.member, opts.payer));
            }
        }
        else {
            const [nativeAccount, _nativeAccountBump] = await FanoutClient.nativeAccount(opts.fanout);
            holdingAccount = nativeAccount;
        }
        const [membershipVoucher] = await FanoutClient.membershipVoucher(opts.fanout, opts.member);
        instructions.push((0, instructions_1.createProcessDistributeWalletInstruction)({
            fanoutForMint: fanoutForMint,
            fanoutMint: fanoutMint,
            membershipVoucher: membershipVoucher,
            fanoutForMintMembershipVoucher,
            holdingAccount,
            fanoutMintMemberTokenAccount,
            payer: opts.payer,
            member: opts.member,
            fanout: opts.fanout,
        }, {
            distributeForMint: opts.distributeForMint,
        }));
        return {
            output: {
                membershipVoucher,
                fanoutForMintMembershipVoucher,
                holdingAccount,
            },
            instructions,
            signers,
        };
    }
    async transferSharesInstructions(opts) {
        const instructions = [];
        const signers = [];
        const [fromMembershipAccount] = await FanoutClient.membershipVoucher(opts.fanout, opts.fromMember);
        const [toMembershipAccount] = await FanoutClient.membershipVoucher(opts.fanout, opts.toMember);
        instructions.push((0, instructions_1.createProcessTransferSharesInstruction)({
            fromMember: opts.fromMember,
            toMember: opts.toMember,
            authority: this.wallet.publicKey,
            fanout: opts.fanout,
            fromMembershipAccount,
            toMembershipAccount,
        }, {
            shares: opts.shares,
        }));
        return {
            output: {},
            instructions,
            signers,
        };
    }
    async removeMemberInstructions(opts) {
        const instructions = [];
        const signers = [];
        const [voucher] = await FanoutClient.membershipVoucher(opts.fanout, opts.member);
        instructions.push((0, instructions_1.createProcessRemoveMemberInstruction)({
            fanout: opts.fanout,
            member: opts.member,
            membershipAccount: voucher,
            authority: this.wallet.publicKey,
            destination: opts.destination,
        }));
        return {
            output: {},
            instructions,
            signers,
        };
    }
    async initializeFanout(opts) {
        const { instructions, signers, output } = await this.initializeFanoutInstructions(opts);
        await this.throwingSend(instructions, signers, this.wallet.publicKey);
        return output;
    }
    async initializeFanoutForMint(opts) {
        const { instructions, signers, output } = await this.initializeFanoutForMintInstructions(opts);
        await this.throwingSend(instructions, signers, this.wallet.publicKey);
        return output;
    }
    async addMemberNft(opts) {
        const { instructions, signers, output } = await this.addMemberNftInstructions(opts);
        await this.throwingSend(instructions, signers, this.wallet.publicKey);
        return output;
    }
    async addMemberWallet(opts) {
        const { instructions, signers, output } = await this.addMemberWalletInstructions(opts);
        await this.throwingSend(instructions, signers, this.wallet.publicKey);
        return output;
    }
    async stakeTokenMember(opts) {
        const { instructions, signers, output } = await this.stakeTokenMemberInstructions(opts);
        await this.throwingSend(instructions, signers, this.wallet.publicKey);
        return output;
    }
    async stakeForTokenMember(opts) {
        const { instructions, signers, output } = await this.stakeForTokenMemberInstructions(opts);
        await this.throwingSend(instructions, signers, this.wallet.publicKey);
        return output;
    }
    async signMetadata(opts) {
        const { instructions, signers, output } = await this.signMetadataInstructions(opts);
        await this.throwingSend(instructions, signers, this.wallet.publicKey);
        return output;
    }
    async removeMember(opts) {
        const { instructions: remove_ix, signers: remove_signers, output, } = await this.removeMemberInstructions(opts);
        await this.throwingSend([...remove_ix], [...remove_signers], this.wallet.publicKey);
        return output;
    }
    async transferShares(opts) {
        const data = await this.fetch(opts.fanout, accounts_1.Fanout);
        const { instructions: transfer_ix, signers: transfer_signers, output, } = await this.transferSharesInstructions(opts);
        if (data.membershipModel != types_1.MembershipModel.Wallet &&
            data.membershipModel != types_1.MembershipModel.NFT) {
            throw Error('Transfer is only supported in NFT and Wallet fanouts');
        }
        await this.throwingSend([...transfer_ix], [...transfer_signers], this.wallet.publicKey);
        return output;
    }
    async unstakeTokenMember(opts) {
        const { fanout, member, payer } = opts;
        if (!opts.membershipMint) {
            const data = await this.fetch(opts.fanout, accounts_1.Fanout);
            opts.membershipMint = data.membershipMint;
        }
        const { instructions: unstake_ix, signers: unstake_signers, output, } = await this.unstakeTokenMemberInstructions(opts);
        const { instructions: dist_ix, signers: dist_signers } = await this.distributeTokenMemberInstructions({
            distributeForMint: false,
            fanout,
            member,
            membershipMint: opts.membershipMint,
            payer,
        });
        await this.throwingSend([...dist_ix, ...unstake_ix], [...unstake_signers, ...dist_signers], this.wallet.publicKey);
        return output;
    }
    async distributeNft(opts) {
        const { instructions, signers, output } = await this.distributeNftMemberInstructions(opts);
        await this.throwingSend(instructions, signers, this.wallet.publicKey);
        return output;
    }
    async distributeWallet(opts) {
        const { instructions, signers, output } = await this.distributeWalletMemberInstructions(opts);
        await this.throwingSend(instructions, signers, this.wallet.publicKey);
        return output;
    }
    async distributeToken(opts) {
        const { instructions, signers, output } = await this.distributeTokenMemberInstructions(opts);
        await this.throwingSend(instructions, signers, this.wallet.publicKey);
        return output;
    }
}
exports.FanoutClient = FanoutClient;
FanoutClient.ID = new web3_js_1.PublicKey('hyDQ4Nz1eYyegS6JfenyKwKzYxRsCWCriYSAjtzP4Vg');
//# sourceMappingURL=index.js.map