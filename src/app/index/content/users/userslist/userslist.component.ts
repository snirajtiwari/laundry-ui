import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CreateOrderComponent } from '../../dailystatus/create-order.component';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserslistComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: HttpClient) { }

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  orders: any = [];
  totalRequired = false;
  totalRows = 0;
  columns = [
    { data: "orderId", id: 'order_id' },
    { data: "customerName", id: 'customer_name' },
    { data: "totalItems", id: 'total_items' },
    { data: "orderStatus", id: 'order_status' },
    { data: "estimatedDeliveryDate", id: 'estimated_delivery_date' },
    { data: "orderReceivedDate", id: 'order_received_date' },
  ];

  ngOnInit() {
    this.totalRequired = true;
    this.loadTableData();
  }

  loadTableData() {
    this.totalRows = 0;
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: (dataTablesParameters: any, callback) => {
        console.log(dataTablesParameters);
        let data = {};
        data['pageNo'] = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        data['pageSize'] = dataTablesParameters.length;
        data['totalRequired'] = this.totalRequired;
        data['total'] = this.totalRows;
        data['orderColumnName'] = this.columns[dataTablesParameters.order[0].column].id;
        data['orderColumnValue'] = dataTablesParameters.order[0].dir;

        let filterValue = $('#filterColumn').val();
        if (filterValue != null && filterValue != '') {
          let filterData = [];
          let temp = {};
          temp['filterColumnName'] = filterValue;
          temp['filterColumnValue'] = $('#filterValue').val();
          filterData.push(temp);
          data['filterInfo'] = filterData;
        }

        this.http
          .post<any>('http://localhost:8190/laundry/v1/orders/page', data, {})
          .subscribe(resp => {
            this.totalRequired = false;
            this.totalRows = resp.total;
            this.orders = resp.data;
            callback({
              recordsTotal: this.totalRows,
              recordsFiltered: this.totalRows,
              data: []
            });
          });
      },
      columns: this.columns
    };
  }

  applyFilter() {
    this.totalRequired = true;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  onChange() {
    $('#filterValue').val('');
  }

  reset() {
    $('#filterValue').val('');
    $('#filterColumn').val('');
    this.loadTableData();
  }

  openOrderDialog(row) {

    // Open Dialog
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      disableClose: true,
      data: {
        orderId: row != null ? row.orderId : null
        //departmentName: row.departmentName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.addOrderProp)
      {
        this.applyFilter();
      }
    });
    // On close

  }
}
