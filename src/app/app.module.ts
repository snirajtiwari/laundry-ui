import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './index/footer/footer.component';
import { HeaderComponent } from './index/header/header.component';
import { MenuComponent } from './index/menu/menu.component';
import { DashboardComponent } from './index/content/dashboard/dashboard.component';
import { UserslistComponent } from './index/content/users/userslist/userslist.component';
import { BarchartComponent } from './index/content/dashboard/barchart/barchart.component';
import { PiechartComponent } from './index/content/dashboard/piechart/piechart.component';
import { RadarchartComponent } from './index/content/dashboard/radarchart/radarchart.component';
import { LinechartComponent } from './index/content/dashboard/linechart/linechart.component';


import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatSnackBarModule,MatDatepickerModule, MatDialogModule
} from '@angular/material';

import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrderComponent } from './index/content/dailystatus/create-order.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPopoverImageModule } from 'ngx-popover-image';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpwdComponent,
    IndexComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
    UserslistComponent,
    BarchartComponent,
    PiechartComponent,
    RadarchartComponent,
    LinechartComponent,
    CreateOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    MatDialogModule,
    MatExpansionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,MatNativeDateModule,
    MatSortModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatSnackBarModule,MatDatepickerModule,
    MatRippleModule,
    NgbDatepickerModule ,
    NgxPopoverImageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateOrderComponent]
})
export class AppModule { }
