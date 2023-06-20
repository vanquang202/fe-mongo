import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LetterService } from 'src/app/services/letter.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  data: any = {};
  files: any = [];
  constructor(private authS: AuthService, private letterS: LetterService, private activeModal: NgbActiveModal, private event: EventService) {

  }
  async send() {
    let res = null;
    let strFile = '';
    let formData = new FormData();
    formData.append("user_id", this.authS.getUser()._id);
    formData.append("subject", this.data.subject);
    formData.append("content", this.data.content);
    formData.append("email", this.data.email);
    for (let index = 0; index < this.files.length; index++) {
      if (this.files[index].name) {
        formData.append("datafiles[]", this.files[index]);
      } else {
        strFile = strFile + "@" + this.files[index].filename;
      }
    }
    if (this.data._id) {
      formData.append("_id", this.data._id);
      formData.append("dataFileOld", strFile);
      res = await this.letterS.update(formData);
    } else {
      res = await this.letterS.store(formData);
    }

    if (res) {
      await this.event.sendEvent('refresh', {});
      this.activeModal.close();
    }
  }
  onFileSelected(event: any) {
    for (let index = 0; index < event.target.files.length; index++) {
      event.target.files[index].url = URL.createObjectURL(event.target.files[index]);
      this.files.push(event.target.files[index]);
    }
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

  removeFile(name: string) {
    this.files = this.files.filter((f: any) => f.name != name && f.filename != name);
  }
}
