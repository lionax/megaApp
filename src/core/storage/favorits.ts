import { Injectable } from '@angular/core';
import { Storage, Token } from './storage';
import { SynactaAPIService } from '../synacta/api.service';
import { Entity } from '../synacta/api.objects';
import { AlertController } from 'ionic-angular';

@Injectable()
export class Favorits{
    favEntitys:Entity[];
    dataFav:Token[];

    constructor(private lStorage:Storage, private synAPI: SynactaAPIService){
      if(!window.localStorage.getItem('fav')){
        this.addTest("Plan", "3df202ad-91b2-413a-9847-d12d536ed813");
      }
    }
    /*
    function that saves a Token with type and id in an
    Array. Thats stored in Window.localStorage "favoriten"
    @param type
    @param id
    */
    public addFav(iEntity :Entity){
      let token = this.bindData(iEntity);
      if(this.checkFav(iEntity))return;
      let dataFav = this.getFav();
      if(dataFav == null)dataFav = [];
      dataFav.push(token);
      this.lStorage.saveData<Token>("fav", dataFav);
      this.addEntity(iEntity);
	  console.log("addfav");
    }

    /*
    function that removes a stored token by id
    @param id
    */
    public removeFav(iEntity:Entity){
      if(this.checkFav(iEntity)){
          let dataFav = this.getFav();
          for(let i = 0; i < dataFav.length; i++){
            if(dataFav[i].ID == iEntity.ID){
                dataFav.splice(i,1);
                this.lStorage.saveData<Token>("fav", dataFav);
                //this.rmEntity(iEntity);
                return;
            }
          }
      }
    }
    /*
    function that returns an array with tokens
    @return an array with tokens
    */
    public getFav():Token[]{

      return this.lStorage.getData<Token[]>("fav");
    }

    /*
    function creates a token with type and id for easyer use
    @param type
    @param id
    @return an Objekt from Type Token
    */
    private bindData(iEntity: Entity) :Token {
      let type = iEntity.ObjectType;
      let id = iEntity.ID;
      let token : Token={
        Type :type,
        ID :id
      }
      return token;
    }

    /*
    function that checks if id is already stored
    @param id
    @return a boolean
    */
    public checkFav(iEntity:Entity) :boolean{
      let dataFav = this.getFav();
      if(dataFav == null) return false;
      for(let i = 0; i < dataFav.length; i++){
        if(dataFav[i].ID == iEntity.ID) return true;
      }
      return false;
    }

    //just for small Testings
    public addTest(type : string, id : string){
      //if(this.checkFav(id))return;
      // let dataFav = this.getFav();
      // if(dataFav == null) dataFav = new Array<Token>();
      // for(let i = 0; i < dataFav.length; i++){
      //   if(dataFav[i].ID == id) return true;
      // }
      let token:Token={
        ID : id,
        Type : type
      }
      //if(dataFav == null)
      let dataFav = [];
      dataFav.push(token);
      this.lStorage.saveData<Token>("fav", dataFav);
    }


    public loadEntitys():Entity[]{
      let dataFav = this.getFav();
      this.favEntitys = new Array<Entity>();
      for(let i = 0; i< dataFav.length; i++){
        console.log(dataFav[i],dataFav[i].Type, dataFav[i].ID);
        this.synAPI.getByID(dataFav[i].Type, dataFav[i].ID)
          .subscribe(response => this.favEntitys.push(response));
      }
      return this.favEntitys;
    }

    public getEntitys(){
      return this.favEntitys;
    }

    private rmEntity(iEntity:Entity){
      for(let i=0; i<this.favEntitys.length; i++){
        if(this.favEntitys[i].ID == iEntity.ID){
            this.favEntitys.splice(i,1);
            return;
        }
      }
    }
    private addEntity(iEntity:Entity){
      this.synAPI.getByID(iEntity.ObjectType, iEntity.ID)
      .subscribe(response => this.favEntitys.push(response));
    }

    public remAlert(alertCtrl: AlertController) {
	  let alert = alertCtrl.create({
		  title: 'Favorit entfernt',
		  subTitle: 'Akte/Container wurde erfolgreich von den Favoriten entfernt',
		  buttons: ['OK']
	  });
	  alert.present();
  }

  public showAlert(alertCtrl: AlertController) {
	  let alert = alertCtrl.create({
		  title: 'Neuer Favorit',
		  subTitle: 'Akte/Container wurde erfolgreich zu den Favoriten hinzugefügt',
		  buttons: ['OK']
	  });
	  alert.present();
  }

}
