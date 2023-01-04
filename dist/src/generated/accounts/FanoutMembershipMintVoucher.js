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
exports.fanoutMembershipMintVoucherBeet = exports.FanoutMembershipMintVoucher = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const fanoutMembershipMintVoucherDiscriminator = [185, 33, 118, 173, 147, 114, 126, 181];
class FanoutMembershipMintVoucher {
    constructor(fanout, fanoutMint, lastInflow, bumpSeed) {
        this.fanout = fanout;
        this.fanoutMint = fanoutMint;
        this.lastInflow = lastInflow;
        this.bumpSeed = bumpSeed;
    }
    static fromArgs(args) {
        return new FanoutMembershipMintVoucher(args.fanout, args.fanoutMint, args.lastInflow, args.bumpSeed);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return FanoutMembershipMintVoucher.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address) {
        const accountInfo = await connection.getAccountInfo(address);
        if (accountInfo == null) {
            throw new Error(`Unable to find FanoutMembershipMintVoucher account at ${address}`);
        }
        return FanoutMembershipMintVoucher.fromAccountInfo(accountInfo, 0)[0];
    }
    static deserialize(buf, offset = 0) {
        return exports.fanoutMembershipMintVoucherBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.fanoutMembershipMintVoucherBeet.serialize({
            accountDiscriminator: fanoutMembershipMintVoucherDiscriminator,
            ...this,
        });
    }
    static get byteSize() {
        return exports.fanoutMembershipMintVoucherBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(FanoutMembershipMintVoucher.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === FanoutMembershipMintVoucher.byteSize;
    }
    pretty() {
        return {
            fanout: this.fanout.toBase58(),
            fanoutMint: this.fanoutMint.toBase58(),
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
        };
    }
}
exports.FanoutMembershipMintVoucher = FanoutMembershipMintVoucher;
exports.fanoutMembershipMintVoucherBeet = new beet.BeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['fanout', beetSolana.publicKey],
    ['fanoutMint', beetSolana.publicKey],
    ['lastInflow', beet.u64],
    ['bumpSeed', beet.u8],
], FanoutMembershipMintVoucher.fromArgs, 'FanoutMembershipMintVoucher');
//# sourceMappingURL=FanoutMembershipMintVoucher.js.map