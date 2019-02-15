import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

const selectorData = {
  numbers: [
    { description: '1' },
    { description: '2' },
    { description: '3' },
    { description: '4' },
    { description: '5' },
    { description: '6' },
    { description: '7' },
    { description: '8' },
    { description: '9' },
    { description: '10' }
  ]
};

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.page.html',
  styleUrls: ['./item-modal.page.scss'],
})
export class ItemModalPage implements OnInit {
  @Input() itemName: string;
  quantity = 1;
  unit = ' ';
  returnStr = '';

  constructor(private modalCtrl: ModalController,
              private selector: WheelSelector) { }

  ngOnInit() {
    console.log(`Modal passed data: ${ this.itemName }`);
  }

  async openSelector() {
    this.selector.show({
      title: 'How Many?',
      items: [ selectorData.numbers ],
    }).then( res => {
      this.quantity = res[0].description;
      console.log(this.quantity, res[0].description);
    }, err => { console.log(err); });
  }

  confirm() {
    console.log('Query nutritionix');
  }
  close() {
    this.modalCtrl.dismiss();
  }

  return() {
    this.modalCtrl.dismiss({
      data: `${this.quantity} ${this.unit} ${this.itemName}`
    });
  }

}
