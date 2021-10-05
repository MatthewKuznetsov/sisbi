import { of, Subject } from 'rxjs';
import { Gender, IUser, OtpType, Role } from '../models/user/user.model';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

  let target: HeaderComponent;

  let authServiceStub: any;

  let testUser: IUser = { } as IUser;

  beforeEach(() => {
    authServiceStub = {
      user$: new Subject<IUser>(),
      isAuth$: new Subject<boolean>(),
    };
    target = new HeaderComponent(authServiceStub);
  });

  it('should create', () => expect(target).toBeTruthy());

  describe('user$ field', () => {
    it('should emit an authenticated user', done => {
      target.user$.subscribe(e => {
        expect(e).toBe(testUser);
        done();
      });
      authServiceStub.user$.next(testUser);
    });
  });

  describe('isAuth$ field', () => {
    it('should emit truthy value if user is authenticated', done => {
      target.isAuth$.subscribe(e => {
        expect(e).toBeTruthy();
        done();
      });
      authServiceStub.isAuth$.next(true);
    });
    it('should emit falsy value if user is not authenticated', done => {
      target.isAuth$.subscribe(e => {
        expect(e).toBeFalsy();
        done();
      });
      authServiceStub.isAuth$.next(false);
    });
  });

  describe('isEmployer$ field', () => {
    it('should emit truthy value if authenticated user is an employer', done => {
      target.isEmployer$.subscribe(e => {
        expect(e).toBeTruthy();
        done();
      });
      authServiceStub.user$.next({ ...testUser, Role: Role.Employer });
    });
    it('should emit falsy value if authenticated user is not an employer', done => {
      target.isEmployer$.subscribe({ complete: done });
      target.isEmployer$.subscribe(e => {
        expect(e).toBeFalsy();
      });
      authServiceStub.user$.next({ ...testUser, Role: Role.Administrator });
      authServiceStub.user$.next({ ...testUser, Role: Role.BadRole });
      authServiceStub.user$.next({ ...testUser, Role: Role.Moderator });
      authServiceStub.user$.next({ ...testUser, Role: Role.Worker });
      authServiceStub.user$.complete();
    });
  });
  
});
