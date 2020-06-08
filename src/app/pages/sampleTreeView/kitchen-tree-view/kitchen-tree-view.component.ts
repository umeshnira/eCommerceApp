import { Component, OnInit } from '@angular/core';
import { NodeCheckEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-kitchen-tree-view',
  templateUrl: './kitchen-tree-view.component.html',
  styleUrls: ['./kitchen-tree-view.component.css']
})
export class KitchenTreeViewComponent {

  constructor() { }

  // ngOnInit(): void {

  //   this.treeView();
  // }

   //define the data source
   public continents = [
    {
    code: 'AF', name: 'Africa', countries: [
        { code: 'NGA', name: 'Nigeria' },
        { code: 'EGY', name: 'Egypt' },
        { code: 'ZAF', name: 'South Africa' }
    ]
}

];
public field = { dataSource: this.continents, id: 'code', text: 'name', child: 'countries' };
public allowEditing = true;
public editing(args: NodeCheckEventArgs) {
    //check whether node is root node or not
    if (args.node.parentNode.parentNode.nodeName !== "LI") {
        console.log('node', args.node);
        // args.cancel = true;
    }

}
}
