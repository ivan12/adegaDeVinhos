import { Component } from '@angular/core';
import {NavController, LoadingController, AlertController, NavParams} from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { VinhosServiceProvider } from '../../providers/vinhos-service/vinhos-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';
import { EscolhaPage } from '../escolha/escolha';
import {Vinho} from "../../model/vinho";
import {CadastroPage} from "../cadastro/cadastro";
import {VinhoDaoProvider} from "../../providers/vinho-dao/vinho-dao";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {

  public vinhos: Vinho[] = [];
  public vinhoCadastrado: Vinho;
  loading: any;
  totalVinhos: number;
  precoTotal: number;

  constructor(public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    public navParams: NavParams,
    private _vinhoDao: VinhoDaoProvider,
    private _alertCtrl: AlertController,
    private _vinhosService: VinhosServiceProvider) {
    this.vinhoCadastrado = this.navParams.get('vinhoCadastrado');
    this.totalVinhos = 0;
    this.precoTotal = 0;
  }

  ionViewDidLoad() {
    this.loading = this._loadingCtrl.create({
      content: 'Carregando vinhos...'
    });
    this.loading.present();
    this.loadListaVinhos();

  }

  loadListaVinhos() {
    this._vinhosService.lista()
      .subscribe(
        (vinhos) => {
          this.vinhos = vinhos;
          this.calculaTotalDeVinhos();
          this.loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          console.log(err);

          this.loading.dismiss();

          this._alertCtrl.create({
            title: 'Falha na conexão',
            subTitle: 'Não foi possível carregar a lista de vinhos. Tente novamente mais tarde!',
            buttons: [
              { text: 'Ok' }
            ]
          }).present();
        }
      );
  }

  visualizarVinho(vinho: Vinho) {
    this.navCtrl.push(EscolhaPage.name, {
      vinhoSelecionado: vinho
    });
  }

  calculaTotalDeVinhos() {
    this.totalVinhos = 0;
    this.precoTotal = 0;
    this.vinhos.forEach(vinho => {
      this.totalVinhos += Number(vinho.quantidade);
      this.precoTotal += Number(vinho.preco * vinho.quantidade);
    })
  }

  editaVinho(vinho: Vinho) {
    this.navCtrl.push(CadastroPage.name, {
      vinhoSelecionado: vinho
    });
  }

  deleteVinho(vinho: Vinho){
    this._vinhosService.delete(vinho).subscribe( res => {
        this.loadListaVinhos();
    });
  }

  avancaNovoCadastro() {
    this.navCtrl.push(CadastroPage.name, {
      vinhoSelecionado: new Vinho(),
      precoTotal: 0
    });
  }

}
