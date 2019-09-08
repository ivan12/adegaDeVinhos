import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Vinho} from "../../model/vinho";
import {Observable} from "rxjs";

@Injectable()
export class VinhosServiceProvider {

  private _url2 = 'http://localhost:3000/api/vinho';
  private _url = 'http://ivanamorim-com-br.umbler.net/api/vinho';

  constructor(private _http: HttpClient) {
  }

  lista() {
    return this._http.get<Vinho[]>(this._url + '/listaTodos');
  }

  create(vinho: Vinho) {
    return this._http
      .post(this._url + '/cadastro', vinho)
      .do(() => vinho.disponivel = true)
      .catch((err) => Observable.of(new Error('Falha ao tentar cadastrar um vinho! Tente novamente mais tarde!')));
  };

  desativar(vinho: Vinho) {
    return this._http
      .post(this._url + '/delete', vinho)
      .do((res) => vinho.disponivel = false)
      .catch((err) => Observable.of(new Error('Falha ao tentar desativar um vinho! Tente novamente mais tarde!')));
  };

  delete(vinho: Vinho) {
    return this._http
      .post(this._url + '/delete', vinho)
      .do((res) => vinho.descricao = 'deletado')
      .catch((err) => Observable.of(new Error('Falha ao tentar deletar um vinho! Tente novamente mais tarde!')));
  };

  }
