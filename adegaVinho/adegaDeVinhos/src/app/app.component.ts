import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { OneSignal, OSNotification } from '@ionic-native/onesignal';
import {VinhoDaoProvider} from "../providers/vinho-dao/vinho-dao";
import {Vinho} from "../model/vinho";
import {PerfilPage} from "../pages/perfil/perfil";
import {HomePage} from "../pages/home/home";
import {CadastroPage} from "../pages/cadastro/cadastro";

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = LoginPage;

  public paginas = [
    { titulo: 'Vinhos Armazenados', componente: HomePage, icone: 'wine' },
    { titulo: 'Cadastrar Novo Vinho', componente: CadastroPage.name, icone: 'add-circle' },
    { titulo: 'Perfil', componente: PerfilPage.name, icone: 'person' }
  ];

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _usuariosService: UsuariosServiceProvider,
    private _onesignal: OneSignal,
    private _vinhoDao: VinhoDaoProvider) {
      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();

        //configurar onesignal
        let iosConfigs = {
          kOSSettingsKeyAutoPrompt: true,
          kOSSettingsKeyInAppLaunchURL: false
        }

        this._onesignal
            .startInit('e53f5d24-40e4-458f-99db-5230cf3f8bc0', '97629632146')
            .iosSettings(iosConfigs);

        this._onesignal.inFocusDisplaying(
          this._onesignal.OSInFocusDisplayOption.Notification
        );

        this._onesignal.handleNotificationReceived()
            .subscribe(
              (notificacao: OSNotification) => {
                let dadosAdicionais = notificacao.payload
                                                .additionalData;
                let vinhoId = dadosAdicionais['vinho-id'];

                this._vinhoDao.recupera(vinhoId)
                    .subscribe(
                      (vinho: Vinho) => {
                        // vinho.adicionado = true;
                        this._vinhoDao.salva(vinho);
                      }
                    )
              }
            );

        this._onesignal.endInit();
      });
  }

  irParaPagina(componente) {
    this.nav.push(componente);
  }

  get avatar() {
    return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }
}

