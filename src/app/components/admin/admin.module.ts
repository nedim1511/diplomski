import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { GridModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule,
    GridModule
  ]
})
export class AdminModule {}
