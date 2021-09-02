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
    columns: []
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
    if (($event.ctrlKey || $event.metaKey) && $event.key == 'c') {
      $event.stopPropagation();
      this.dataCopied = true;
      this.copiedRows = this.selectedRows;
      this.element.show(this.copyMessage);
    }

    if (($event.ctrlKey || $event.metaKey) && $event.key == 'x') {
      $event.stopPropagation();
      this.selectedRows.forEach(value => {
        this.treegridObj.deleteRecord(value);
      })
      this.copiedRows = this.selectedRows;
    }
    if (($event.ctrlKey || $event.metaKey) && $event.key == 'v') {
      $event.stopPropagation();
      this.copiedRows.map(value => {
        value = JSON.parse(JSON.stringify(value))
        value.TaskID = Math.round(1456789 * (Math.random() * 100))
        value.taskData.TaskID = value.TaskID;
        this.treegridObj.addRecord(value.taskData, this.selectedRows[this.selectedRows.length - 1].index, "Below")
        // this.treegridObj.refresh()
        return value;
      })

    }
  }

  contextMenuItems = [
    'SortAscending',
    'SortDescending',
    'Edit',
    'Delete',
    'Save',
    'Copy',
    {
      text: 'Cut',
      target: '.e-rowcell',
      id: 'cut'
    },
    {
      text: 'Peste',
      target: '.e-rowcell',
      id: 'paste_bellow',
      items: [
        {
          text: 'Above',
          id: 'paste_above'
        },
        {
          text: 'Bellow',
          id: 'paste_bellow'
        },
        {
          text: 'Child',
          id: 'paste_child'
        },
      ]
    },
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
  copiedRows = [];
  toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  selectedColumn = null;

  ngOnInit(): void {
    this.pageSetting = {pageCount: 3};
    // console.log(this.data.dataSource);
  }

  contextMenuClick(args?: MenuEventArgs): void {
    console.log(args.item.id);
    if (args.item.id === '_gridcontrol_cmenu_Copy') {
      this.copiedRows = this.selectedRows;
    }
    if (args.item.id === 'paste_above') {
      console.log(this.copiedRows);
      console.log(this.selectedRows)
      this.copiedRows.forEach(value => {
        const data = {
          TaskID: value.TaskID,
          TaskName: value.TaskName,
          StartDate: value.StartDate,
          EndDate: value.EndDate,
          Progress: value.Progress,
          Priority: value.Priority,
          Duration: value.Duration,
        }
        if (value.ParentItem) {
          // @ts-ignore
          data.ParentItem = value.ParentItem;
        }

        if (value.isParent != undefined) {
          // @ts-ignore
          data.isParent = value.isParent;
        }

        data.TaskID = Math.round(1456789 * (Math.random() * 100))
        console.log(JSON.parse(JSON.stringify(data)));
        this.treegridObj.addRecord(JSON.parse(JSON.stringify(data)), this.selectedRows[0].index, "Above")
        // this.treegridObj.refresh()
      })
      // this.treegridObj.refresh()
    }
    if (args.item.id === 'cut') {
      this.selectedRows.forEach(value => {
        this.treegridObj.deleteRecord(value);

      })
      // this.treegridObj.refresh()
    }
    if (args.item.id === 'paste_bellow') {
      this.copiedRows.map(value => {
        value = JSON.parse(JSON.stringify(value))
        value.TaskID = Math.round(1456789 * (Math.random() * 100))
        value.taskData.TaskID = value.TaskID;
        this.treegridObj.addRecord(value.taskData, this.selectedRows[this.selectedRows.length - 1].index, "Below")
        // this.treegridObj.refresh()
      })
    }
    if (args.item.id === 'paste_child') {
      this.copiedRows.map(value => {
        value = JSON.parse(JSON.stringify(value))
        value.TaskID = Math.round(1456789 * (Math.random() * Math.random() * 100))
        value.taskData.TaskID = value.TaskID;
        this.selectedRows[this.selectedRows.length - 1].isParent = true;
        value.parentItem = this.selectedRows[this.selectedRows.length - 1];
        value.ParentItem = this.selectedRows[this.selectedRows.length - 1].TaskID;
        this.treegridObj.addRecord(value.taskData, this.selectedRows[this.selectedRows.length - 1].index, "Child")
      })
    }
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

    // @ts-ignore
    if (!isNullOrUndefined(this.columns[arg.column?.index])) {
      // @ts-ignore
      this.selectedColumn = arg.column.index;
    }
  }

  selectedRow(e) {
    if (e.data instanceof Array) {

      this.selectedRows = e.data
    } else {
      this.selectedRows = [e.data]
    }
  }


  add() {
    const dataSource = (this.treegridObj as TreeGridComponent)
      .dataSource as object[];
    console.log(this.copiedRows)
    dataSource.splice(this.selectedRows[this.copiedRows.length - 1].index, 0, ...this.copiedRows);
    this.copiedRows = [];
    (this.treegridObj as TreeGridComponent).dataSource = dataSource;

  }

}

