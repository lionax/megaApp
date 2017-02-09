import { Component } from '@angular/core';

import { NavParams, ViewController, Platform } from 'ionic-angular';

@Component({
  templateUrl: 'metadata.html'
})
export class MetadataPage {
  character;
  datenMeta = this.params.get('datenVon');
  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform) {
    if (this.datenMeta.ObjectType == "Hauptgruppe") {
      var characters = [
        {
          Bezeichnung: this.datenMeta.Properties.Bezeichnung,
          items: [
            { title: 'Stufe', note: this.datenMeta.Properties.Stufe },
            { title: 'ID', note: this.datenMeta.ID }
          ]
        }];
    }
    else if (this.datenMeta.ObjectType == "Akte") {
      var characters = [
        {
          Bezeichnung: this.datenMeta.Properties.Aktenbetreff,
          items: [
            { title: 'Erstellt am:', note: this.datenMeta.Properties['Erstellt am'] },
            { title: 'Erstellt von', note: this.datenMeta.Properties['Erstellt von'] },
            { title: 'Geheimschutzstufe', note: this.datenMeta.Properties.Geheimschutzstufe },
            { title: 'ID', note: this.datenMeta.ID },
            { title: 'Organisation', note: this.datenMeta.Properties.Organisation }
          ]
        }];
    }
    else if (this.datenMeta.ObjectType == "Dokument") {
      var characters = [
        {
          Bezeichnung: this.datenMeta.Properties.Name,
          items: [
            { title: 'Erstellt am:', note: this.datenMeta.Properties['Erstellt am'] },
            { title: 'Erstellt von', note: this.datenMeta.Properties['Erstellt von'] },
            { title: 'Geheimschutzstufe', note: this.datenMeta.Properties.Geheimschutzstufe },
            { title: 'ID', note: this.datenMeta.ID },
            { title: 'Organisation', note: this.datenMeta.Properties.Organisation },
            { title: 'Erweiterung', note: this.datenMeta.Properties.Erweiterung }
          ]
        }];
    }


    this.character = characters[0];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}