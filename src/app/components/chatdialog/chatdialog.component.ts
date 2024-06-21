import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatdialog',
  templateUrl: './chatdialog.component.html',
  styleUrls: ['./chatdialog.component.css'],
})
export class ChatdialogComponent implements OnInit {
  public isIframeOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleIframe(): void {
    this.isIframeOpen = !this.isIframeOpen;
  }
}
