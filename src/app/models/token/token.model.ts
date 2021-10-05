export interface IToken {
  Id: string;
  Token: string;
  ExpireIn: number;
  UserId: string;
}

export interface ITokenPayload {
  exp: Date;
  iat: Date;
  user: string;
}

export class Token {

  private _tokenSegmentPattern = /[_\-\+\/A-Za-z0-9]+/;

  private _user!: string;
  private _exp!: Date;
  private _iat!: Date;
  private _plain!: string;

  get plain(): string {
    return this._plain;
  }

  get payload(): ITokenPayload {
    return {
      user: this._user,
      exp: this._exp,
      iat: this._iat,
    }
  }

  isExpired(tollerance: number = 0): boolean {
    return this._exp.getTime() + tollerance < new Date().getTime();
  }

  constructor(
    token: string,
    public Id?: string,  
  ) {
    this._applyToken(token);
  }

  private _validate(token: string): void {
    if (!token) { throw new Error('Empty token was provided.'); }
    const segments = token.split('.');
    if (segments.length !== 3) { throw new Error('Token must contain 3 segments.'); }
    if (!segments.every(s => this._tokenSegmentPattern.test(s))) { throw new Error('Forbidden simbols were used in token.'); }
  }

  private _applyToken(token: string): void {

    this._validate(token);

    const decoded = JSON.parse(atob(token.split('.')[1]));

    if (decoded.user == null) {
      throw new Error('Token user is inavlid.');
    }
    if (decoded.exp == null) {
      throw new Error('Token exp  is inavlid.');
    }
    if (decoded.iat == null) {
      throw new Error('Token iat is inavlid.');
    }

    this._plain = token;
    this._user = decoded.user;
    this._exp = new Date(decoded.exp * 1000);
    this._iat = new Date(decoded.iat * 1000);
  }

}