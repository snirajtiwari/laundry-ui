import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateOrderComponent } from '../dailystatus/create-order.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient,public dialog: MatDialog) { }

  dtOptions: DataTables.Settings = {};
  orders: any = [];
  totalRequired = false;
  totalRows = 0;
  pendingOrders: any = [];
  completedOrders: any = [];
  columns = [
    { data: "orderId", id: 'order_id' },
    { data: "customerName", id: 'customer_name' },
    { data: "totalItems", id: 'total_items' },
    { data: "orderStatus", id: 'order_status' },
    { data: "estimatedDeliveryDate", id: 'estimated_delivery_date' },
    { data: "orderReceivedDate", id: 'order_received_date' },
  ];


  ngOnInit() {
    this.loadTableData();
    this.completedOrdersFetch();
    this.recentPending();
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
        data['pageNo'] = 1;
        data['pageSize'] = 5;
        data['totalRequired'] = true;
        data['total'] = 5;
        data['orderColumnName'] = 'order_id';
        data['orderColumnValue'] = 'desc';

        this.http
          .post<any>('http://localhost:8190/laundry/v1/orders/page', data, {})
          .subscribe(resp => {
            this.orders = resp.data;
            callback({
              recordsTotal: 5,
              recordsFiltered: 5,
              data: []
            });
          });
      },
      columns: this.columns
    };
  }

  completedOrdersFetch() {
    const headerObj = new HttpHeaders()
      .set('Content-Type', 'application/json');

    let data = {};
    data['pageNo'] = 1;
    data['pageSize'] = 3;
    data['totalRequired'] = false;
    data['total'] = 3;
    data['orderColumnName'] = 'order_id';
    data['orderColumnValue'] = 'desc';

    let filterData = [];
    let temp = {};
    temp['filterColumnName'] = 'order_status';
    temp['filterColumnValue'] = 'Completed';
    filterData.push(temp);
    data['filterInfo'] = filterData;


    this.http.post('http://localhost:8190/laundry/v1/orders/page', JSON.stringify(data), { headers: headerObj }).subscribe(
      res => {
        console.log(res);
        this.completedOrders = res['data'];;
      },
      err => {
        console.log('Error in call');
      }
    );
  }

  recentPending() {
    const headerObj = new HttpHeaders()
      .set('Content-Type', 'application/json');

    let data = {};
    data['pageNo'] = 1;
    data['pageSize'] = 3;
    data['totalRequired'] = false;
    data['total'] = 3;
    data['orderColumnName'] = 'order_id';
    data['orderColumnValue'] = 'desc';
    let filterData = [];
    let temp = {};
    temp['filterColumnName'] = 'order_status';
    temp['filterColumnValue'] = 'Open';
    filterData.push(temp);
    data['filterInfo'] = filterData;


    this.http.post('http://localhost:8190/laundry/v1/orders/page', JSON.stringify(data), { headers: headerObj }).subscribe(
      res => {
        console.log(res);
        this.pendingOrders = res['data'];
      },
      err => {
        console.log('Error in call');
      }
    );
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
        this.ngOnInit();
      }
    });
    // On close

  }

}

