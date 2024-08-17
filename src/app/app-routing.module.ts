import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrcodesListComponent } from './components/qrcodes-list/qrcodes-list.component';
import { AddQrcodeComponent } from './components/add-qrcode/add-qrcode.component';
import { VerifyCodesComponent } from './components/verify-codes/verify-codes.component';
import { SearchComponent } from './components/search/search.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { SigninComponent } from './Authentication/signin/signin.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { AuthGuard } from './services/Auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'verification', pathMatch: 'full' },
  { path: 'qrcodes', component: QrcodesListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddQrcodeComponent, canActivate: [AuthGuard] },
  { path: 'verification', component: VerifyCodesComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'organization', component: OrganizationComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }