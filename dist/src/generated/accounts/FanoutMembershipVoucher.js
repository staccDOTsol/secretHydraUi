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
exports.fanoutMembershipVoucherBeet = exports.FanoutMembershipVoucher = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const fanoutMembershipVoucherDiscriminator = [185, 62, 74, 60, 105, 158, 178, 125];
class FanoutMembershipVoucher {
    constructor(fanout, totalInflow, lastInflow, bumpSeed, membershipKey, shares) {
        this.fanout = fanout;
        this.totalInflow = totalInflow;
        this.lastInflow = lastInflow;
        this.bumpSeed = bumpSeed;
        this.membershipKey = membershipKey;
        this.shares = shares;
    }
    static fromArgs(args) {
        return new FanoutMembershipVoucher(args.fanout, args.totalInflow, args.lastInflow, args.bumpSeed, args.membershipKey, args.shares);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return FanoutMembershipVoucher.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address) {
        const accountInfo = await connection.getAccountInfo(address);
        if (accountInfo == null) {
            throw new Error(`Unable to find FanoutMembershipVoucher account at ${address}`);
        }
        return FanoutMembershipVoucher.fromAccountInfo(accountInfo, 0)[0];
    }
    static deserialize(buf, offset = 0) {
        return exports.fanoutMembershipVoucherBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.fanoutMembershipVoucherBeet.serialize({
            accountDiscriminator: fanoutMembershipVoucherDiscriminator,
            ...this,
        });
    }
    static get byteSize() {
        return exports.fanoutMembershipVoucherBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(FanoutMembershipVoucher.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === FanoutMembershipVoucher.byteSize;
    }
    pretty() {
        return {
            fanout: this.fanout.toBase58(),
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
            lastInflow: (() => {
                const x = this.lastInflow;
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
            membershipKey: this.membershipKey.toBase58(),
            shares: (() => {
                const x = this.shares;
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
        };
    }
}
exports.FanoutMembershipVoucher = FanoutMembershipVoucher;
exports.fanoutMembershipVoucherBeet = new beet.BeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['fanout', beetSolana.publicKey],
    ['totalInflow', beet.u64],
    ['lastInflow', beet.u64],
    ['bumpSeed', beet.u8],
    ['membershipKey', beetSolana.publicKey],
    ['shares', beet.u64],
], FanoutMembershipVoucher.fromArgs, 'FanoutMembershipVoucher');
//# sourceMappingURL=FanoutMembershipVoucher.js.map