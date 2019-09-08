import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../model/usuario';

const CHAVE = 'avatar-usuario';

@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado: Usuario;
  private _urlLocalHost = 'http://localhost:3000/api/login';
  private _url = 'http://ivanamorim-com-br.umbler.net/api/login';

  constructor(private _http: HttpClient) {
  }

  efetuaLogin(email, senha) {
    return this._http.post<Usuario>(this._urlLocalHost, { email, senha})
              .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }

  salvaAvatar(avatar) {
    localStorage.setItem(CHAVE, avatar);
  }

  obtemAvatar() {
    return localStorage.getItem(CHAVE)
            ? localStorage.getItem(CHAVE)
            : 'assets/img/avatar-padrao.jpg';
  }
}
