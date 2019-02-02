import { AuthService } from './../../services/auth.service';
import { Image } from './../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.page.html',
  styleUrls: ['./record-detail.page.scss'],
})
export class RecordDetailPage implements OnInit {
  image: Image = {
    url: 'https://google.com'
  };
  imageId = null;
  imageUrl = null;
  constructor(private route: ActivatedRoute, private nav: NavController,
              private auth: AuthService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.imageId = this.route.snapshot.params['id'];
    if (this.imageId) {
      this.loadImage();
    }
  }

  async loadImage() {
    const loading = await this.loadingController.create({
      message: 'Loading image...'
    });
    await loading.present();

    this.auth.getImage(this.imageId).subscribe(res => {
      loading.dismiss();
      this.image = res;
    });
    // this.imageUrl = this.image.url;
  }

}
