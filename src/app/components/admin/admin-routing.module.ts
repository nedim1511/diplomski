import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
    {
      path: "",
      children: [
        { path: '', redirectTo: 'all-products' },
        { path: "all-products", component: AdminComponent },
        { path: "add-product", component: AddProductComponent }
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
