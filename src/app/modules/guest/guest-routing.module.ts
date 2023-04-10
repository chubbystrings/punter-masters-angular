import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuestGuard } from "src/app/services/guest.guard";
import { HomeComponent } from "./home/home.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [GuestGuard]},
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [GuestGuard]}
]

@NgModule({
  imports:[ RouterModule.forChild(routes)],
  exports: [ RouterModule]
})
export class GuessRoutingModule {}
