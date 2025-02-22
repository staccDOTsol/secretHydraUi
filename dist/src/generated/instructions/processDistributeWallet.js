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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProcessDistributeWalletInstruction = exports.processDistributeWalletInstructionDiscriminator = exports.processDistributeWalletStruct = void 0;
const splToken = __importStar(require("@solana/spl-token"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
exports.processDistributeWalletStruct = new beet.BeetArgsStruct([
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['distributeForMint', beet.bool],
], 'ProcessDistributeWalletInstructionArgs');
exports.processDistributeWalletInstructionDiscriminator = [
    252, 168, 167, 66, 40, 201, 182, 163,
];
function createProcessDistributeWalletInstruction(accounts, args) {
    const { payer, member, membershipVoucher, fanout, holdingAccount, fanoutForMint, fanoutForMintMembershipVoucher, fanoutMint, fanoutMintMemberTokenAccount, } = accounts;
    const [data] = exports.processDistributeWalletStruct.serialize({
        instructionDiscriminator: exports.processDistributeWalletInstructionDiscriminator,
        ...args,
    });
    const keys = [
        {
            pubkey: payer,
            isWritable: false,
            isSigner: true,
        },
        {
            pubkey: member,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: membershipVoucher,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: fanout,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: holdingAccount,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: fanoutForMint,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: fanoutForMintMembershipVoucher,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: fanoutMint,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: fanoutMintMemberTokenAccount,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: web3.SystemProgram.programId,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: web3.SYSVAR_RENT_PUBKEY,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: splToken.TOKEN_PROGRAM_ID,
            isWritable: false,
            isSigner: false,
        },
    ];
    const ix = new web3.TransactionInstruction({
        programId: new web3.PublicKey('hyDQ4Nz1eYyegS6JfenyKwKzYxRsCWCriYSAjtzP4Vg'),
        keys,
        data,
    });
    return ix;
}
exports.createProcessDistributeWalletInstruction = createProcessDistributeWalletInstruction;
//# sourceMappingURL=processDistributeWallet.js.map