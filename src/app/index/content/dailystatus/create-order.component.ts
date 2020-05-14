import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTable, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  showLoader: boolean = false;
  addOrderProp: boolean = false;
  orderForm: FormGroup;
  todayDate: Date = new Date();
  submitted: boolean;
  button = 'Create';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private http: HttpClient) { }

  ngOnInit() {
    this.todayDate = new Date();
    this.orderForm = this.formBuilder.group({
      orderId: [],
      customerName: ['', Validators.required],
      totalItems: [0, Validators.required],
      customerAddress: ['', Validators.required],
      estimatedDeliveryDate: [new Date(), Validators.required],
      totalAmount: [0, Validators.required],
      amountReceived: [0, Validators.required],
      orderStatus: ['New'],
      emailId: [],
      mobileNo: [],
      orderReceivedDate: [],
      orderModifiedDate: [],
      comments: []
    });

    if(this.data != null && this.data.orderId != null)
    {
      this.button = 'Update';
      this.editOrder(this.data.orderId);
    }
  }

  editOrder(orderId)
  {
    const headerObj = new HttpHeaders()
      .set('Content-Type', 'application/json');

    this.http.get('http://localhost:8190/laundry/v1/order/'+orderId,{ headers: headerObj }).subscribe(
      res => {
        console.log(res);
        let obj : {} = res;
        this.orderForm.patchValue(res);
        this.f.estimatedDeliveryDate.setValue(new Date(obj['estimatedDeliveryDate']));
      },
      err => {
        this.openSnackBar('Order Load Failed : ' + err.error.message, 'badge-danger');
      }
    );
  }

  onSubmit() {

    this.submitted = true
    if (this.orderForm.invalid) {
      console.log(this.orderForm);
      return;
    }

    if(this.button == 'Create')
    {
      this.saveOrder();
    }
    else
    {
      this.updateOrder();
    }
 
  }

  saveOrder()
  {
    const headerObj = new HttpHeaders()
    .set('Content-Type', 'application/json');

  this.http.post('http://localhost:8190/laundry/v1/order', JSON.stringify(this.orderForm.value), { headers: headerObj }).subscribe(
    res => {
      console.log(res);
      this.showLoader = false;
      this.openSnackBar('Order Created Successfully', 'badge-success');
      this.addOrderProp = true;
      this.dialogRef.close(CreateOrderComponent);
    },
    err => {
      this.openSnackBar('Order Creation Failed : ' + err.error.message, 'badge-danger');
    }
  );
  }
  updateOrder() {
    this.submitted = true
    if (this.orderForm.invalid) {
      console.log(this.orderForm);
      return;
    }

    const headerObj = new HttpHeaders()
      .set('Content-Type', 'application/json');

    this.http.put('http://localhost:8190/laundry/v1/order/'+this.f.orderId.value, JSON.stringify(this.orderForm.value), { headers: headerObj }).subscribe(
      res => {
        console.log(res);
        this.showLoader = false;
        this.openSnackBar('Order Updated Successfully', 'badge-success');
        this.addOrderProp = true;
        this.dialogRef.close(CreateOrderComponent);
      },
      err => {
        this.openSnackBar('Order Updation Failed : ' + err.error.message, 'badge-danger');
      }
    );
  }


  openSnackBar(message: string, className: string | string[]) {
    this._snackBar.open(message, 'Close', {
      duration: 3000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: className
    });
  }

  appendZero(val) {
    return val > 9 ? val : '0' + val;
  }
  get f() { return this.orderForm.controls; }

  formReset() {

    this.f.orderId.setValue('');
    this.f.totalItems.setValue(0);
    this.f.customerName.setValue('');
    this.f.customerAddress.setValue('');
    this.f.estimatedDeliveryDate.setValue(new Date());
    this.f.totalAmount.setValue(0);
    this.f.amountReceived.setValue(0);
    this.f.orderStatus.setValue('New')
    this.f.emailId.setValue('');
    this.f.mobileNo.setValue('');
    this.f.comments.setValue('');
  }
}