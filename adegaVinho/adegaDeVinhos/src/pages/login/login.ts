import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../model/usuario';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = "amorim-ivan@hotmail.com.br";
  senha: string = "ivan123";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _usuariosService: UsuariosServiceProvider) {
  }

  efetuaLogin() {
    this._usuariosService
        .efetuaLogin(this.email, this.senha)
        .subscribe(
          (usuario: Usuario) => {
            this.navCtrl.setRoot(HomePage);
          },
          () => {
            this._alertCtrl.create({
              title: 'Falha no login',
              subTitle: 'Email ou senha incorretos! Verifique!',
              buttons: [
                { text: 'Ok' }
              ]
            }).present();
                this.navCtrl.setRoot(LoginPage);
          }
        )

    
  }

}
