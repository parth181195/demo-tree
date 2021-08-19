import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';
import {TreeGridComponent} from '@syncfusion/ej2-angular-treegrid';
import {
  EditSettingsModel,
  FilterSettingsModel,
  PageSettingsModel,
  SortSettingsModel
} from '@syncfusion/ej2-grids';
import {SelectionSettingsModel} from '@syncfusion/ej2-dropdowns/src';
import {JsonAdaptor} from '@syncfusion/ej2-data/src/adaptors';
import {data} from './data';
import {MenuEventArgs} from '@syncfusion/ej2-navigations';
import {BeforeOpenCloseEventArgs} from '@syncfusion/ej2-inputs';
import {getValue, isNullOrUndefined} from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public data = data;
  @ViewChild('element') element;
  public position = {X: 'Right', Y: 'Bottom'};
  public pageSetting: Object;
  copyMessage = {title: 'Information !', content: 'copied Rows', cssClass: 'e-toast-info'}
  filterSettings: FilterSettingsModel = {type: 'Menu'};
  sortSettings: SortSettingsModel = {
    columns: [{field: 'TaskName', direction: 'Ascending'}]
  };
  pageSettings: PageSettingsModel = {pageCount: 3};
  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    // @ts-ignore
    mode: 'Row'
  };
  dataCopied = false;
  showTable = true;
  @ViewChild('treegridObj')
  public treegridObj: TreeGridComponent;
  columns = [
    {header: 'Task Name', name: 'TaskName', format: '', align: 'Right'},
    {header: 'Task ID', name: 'TaskID', format: '', align: 'Right'},
    {header: 'Start Date', name: 'StartDate', format: 'yMd', align: ''},
    {header: 'End Date', name: 'EndDate', format: 'yMd', align: 'Right'},
    {header: 'Progress', name: 'Progress', format: '', align: 'Right'},
    {header: 'Priority', name: 'Priority', format: '', align: 'Right'},
    {header: 'Duration', name: 'Duration', format: '', align: 'Right'}
  ];

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 67) {
      this.dataCopied = true;
      console.log('copy');
      this.element.show(this.copyMessage);
    }
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 86) {
      if (this.dataCopied) {
        console.log('pest');
        this.add();
        // @ts-ignore
        console.log((this.treegridObj as TreeGridComponent).dataSource.length);
      }
    }
  }

  contextMenuItems = [
    'SortAscending',
    'SortDescending',
    'Edit',
    'Delete',
    'Save',
    'Copy',
    'Peste',
    'Cancel',
    'FirstPage',
    'PrevPage',
    'LastPage',
    'NextPage',
    {text: 'Add Column', target: '.e-headercell', id: 'add_column'},
    {text: 'Delete Column', target: '.e-headercell', id: 'delete_column'}
  ];
  selectionSettings: SelectionSettingsModel = {
    // @ts-ignore
    type: 'Multiple',
    showCheckbox: true
  };
  selectedRows = [];
  toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  selectedColumn = null;

  ngOnInit(): void {
    // this.data = new DataManager({
    //   // adaptor: new JsonAdaptor(),
    //   offline: true,
    //   json: data
    // });
    this.pageSetting = {pageCount: 3};
    // console.log(this.data.dataSource);
  }

  contextMenuClick(args?: MenuEventArgs): void {
    if (args.item.id === 'add_column') {
      this.addColumn();
    } else if (args.item.id === 'delete_column') {
      if (this.selectedColumn != null) {
        this.filterSettings = {type: 'Menu'};
        this.sortSettings = {columns: []};
        this.columns.splice(this.selectedColumn, 1);
        this.selectedColumn = null;
      }
    }
  }


  onCreate() {
  }

  addColumn() {
    let name = 'Column' + this.columns.length;
    this.columns.push({
      name: name,
      format: '',
      header: 'Column ' + this.columns.length,
      align: 'Right'
    });
    const data = this.data.map(row => {
      row[name] = 'Text';
      return row;
    });
    (this.treegridObj as TreeGridComponent).dataSource = data;
  }

  contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
    console.log(arg);
    // @ts-ignore
    console.log(isNullOrUndefined(this.columns[arg.column.index]));
    // @ts-ignore
    if (!isNullOrUndefined(this.columns[arg.column.index])) {
      // @ts-ignore
      this.selectedColumn = arg.column.index;
    }
  }

  selectedRow(e) {
    console.log(e);
    if (e.data instanceof Array) {

      this.selectedRows = e.data
    } else {
      this.selectedRows = [e.data]
    }
    console.log(this.selectedRows);
  }



  add() {
    const dataSource = (this.treegridObj as TreeGridComponent)
      .dataSource as object[];
    this.selectedRows.forEach(value => {
      dataSource.push(value);
    });
    this.selectedRows = [];
    (this.treegridObj as TreeGridComponent).dataSource = dataSource;
    // this.showTable = false;
    this.treegridObj.refresh();
    // setTimeout(() => {
    //   this.showTable = true;
    // }, 200)
  }
}

