import { makeAutoObservable } from "mobx";

export default class UserStore {
  _isAuth = false;
  _user = {};
  _selectedType = {};
  _selectedBrand = {};
  _types = [];
  _brands = [];
  _devices = [];
  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUser(user: any) {
    this._user = user;
  }

  setDevice(device: any) {
    this._devices = device;
  }

  setTypes(type: any) {
    this._types = type;
  }

  setBrands(brands: any) {
    this._brands = brands;
  }

  setSelectedType(type: any) {
    this._selectedType = type;
  }

  setSelectedBrand(brand: any) {
    this._selectedBrand = brand;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get device() {
    return this._devices;
  }

  get type() {
    return this._types;
  }

  get brand() {
    return this._brands;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedBeand() {
    return this._selectedBrand;
  }
}
