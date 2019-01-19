import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { LandingComponent } from './views/landing/landing.component';
import { RegisterComponent } from './views/register/register.component';
import { AddSessionComponent } from './views/add-session/add-session.component';
import { AddExerciceComponent } from './views/add-exercice/add-exercice.component';
import { ListMembersComponent } from './views/listing/list-members/list-members.component';
import { ListAdminsComponent } from './views/listing/list-admins/list-admins.component';
import { ListCoachsComponent } from './views/listing/list-coachs/list-coachs.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';
import { EditUserComponent } from './views/edit-user/edit-user.component';
import { RolesEnum } from './utils/roles-enum.enum';
import { ContactUsComponent } from './views/contact-us/contact-us.component';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path: 'exercice',
    component: AddExerciceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'session',
    component: AddSessionComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole: RolesEnum.COACH.valueOf()
    }
  },
  {
    path: 'land',
    component: LandingComponent
  },
  {
    path: 'list-members',
    component : ListMembersComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole: RolesEnum.ADMINISTRATOR.valueOf()
    }
  },
  {
    path: 'list-admins',
    component : ListAdminsComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole: RolesEnum.ADMINISTRATOR.valueOf()
    }
  },
  {
    path: 'list-coachs',
    component : ListCoachsComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole: RolesEnum.ADMINISTRATOR.valueOf()
    }
  },
  {
    path: 'edit-user',
    component: EditUserComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
