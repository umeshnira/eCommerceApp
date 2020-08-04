import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // private loadScript(scriptUrl: string) {
  //   return new Promise((resolve, reject) => {
  //     const scriptElement = document.createElement('script');
  //     scriptElement.src = scriptUrl;
  //     scriptElement.onload = resolve;
  //     document.body.appendChild(scriptElement);
  //   })
  // }
  // ngAfterViewInit() {
  //   this.loadScript('assets/plugins/raphel-min.js');
  //   this.loadScript('assets/plugins/morris/morris.min.js');
  // }
}