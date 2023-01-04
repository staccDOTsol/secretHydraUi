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
exports.createProcessSetTokenMemberStakeInstruction = exports.processSetTokenMemberStakeInstructionDiscriminator = exports.processSetTokenMemberStakeStruct = void 0;
const splToken = __importStar(require("@solana/spl-token"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
exports.processSetTokenMemberStakeStruct = new beet.BeetArgsStruct([
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['shares', beet.u64],
], 'ProcessSetTokenMemberStakeInstructionArgs');
exports.processSetTokenMemberStakeInstructionDiscriminator = [
    167, 29, 12, 30, 44, 193, 249, 142,
];
function createProcessSetTokenMemberStakeInstruction(accounts, args) {
    const { member, fanout, membershipVoucher, membershipMint, membershipMintTokenAccount, memberStakeAccount, } = accounts;
    const [data] = exports.processSetTokenMemberStakeStruct.serialize({
        instructionDiscriminator: exports.processSetTokenMemberStakeInstructionDiscriminator,
        ...args,
    });
    const keys = [
        {
            pubkey: member,
            isWritable: true,
            isSigner: true,
        },
        {
            pubkey: fanout,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: membershipVoucher,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: membershipMint,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: membershipMintTokenAccount,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: memberStakeAccount,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: web3.SystemProgram.programId,
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
exports.createProcessSetTokenMemberStakeInstruction = createProcessSetTokenMemberStakeInstruction;
//# sourceMappingURL=processSetTokenMemberStake.js.map