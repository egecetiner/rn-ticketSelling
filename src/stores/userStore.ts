import {action, makeObservable, observable} from 'mobx';

class UserStore {
  name = '';
  mail = '';
  city = '';
  adress = '';
  identityNumber = '';
  ip = '';
  isPersonal = '';
  isAdmin = false;

  constructor() {
    makeObservable(this, {
      name: observable,
      setName: action,
      mail: observable,
      setMail: action,
      isAdmin: observable,
      setAdmin: action,
      city: observable,
      setCity: action,
      adress: observable,
      setAdress: action,
      identityNumber: observable,
      setIdentityNumber: action,
      ip: observable,
      setIp: action,
      isPersonal: observable,
      setIsPersonal: action,
    });
  }
  setName(newValue: string) {
    this.name = newValue;
  }
  setMail(newValue: string) {
    this.mail = newValue;
  }
  setAdmin(newValue: boolean) {
    this.isAdmin = newValue;
  }
  setCity(newValue: string) {
    this.city = newValue;
  }
  setAdress(newValue: string) {
    this.adress = newValue;
  }
  setIdentityNumber(newValue: any) {
    this.identityNumber = newValue;
  }
  setIp(newValue: string) {
    this.ip = newValue;
  }
  setIsPersonal(newValue: any) {
    this.isPersonal = newValue;
  }
}

export const userStore = new UserStore();
