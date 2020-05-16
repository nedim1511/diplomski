import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'disabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
