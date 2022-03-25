import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: "app-custom-confirm",
  templateUrl: "./custom-confirm.component.html",
  styleUrls: ["./custom-confirm.component.css"],
})
export class CustomConfirmComponent implements OnInit {
  bsModalRef: BsModalRef;
  onClose: Subject<boolean>;
  @Input() data: string;

  constructor() { }


  ngOnInit(): void {
    this.onClose = new Subject();
  }

  confirm() {
    this.onClose.next(true);
  }

  closeModal() {
    this.onClose.next(false);
  }
}
