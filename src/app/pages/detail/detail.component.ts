import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { LetterService } from 'src/app/services/letter.service';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  loading: boolean = true;
  data: any = {};
  constructor(private sanitizer: DomSanitizer, private routeActibe: ActivatedRoute, private letterS: LetterService) { }

  ngOnInit() {
    var id = this.routeActibe.snapshot.paramMap.get('id');
    this.getDetail(id);
  }

  async getDetail(id: any) {
    var formData = new FormData();
    formData.append("_id", id);
    const res: any = await this.letterS.show(formData);
    if (res) {
      this.loading = false;
      this.data = JSON.parse(res.payload);
    }
  }

  renderFile(url: string, mime: string) {
    let urlResult = this.convertUrl(url, mime);
    return this.sanitizer.bypassSecurityTrustResourceUrl(urlResult);
  }

  convertUrl(url: string, mime: string) {
    var byteCharacters = atob(url);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: mime });
    return URL.createObjectURL(blob);
  }

  viewFile(url: any) {
    localStorage.setItem("file-local", JSON.stringify(url));
    window.open('http://localhost:4200/view-file');
    return false;
  }
}
