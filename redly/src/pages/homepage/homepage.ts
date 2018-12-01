import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the HomepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html',
})
export class HomepagePage {
    user:any='';
    pub:any={};
    lasid:any;
    posts:any;
    ptye:any={};
    file:any;
    text:any;
    constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public menuCtrl: MenuController) {
        this.menuCtrl.enable(true, 'Smenu');
        this.user=this.navParams.get('user');
        console.log(this.user);
        this.pub.text='';
        this.http.get('http://127.0.0.1:8000/apirest/getposts/')
            .map(res => res.json()).subscribe(data => {
                // console.log(data.u);
                // console.log(data.u[0][0]);
                this.posts = data.u;
                this.lasid = data.u[0][0];
                this.getPub();
            });

    }
    upfile($event){
        this.file=$event.target.files[0];
    }
    quitRed(){
        this.storage.remove('user');
        this.navCtrl.push(HomePage);
    }
    toggleMenu() {
        this.menuCtrl.toggle();
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    getPub(){
        // console.log(this.lasid);
        this.http.get('http://127.0.0.1:8000/apirest/getposts/'+this.lasid)
                .map(res => res.json())
                    .subscribe(data => {
                        // console.log(data.u);

                        if (data.u.length>0){
                            // console.log(data.u.length);

                            this.posts.splice(0,0,data.u[0]);
                            this.lasid=data.u[0][0];
                        }
                    },
                    error=>{
                        // console.log(error);
                    });
        setTimeout(()=>{
            this.getPub();
        },2000);

    }
    sendPub(){
        console.log(this.pub.text);
        var myData = new FormData();
        myData.append('nome',this.user);
        myData.append('text',this.pub.text);
        if (this.file){
            myData.append('img',this.file);
        }
        // var myData = JSON.stringify({
        //     nome:this.user,
        //     text:this.pub.text
        // });
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        console.log(myData);
        this.http.post("http://127.0.0.1:8000/apirest/postposts/",myData)
        .subscribe(data => {
            this.getPub();
        },
        error => {
            console.log(error);
        });
    }
}
