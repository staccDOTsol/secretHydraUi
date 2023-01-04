import * as beet from '@metaplex-foundation/beet';
export declare enum MembershipModel {
    Wallet = 0,
    Token = 1,
    NFT = 2
}
export declare const membershipModelBeet: beet.FixedSizeBeet<MembershipModel, MembershipModel>;
