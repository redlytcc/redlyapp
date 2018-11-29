import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { Http, Headers } from '@angular/http';
import { HomepagePage } from '../homepage/homepage';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    data:any = {};
    constructor(public menuCtrl: MenuController,public http: Http,public navCtrl: NavController,public storage: Storage) {
        this.data.username = '';
        this.data.password = '';
        this.data.response = '';
        this.menuCtrl.enable(false, 'Smenu');
        this.http = http;
        storage.get('user').then((val) => {
            if(val != null){
                console.log(val);
                this.navCtrl.push(HomepagePage,{user:val});
            }
        });
    }
    sendgrid(){
        var myData = JSON.stringify({
            username:this.data.username,
            password:this.data.password
        });
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://127.0.0.1:8000/apirest/ini/",myData,{headers:headers})
        .map(res=>res.json())
        .subscribe(data => {
            console.log(data);
            if(data['user']!="Dont existed" ){
                var user=data['user'];
                this.storage.set('user',user);
                this.navCtrl.push(HomepagePage,{user:user});
            }
            else{
                this.data.response="Email e/ou senha inexistente";
            }
        },
        error => {
            console.log(error);
        });
    }
    cadastro(){
        this.navCtrl.push(CadastroPage);
    }

}
