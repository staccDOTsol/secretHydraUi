declare type ErrorWithCode = Error & {
    code: number;
};
declare type MaybeErrorWithCode = ErrorWithCode | null | undefined;
export declare class BadArtithmeticError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class InvalidAuthorityError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class InsufficientSharesError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class SharesArentAtMaxError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class NewMintAccountRequiredError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class MintAccountRequiredError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class InvalidMembershipModelError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class InvalidMembershipVoucherError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class MintDoesNotMatchError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class InvalidHoldingAccountError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class HoldingAccountMustBeAnATAError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class DerivedKeyInvalidError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class IncorrectOwnerError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class WalletDoesNotOwnMembershipTokenError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class InvalidMetadataError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class NumericalOverflowError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class InsufficientBalanceToDistributeError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class InvalidFanoutForMintError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class MustDistributeError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class InvalidStakeAtaError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class CannotTransferToSelfError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class TransferNotSupportedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class RemoveNotSupportedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class RemoveSharesMustBeZeroError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class InvalidCloseAccountDestinationError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare function errorFromCode(code: number): MaybeErrorWithCode;
export declare function errorFromName(name: string): MaybeErrorWithCode;
export {};
