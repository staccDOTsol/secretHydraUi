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
exports.fanoutMintBeet = exports.FanoutMint = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const fanoutMintDiscriminator = [50, 164, 42, 108, 90, 201, 250, 216];
class FanoutMint {
    constructor(mint, fanout, tokenAccount, totalInflow, lastSnapshotAmount, bumpSeed) {
        this.mint = mint;
        this.fanout = fanout;
        this.tokenAccount = tokenAccount;
        this.totalInflow = totalInflow;
        this.lastSnapshotAmount = lastSnapshotAmount;
        this.bumpSeed = bumpSeed;
    }
    static fromArgs(args) {
        return new FanoutMint(args.mint, args.fanout, args.tokenAccount, args.totalInflow, args.lastSnapshotAmount, args.bumpSeed);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return FanoutMint.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address) {
        const accountInfo = await connection.getAccountInfo(address);
        if (accountInfo == null) {
            throw new Error(`Unable to find FanoutMint account at ${address}`);
        }
        return FanoutMint.fromAccountInfo(accountInfo, 0)[0];
    }
    static deserialize(buf, offset = 0) {
        return exports.fanoutMintBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.fanoutMintBeet.serialize({
            accountDiscriminator: fanoutMintDiscriminator,
            ...this,
        });
    }
    static get byteSize() {
        return exports.fanoutMintBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(FanoutMint.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === FanoutMint.byteSize;
    }
    pretty() {
        return {
            mint: this.mint.toBase58(),
            fanout: this.fanout.toBase58(),
            tokenAccount: this.tokenAccount.toBase58(),
            totalInflow: (() => {
                const x = this.totalInflow;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            lastSnapshotAmount: (() => {
                const x = this.lastSnapshotAmount;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            bumpSeed: this.bumpSeed,
        };
    }
}
exports.FanoutMint = FanoutMint;
exports.fanoutMintBeet = new beet.BeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['mint', beetSolana.publicKey],
    ['fanout', beetSolana.publicKey],
    ['tokenAccount', beetSolana.publicKey],
    ['totalInflow', beet.u64],
    ['lastSnapshotAmount', beet.u64],
    ['bumpSeed', beet.u8],
], FanoutMint.fromArgs, 'FanoutMint');
//# sourceMappingURL=FanoutMint.js.map