import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  text: string;

  constructor(public menuCtrl: MenuController,public app: App,public storage: Storage) {
    console.log('Hello HeaderMenuComponent Component');
    this.text = 'Hello World';
  }
  quitRed(){
      this.storage.remove('user');
      this.menuCtrl.close();
      var nav = this.app.getRootNav();
      nav.setRoot(HomePage);
  }
}
