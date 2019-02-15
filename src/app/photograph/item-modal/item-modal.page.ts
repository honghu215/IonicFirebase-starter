import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.page.html',
  styleUrls: ['./item-modal.page.scss'],
})
export class ItemModalPage implements OnInit {
  @Input() itemName: string;
  quantity = 2;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(`Modal passed data: ${ this.itemName }`);
  }

  close() {
    this.modalCtrl.dismiss({
      data: '' + this.quantity + ' ' + this.itemName
    });
  }

}
