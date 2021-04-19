import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrincipalUIComponent } from './UI-Components/principal-ui/principal-ui.component';
import { SignInFormComponent } from './UI-Components/signIn/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './UI-Components/signUp/sign-up-form/sign-up-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ui',
    pathMatch: 'full'
  },
  {
    path: 'signIn',
    component: SignInFormComponent
  },
  {
    path: 'signUp',
    component: SignUpFormComponent
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
