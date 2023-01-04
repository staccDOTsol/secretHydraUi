"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFromName = exports.errorFromCode = exports.InvalidCloseAccountDestinationError = exports.RemoveSharesMustBeZeroError = exports.RemoveNotSupportedError = exports.TransferNotSupportedError = exports.CannotTransferToSelfError = exports.InvalidStakeAtaError = exports.MustDistributeError = exports.InvalidFanoutForMintError = exports.InsufficientBalanceToDistributeError = exports.NumericalOverflowError = exports.InvalidMetadataError = exports.WalletDoesNotOwnMembershipTokenError = exports.IncorrectOwnerError = exports.DerivedKeyInvalidError = exports.HoldingAccountMustBeAnATAError = exports.InvalidHoldingAccountError = exports.MintDoesNotMatchError = exports.InvalidMembershipVoucherError = exports.InvalidMembershipModelError = exports.MintAccountRequiredError = exports.NewMintAccountRequiredError = exports.SharesArentAtMaxError = exports.InsufficientSharesError = exports.InvalidAuthorityError = exports.BadArtithmeticError = void 0;
const createErrorFromCodeLookup = new Map();
const createErrorFromNameLookup = new Map();
class BadArtithmeticError extends Error {
    constructor() {
        super('Encountered an arithmetic error');
        this.code = 0x1770;
        this.name = 'BadArtithmetic';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, BadArtithmeticError);
        }
    }
}
exports.BadArtithmeticError = BadArtithmeticError;
createErrorFromCodeLookup.set(0x1770, () => new BadArtithmeticError());
createErrorFromNameLookup.set('BadArtithmetic', () => new BadArtithmeticError());
class InvalidAuthorityError extends Error {
    constructor() {
        super('Invalid authority');
        this.code = 0x1771;
        this.name = 'InvalidAuthority';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, InvalidAuthorityError);
        }
    }
}
exports.InvalidAuthorityError = InvalidAuthorityError;
createErrorFromCodeLookup.set(0x1771, () => new InvalidAuthorityError());
createErrorFromNameLookup.set('InvalidAuthority', () => new InvalidAuthorityError());
class InsufficientSharesError extends Error {
    constructor() {
        super('Not Enough Available Shares');
        this.code = 0x1772;
        this.name = 'InsufficientShares';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, InsufficientSharesError);
        }
    }
}
exports.InsufficientSharesError = InsufficientSharesError;
createErrorFromCodeLookup.set(0x1772, () => new InsufficientSharesError());
createErrorFromNameLookup.set('InsufficientShares', () => new InsufficientSharesError());
class SharesArentAtMaxError extends Error {
    constructor() {
        super('All available shares must be assigned to a member');
        this.code = 0x1773;
        this.name = 'SharesArentAtMax';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SharesArentAtMaxError);
        }
    }
}
exports.SharesArentAtMaxError = SharesArentAtMaxError;
createErrorFromCodeLookup.set(0x1773, () => new SharesArentAtMaxError());
createErrorFromNameLookup.set('SharesArentAtMax', () => new SharesArentAtMaxError());
class NewMintAccountRequiredError extends Error {
    constructor() {
        super('A New mint account must be provided');
        this.code = 0x1774;
        this.name = 'NewMintAccountRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, NewMintAccountRequiredError);
        }
    }
}
exports.NewMintAccountRequiredError = NewMintAccountRequiredError;
createErrorFromCodeLookup.set(0x1774, () => new NewMintAccountRequiredError());
createErrorFromNameLookup.set('NewMintAccountRequired', () => new NewMintAccountRequiredError());
class MintAccountRequiredError extends Error {
    constructor() {
        super('A Token type Fanout requires a Membership Mint');
        this.code = 0x1775;
        this.name = 'MintAccountRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, MintAccountRequiredError);
        }
    }
}
exports.MintAccountRequiredError = MintAccountRequiredError;
createErrorFromCodeLookup.set(0x1775, () => new MintAccountRequiredError());
createErrorFromNameLookup.set('MintAccountRequired', () => new MintAccountRequiredError());
class InvalidMembershipModelError extends Error {
    constructor() {
        super('Invalid Membership Model');
        this.code = 0x1776;
        this.name = 'InvalidMembershipModel';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, InvalidMembershipModelError);
        }
    }
}
exports.InvalidMembershipModelError = InvalidMembershipModelError;
createErrorFromCodeLookup.set(0x1776, () => new InvalidMembershipModelError());
createErrorFromNameLookup.set('InvalidMembershipModel', () => new InvalidMembershipModelError());
class InvalidMembershipVoucherError extends Error {
    constructor() {
        super('Invalid Membership Voucher');
        this.code = 0x1777;
        this.name = 'InvalidMembershipVoucher';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, InvalidMembershipVoucherError);
        }
    }
}
exports.InvalidMembershipVoucherError = InvalidMembershipVoucherError;
createErrorFromCodeLookup.set(0x1777, () => new InvalidMembershipVoucherError());
createErrorFromNameLookup.set('InvalidMembershipVoucher', () => new InvalidMembershipVoucherError());
class MintDoesNotMatchError extends Error {
    constructor() {
        super('Invalid Mint for the config');
        this.code = 0x1778;
        this.name = 'MintDoesNotMatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, MintDoesNotMatchError);
        }
    }
}
exports.MintDoesNotMatchError = MintDoesNotMatchError;
createErrorFromCodeLookup.set(0x1778, () => new MintDoesNotMatchError());
createErrorFromNameLookup.set('MintDoesNotMatch', () => new MintDoesNotMatchError());
class InvalidHoldingAccountError extends Error {
    constructor() {
        super('Holding account does not match the config');
        this.code = 0x1779;
        this.name = 'InvalidHoldingAccount';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, InvalidHoldingAccountError);
        }
    }
}
exports.InvalidHoldingAccountError = InvalidHoldingAccountError;
createErrorFromCodeLookup.set(0x1779, () => new InvalidHoldingAccountError());
createErrorFromNameLookup.set('InvalidHoldingAccount', () => new InvalidHoldingAccountError());
class HoldingAccountMustBeAnATAError extends Error {
    constructor() {
        super('A Mint holding account must be an ata for the mint owned by the config');
        this.code = 0x177a;
        this.name = 'HoldingAccountMustBeAnATA';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, HoldingAccountMustBeAnATAError);
        }
    }
}
exports.HoldingAccountMustBeAnATAError = HoldingAccountMustBeAnATAError;
createErrorFromCodeLookup.set(0x177a, () => new HoldingAccountMustBeAnATAError());
createErrorFromNameLookup.set('HoldingAccountMustBeAnATA', () => new HoldingAccountMustBeAnATAError());
class DerivedKeyInvalidError extends Error {
    constructor() {
        super('');
        this.code = 0x177b;
        this.name = 'DerivedKeyInvalid';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, DerivedKeyInvalidError);
        }
    }
}
exports.DerivedKeyInvalidError = DerivedKeyInvalidError;
createErrorFromCodeLookup.set(0x177b, () => new DerivedKeyInvalidError());
createErrorFromNameLookup.set('DerivedKeyInvalid', () => new DerivedKeyInvalidError());
class IncorrectOwnerError extends Error {
    constructor() {
        super('');
        this.code = 0x177c;
        this.name = 'IncorrectOwner';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, IncorrectOwnerError);
        }
    }
}
exports.IncorrectOwnerError = IncorrectOwnerError;
createErrorFromCodeLookup.set(0x177c, () => new IncorrectOwnerError());
createErrorFromNameLookup.set('IncorrectOwner', () => new IncorrectOwnerError());
class WalletDoesNotOwnMembershipTokenError extends Error {
    constructor() {
        super('Wallet Does not Own Membership Token');
        this.code = 0x177d;
        this.name = 'WalletDoesNotOwnMembershipToken';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, WalletDoesNotOwnMembershipTokenError);
        }
    }
}
exports.WalletDoesNotOwnMembershipTokenError = WalletDoesNotOwnMembershipTokenError;
createErrorFromCodeLookup.set(0x177d, () => new WalletDoesNotOwnMembershipTokenError());
createErrorFromNameLookup.set('WalletDoesNotOwnMembershipToken', () => new WalletDoesNotOwnMembershipTokenError());
class InvalidMetadataError extends Error {
    constructor() {
        super('The Metadata specified is not valid Token Metadata');
        this.code = 0x177e;
        this.name = 'InvalidMetadata';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, InvalidMetadataError);
        }
    }
}
exports.InvalidMetadataError = InvalidMetadataError;
createErrorFromCodeLookup.set(0x177e, () => new InvalidMetadataError());
createErrorFromNameLookup.set('InvalidMetadata', () => new InvalidMetadataError());
class NumericalOverflowError extends Error {
    constructor() {
        super('');
        this.code = 0x177f;
        this.name = 'NumericalOverflow';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, NumericalOverflowError);
        }
    }
}
exports.NumericalOverflowError = NumericalOverflowError;
createErrorFromCodeLookup.set(0x177f, () => new NumericalOverflowError());
createErrorFromNameLookup.set('NumericalOverflow', () => new NumericalOverflowError());
class InsufficientBalanceToDistributeError extends Error {
    constructor() {
        super('Not enough new balance to distribute');
        this.code = 0x1780;
        this.name = 'InsufficientBalanceToDistribute';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, InsufficientBalanceToDistributeError);
        }
    }
}
exports.InsufficientBalanceToDistributeError = InsufficientBalanceToDistributeError;
createErrorFromCodeLookup.set(0x1780, () => new InsufficientBalanceToDistributeError());
createErrorFromNameLookup.set('InsufficientBalanceToDistribute', () => new InsufficientBalanceToDistributeError());
class InvalidFanoutForMintError extends Error {
    constructor() {
        super('');
        this.code = 0x1781;
        this.name = 'InvalidFanoutForMint';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, InvalidFanoutForMintError);
        }
    }
}
exports.InvalidFanoutForMintError = InvalidFanoutForMintError;
createErrorFromCodeLookup.set(0x1781, () => new InvalidFanoutForMintError());
createErrorFromNameLookup.set('InvalidFanoutForMint', () => new InvalidFanoutForMintError());
class MustDistributeError extends Error {
    constructor() {
        super('This operation must be the instruction right after a distrobution on the same accounts.');
        this.code = 0x1782;
        this.name = 'MustDistribute';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, MustDistributeError);
        }
    }
}
exports.MustDistributeError = MustDistributeError;
createErrorFromCodeLookup.set(0x1782, () => new MustDistributeError());
createErrorFromNameLookup.set('MustDistribute', () => new MustDistributeError());
class InvalidStakeAtaError extends Error {
    constructor() {
        super('');
        this.code = 0x1783;
        this.name = 'InvalidStakeAta';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, InvalidStakeAtaError);
        }
    }
}
exports.InvalidStakeAtaError = InvalidStakeAtaError;
createErrorFromCodeLookup.set(0x1783, () => new InvalidStakeAtaError());
createErrorFromNameLookup.set('InvalidStakeAta', () => new InvalidStakeAtaError());
class CannotTransferToSelfError extends Error {
    constructor() {
        super('');
        this.code = 0x1784;
        this.name = 'CannotTransferToSelf';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, CannotTransferToSelfError);
        }
    }
}
exports.CannotTransferToSelfError = CannotTransferToSelfError;
createErrorFromCodeLookup.set(0x1784, () => new CannotTransferToSelfError());
createErrorFromNameLookup.set('CannotTransferToSelf', () => new CannotTransferToSelfError());
class TransferNotSupportedError extends Error {
    constructor() {
        super('Transfer is not supported on this membership model');
        this.code = 0x1785;
        this.name = 'TransferNotSupported';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, TransferNotSupportedError);
        }
    }
}
exports.TransferNotSupportedError = TransferNotSupportedError;
createErrorFromCodeLookup.set(0x1785, () => new TransferNotSupportedError());
createErrorFromNameLookup.set('TransferNotSupported', () => new TransferNotSupportedError());
class RemoveNotSupportedError extends Error {
    constructor() {
        super('Remove is not supported on this membership model');
        this.code = 0x1786;
        this.name = 'RemoveNotSupported';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, RemoveNotSupportedError);
        }
    }
}
exports.RemoveNotSupportedError = RemoveNotSupportedError;
createErrorFromCodeLookup.set(0x1786, () => new RemoveNotSupportedError());
createErrorFromNameLookup.set('RemoveNotSupported', () => new RemoveNotSupportedError());
class RemoveSharesMustBeZeroError extends Error {
    constructor() {
        super('Before you remove a wallet or NFT member please transfer the shares to another member');
        this.code = 0x1787;
        this.name = 'RemoveSharesMustBeZero';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, RemoveSharesMustBeZeroError);
        }
    }
}
exports.RemoveSharesMustBeZeroError = RemoveSharesMustBeZeroError;
createErrorFromCodeLookup.set(0x1787, () => new RemoveSharesMustBeZeroError());
createErrorFromNameLookup.set('RemoveSharesMustBeZero', () => new RemoveSharesMustBeZeroError());
class InvalidCloseAccountDestinationError extends Error {
    constructor() {
        super('Sending Sol to a SPL token destination will render the sol unusable');
        this.code = 0x1788;
        this.name = 'InvalidCloseAccountDestination';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, InvalidCloseAccountDestinationError);
        }
    }
}
exports.InvalidCloseAccountDestinationError = InvalidCloseAccountDestinationError;
createErrorFromCodeLookup.set(0x1788, () => new InvalidCloseAccountDestinationError());
createErrorFromNameLookup.set('InvalidCloseAccountDestination', () => new InvalidCloseAccountDestinationError());
function errorFromCode(code) {
    const createError = createErrorFromCodeLookup.get(code);
    return createError != null ? createError() : null;
}
exports.errorFromCode = errorFromCode;
function errorFromName(name) {
    const createError = createErrorFromNameLookup.get(name);
    return createError != null ? createError() : null;
}
exports.errorFromName = errorFromName;
//# sourceMappingURL=index.js.map