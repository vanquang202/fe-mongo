import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { LetterService } from 'src/app/services/letter.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from 'src/app/components/create/create.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data: any = [];
  total: any;
  isLoadDing: boolean = true;
  constructor(private route: Router, private letterS: LetterService, private event: EventService, private modalS: NgbModal) { }

  ngOnInit(): void {
    this.getList();
    this.event.getEvent().subscribe(
      (res: any) => {
        if (res.event == "refresh") {
          this.getList();
        }
        else if (res.event == "search") {
          if (this.data.length == this.total) return;
          if (res.data.isscroll) this.isLoadDing = true;
          this.getList('?subject=' + res.data.data);
        }
      }
    )
  }
  async getList(search: any = '') {
    const res: any = await this.letterS.getList(search);
    let data = null;
    if (res.status == 2) {
      data = JSON.parse(res.payload);
    } else {
      data = res.payload;
    }
    this.event.sendEvent('stepLimit', {});
    this.total = res.total;
    this.data = data;
    this.isLoadDing = false;
  }

  showItem(data: any) {
    this.route.navigate(['show', data._id]);
  }

  viewFile(url: any) {
    localStorage.setItem("file-local", JSON.stringify(url));
    window.open('http://localhost:4200/view-file');
    return false;
  }

  update(data: any) {
    const m = this.modalS.open(CreateComponent, { size: 'md', scrollable: true });
    m.componentInstance.data = data;
    m.componentInstance.files = data.files;
  }
  async delete(data: any) {
    if (confirm("Are you sure delete this?")) {

      var formData = new FormData();
      formData.append("_id", data._id);
      const res = await this.letterS.delete(formData);
      if (res) {
        this.getList();
      }
    }
    return false;
  }
}
