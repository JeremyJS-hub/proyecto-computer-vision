import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrincipalUIComponent } from './UI-Components/principal-ui/principal-ui.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'ui',
    pathMatch: 'full'
  },
  {
    path: 'ui',
    component: PrincipalUIComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
