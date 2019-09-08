import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import {Vinho} from "../../model/vinho";

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public vinho: Vinho;
  private _precoTotal: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
      this.vinho = this.navParams.get('vinhoSelecionado');
      this._precoTotal = this.vinho.preco;
  }

  avancaCadastro() {
    this.navCtrl.push(CadastroPage.name, {
      vinhoSelecionado: this.vinho
    });
  }

  avancaNovoCadastro() {
    this.navCtrl.push(CadastroPage.name, {
      vinhoSelecionado: new Vinho()
    });
  }

  get precoTotal() {
    return this._precoTotal;
  }

}
