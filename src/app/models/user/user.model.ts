export enum Gender {
    Unknown,
    Male,
    Female,
}

export enum Role {
    BadRole = "bad_role",
    Worker = "worker",
    Employer = "employer",
    Moderator = "moderator",
    Administrator = "administrator",
}

export enum OtpType {
    BadType = "bad_type",
    SignUp = "sign_up",
    TwoFactorAuthentication = "two_factor_authentication",
}

export interface IUser {
    Id: string;
    FirstName: string;
    SecondName: string;
    Company: string;
    Gender: Gender;
    BDate: string;
    Address: string;
    Otp: number;
    OtpDate: number;
    OtpRetry: number;
    OtpType: OtpType;
    Phone: string;
    PhoneConfirmed: boolean;
    Email: string;
    EmailConfirmed: boolean;
    Password: string;
    Salt: string;
    Role: Role;
    Avatar: string;
    RegistrationDate: number;
}
