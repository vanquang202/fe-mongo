import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent {
  url: any = null;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    const item: any = localStorage.getItem("file-local");
    if (item) {
      const url: any = JSON.parse(item);
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
