import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HomepagePage } from '../homepage/homepage';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

//@IonicPage()
@Component({
    selector: 'page-cadastro',
    templateUrl: 'cadastro.html',
})
export class CadastroPage {
    data:any = {};
    rs:any ='';
    constructor(public menuCtrl: MenuController,public http: Http,public navCtrl: NavController,public storage: Storage) {
        this.data.user = '';
        this.data.senha = '';
        this.data.againsenha = '';
        this.data.nome = '';
        this.data.email = '';
        this.data.response = '';
        this.http = http;
        this.menuCtrl.enable(false, 'Smenu');
    }
    cad(){
        if(this.data.senha==this.data.againsenha){
            var myData = JSON.stringify({
                username:this.data.user,
                password:this.data.senha,
                name:this.data.nome,
                email:this.data.email
            });
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            // var myData=JSON.stringify({'username':this.data.user,'email':this.data.email,'name':this.data.nome,'password':this.data.senha});
            this.http.post('http://127.0.0.1:8000/apirest/cre/',myData,{headers:headers})
                .map(res=>res.json())
                .subscribe(datay =>{
                    console.log(datay)
                    if(datay.user =="OK"){
                        this.storage.set('user',this.data.user);
                        this.navCtrl.push(HomepagePage,{user:this.data.user});
                    }
                    var x =datay['user'];
                    this.data.response=x;

                },error=>{
                    console.log(error);

                });
        }
    }

}
