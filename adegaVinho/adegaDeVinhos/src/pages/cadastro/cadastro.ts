import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import {Vinho} from '../../model/vinho';

import { VinhoDaoProvider } from '../../providers/vinho-dao/vinho-dao';

import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';
import {VinhosServiceProvider} from "../../providers/vinhos-service/vinhos-service";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage implements OnInit{

  public vinho: Vinho = new Vinho();
  public precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();

  private _alerta: Alert;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _alertCtrl: AlertController,
              private _vinhosService: VinhosServiceProvider,
              private _vinhoDao: VinhoDaoProvider,
              private _vibration: Vibration,
              private _datePicker: DatePicker) {
  }

  ngOnInit(): void {
    this.vinho = this.navParams.get('vinhoSelecionado');
    if (!this.vinho) {
      this.vinho = new Vinho();
    }
  }

  selecionaData() {
    this._datePicker.show({
      date: new Date(),
      mode: 'date'
    })
    .then(data => this.data = data.toISOString());
  }

  cadastrarVinho() {

    if (!this.vinho
      || !this.vinho.nome
      || !this.vinho.safra
      || !this.vinho.quantidade
      || !this.vinho.preco
      || !this.vinho.pais
      || !this.vinho.descricao) {
      this._vibration.vibrate(500);
      this.alert("Preenchimento Obrigatório", "Favor preencher todos os campos");
      return;
    }

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { 
          text: 'ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    let mensagem = '';

    this._vinhosService.create(this.vinho).subscribe(res => {
      this.alert("Vinho Salvo!", "Seu vinho foi cadastrado com sucesso!");
      console.log('_vinhosService.create res = ', res);
      this.navCtrl.setRoot(HomePage);
    });

    /*
    this._vinhoDao.ehDuplicado(this.vinho)
        .mergeMap(ehDuplicado => {
          if (ehDuplicado) {
            throw new Error('Vinho já existente!');
          }
          return null;
        })
        .mergeMap((valor) => {
          // salva storage
          let observable = this._vinhoDao.salva(this.vinho);

          if (valor instanceof Error) {
            throw valor;
          }
          return observable;
        })
        .finally(
          () => {
            this._alerta.setSubTitle(mensagem);
            this._alerta.present();
          }
        )
        .subscribe(
          () => mensagem = 'Salvo no Storage com sucesso!',
          (err: Error) => mensagem = err.message
        );
    */
  }

  alert(titulo, descricao) {
    this._alertCtrl.create({
      title: titulo,
      subTitle: descricao,
      buttons: [
        { text: 'ok' }
      ]
    }).present();
  }

}
