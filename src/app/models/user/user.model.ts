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

export class User implements IUser {
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
  
  constructor(user: IUser) {
    this.Id = user.Id;
    this.FirstName = user.FirstName;
    this.SecondName = user.SecondName;
    this.Company = user.Company;
    this.Gender = user.Gender;
    this.BDate = user.BDate;
    this.Address = user.Address;
    this.Otp = user.Otp;
    this.OtpDate = user.OtpDate;
    this.OtpRetry = user.OtpRetry;
    this.OtpType = user.OtpType;
    this.Phone = user.Phone;
    this.PhoneConfirmed = user.PhoneConfirmed;
    this.Email = user.Email;
    this.EmailConfirmed = user.EmailConfirmed;
    this.Password = user.Password;
    this.Salt = user.Salt;
    this.Role = user.Role;
    this.Avatar = user.Avatar;
    this.RegistrationDate = user.RegistrationDate;
  }

  getDisplayName(): string {
    return this.FirstName ? `${this.FirstName} ${this.SecondName}` : this.Email;
  }

}
