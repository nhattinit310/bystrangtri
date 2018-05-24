import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../shared/services/jwt.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-theme-setup',
  templateUrl: './theme-setup.component.html',
  styleUrls: ['./theme-setup.component.scss']
})
export class ThemeSetupComponent implements OnInit {

  themes = [];
  fileName = 'Chưa có file nào được chọn.';
  selectedFile: string;
  messErr: string;
  constructor(private jwtService: JwtService,
    private userService: UserService) { }

  ngOnInit() {
    for (let i = 1; i <= 18; i++) {
      const name = i + '.jpg';
      this.themes.push({
        'url': name,
        'active': false
      });
    }
  }

  onFileChange(fileInput: any) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      if (e.target.result) {
        this.messErr = '';
        if ((fileInput.target.files[0].size / 1000) > 800) {
          this.fileName = 'Chưa có file nào được chọn.';
          this.selectedFile = null;
          this.messErr = 'Bạn cần chọn file có dung lượng nhỏ hơn 800kb';
          return;
        }
        getImgWidhHeight(fileInput.target.files[0], data => {
          if (data.width > 1920) {
            this.fileName = 'Chưa có file nào được chọn.';
            this.selectedFile = null;
            this.messErr = 'Bạn cần chọn file có chiều rộng nhỏ hơn 1920px';
            return;
          } else if (data.height > 1080) {
            this.fileName = 'Chưa có file nào được chọn.';
            this.selectedFile = null;
            this.messErr = 'Bạn cần chọn file có chiều dài nhỏ hơn 1080px';
            return;
          } else {
            this.fileName = fileInput.target.files[0].name;
            this.selectedFile = e.target.result.split(',')[1];
          }
        });
      }
    };

    reader.readAsDataURL(fileInput.target.files[0]);
  }

  chooseTheme(index) {
    const currentStatus = this.themes[index].active;
    this.themes.forEach(e => {
      e.active = false;
    });
    this.themes[index].active = !currentStatus;
  }

  clickImage(e) {
    convertFileToDataURLviaFileReader(e.src, data => {
      this.selectedFile = data.split(',')[1];
    });
  }

  saveTheme() {
    this.userService.setTheme(this.selectedFile)
      .subscribe(data => {
        this.jwtService.setTheme(this.selectedFile);
      });
  }


}

function getImgWidhHeight(file, callback) {
  const img = new Image();
  const _URL = window.URL;
  img.onload = function () {
    callback(img);
  };
  img.src = _URL.createObjectURL(file);
}


function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let dataURL;
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}

function convertFileToDataURLviaFileReader(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
