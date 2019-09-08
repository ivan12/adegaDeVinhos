import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import {Vinho} from "../../model/vinho";

@Injectable()
export class VinhoDaoProvider {

  // Salvando no celular local
  constructor(private _storage: Storage) {
  }

  private _geraChave(vinho: Vinho) {
    return vinho.nome + vinho.safra.substr(0, 10);
  }

  salva(vinho: Vinho) {
    let chave = this._geraChave(vinho);
    let promise = this._storage.set(chave, vinho);
    return Observable.fromPromise(promise);
  }

  recupera(vinhoId) {
    let promise = this._storage
                      .get(vinhoId);

    return Observable.fromPromise(promise);
  }

  ehDuplicado(vinho: Vinho) {
    let chave = this._geraChave(vinho);
    let promise = this._storage
                      .get(chave)
                      .then(dado => dado ? true : false);

    return Observable.fromPromise(promise);
  }

  listaTodos() {
    let vinhos: Vinho[] = [];

    let promise = this._storage.forEach((vinho: Vinho) => {
      vinhos.push(vinho);
    })
    .then(() => vinhos);

    return Observable.fromPromise(promise);
  }

}
