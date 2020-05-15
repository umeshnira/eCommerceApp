import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveForLaterService {
  public saveLaterList = [];
  constructor() { }

  addToMylaterList(prod) {

    this.saveLaterList.push(prod);
  }
  getLaterList() {
    return this.saveLaterList;
  }
  deleteLaterListItem(productID){
    for(var i=0;i<this.saveLaterList.length;i++){
      if(this.saveLaterList[i].productID==productID){
       this.saveLaterList.splice(i, 1);
       break;
      }
    }
    return this.saveLaterList;
 }

}
