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
exports.fanoutBeet = exports.Fanout = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const MembershipModel_1 = require("../types/MembershipModel");
const fanoutDiscriminator = [164, 101, 210, 92, 222, 14, 75, 156];
class Fanout {
    constructor(authority, name, accountKey, totalShares, totalMembers, totalInflow, lastSnapshotAmount, bumpSeed, accountOwnerBumpSeed, totalAvailableShares, membershipModel, membershipMint, totalStakedShares) {
        this.authority = authority;
        this.name = name;
        this.accountKey = accountKey;
        this.totalShares = totalShares;
        this.totalMembers = totalMembers;
        this.totalInflow = totalInflow;
        this.lastSnapshotAmount = lastSnapshotAmount;
        this.bumpSeed = bumpSeed;
        this.accountOwnerBumpSeed = accountOwnerBumpSeed;
        this.totalAvailableShares = totalAvailableShares;
        this.membershipModel = membershipModel;
        this.membershipMint = membershipMint;
        this.totalStakedShares = totalStakedShares;
    }
    static fromArgs(args) {
        return new Fanout(args.authority, args.name, args.accountKey, args.totalShares, args.totalMembers, args.totalInflow, args.lastSnapshotAmount, args.bumpSeed, args.accountOwnerBumpSeed, args.totalAvailableShares, args.membershipModel, args.membershipMint, args.totalStakedShares);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return Fanout.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address) {
        const accountInfo = await connection.getAccountInfo(address);
        if (accountInfo == null) {
            throw new Error(`Unable to find Fanout account at ${address}`);
        }
        return Fanout.fromAccountInfo(accountInfo, 0)[0];
    }
    static deserialize(buf, offset = 0) {
        return exports.fanoutBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.fanoutBeet.serialize({
            accountDiscriminator: fanoutDiscriminator,
            ...this,
        });
    }
    static byteSize(args) {
        const instance = Fanout.fromArgs(args);
        return exports.fanoutBeet.toFixedFromValue({
            accountDiscriminator: fanoutDiscriminator,
            ...instance,
        }).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(Fanout.byteSize(args), commitment);
    }
    pretty() {
        return {
            authority: this.authority.toBase58(),
            name: this.name,
            accountKey: this.accountKey.toBase58(),
            totalShares: (() => {
                const x = this.totalShares;
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
            totalMembers: (() => {
                const x = this.totalMembers;
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
            accountOwnerBumpSeed: this.accountOwnerBumpSeed,
            totalAvailableShares: (() => {
                const x = this.totalAvailableShares;
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
            membershipModel: 'MembershipModel.' + MembershipModel_1.MembershipModel[this.membershipModel],
            membershipMint: this.membershipMint,
            totalStakedShares: this.totalStakedShares,
        };
    }
}
exports.Fanout = Fanout;
exports.fanoutBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['authority', beetSolana.publicKey],
    ['name', beet.utf8String],
    ['accountKey', beetSolana.publicKey],
    ['totalShares', beet.u64],
    ['totalMembers', beet.u64],
    ['totalInflow', beet.u64],
    ['lastSnapshotAmount', beet.u64],
    ['bumpSeed', beet.u8],
    ['accountOwnerBumpSeed', beet.u8],
    ['totalAvailableShares', beet.u64],
    ['membershipModel', MembershipModel_1.membershipModelBeet],
    ['membershipMint', beet.coption(beetSolana.publicKey)],
    ['totalStakedShares', beet.coption(beet.u64)],
], Fanout.fromArgs, 'Fanout');
//# sourceMappingURL=Fanout.js.map