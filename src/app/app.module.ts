import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxCalendarModule , IgxDialogModule} from 'igniteui-angular';
import { IgxIconModule } from 'igniteui-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatRadioModule} from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import {
  AppHeaderModule,
  AppFooterModule,
} from '@coreui/angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { WidgetsComponent } from './views/widgets/widgets.component';
import { StatsComponent } from './views/widgets/stats/stats.component';
import { GoalComponent } from './views/widgets/goal/goal.component';
import { AchievementsComponent } from './views/widgets/achievements/achievements.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TasksComponent } from './views/widgets/tasks/tasks.component';
import { TasksCalendarComponent } from './views/widgets/tasks-calendar/tasks-calendar.component';

import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule, MatFormFieldModule, MatInputModule, MatRippleModule} from '@angular/material';
import { SignupComponent } from './views/signup/signup.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import { LandingComponent } from './views/landing/landing.component';
import { AddSessionComponent } from './views/add-session/add-session.component';
import { AddExerciceComponent } from './views/add-exercice/add-exercice.component';
import { AdminService } from './services/admin.service';
import { CoachService } from './services/coach.service';
import { EventService } from './services/event.service';
import { ExercicesService } from './services/exercices.service';
import { MemberService } from './services/member.service';
import { TrainingSessionService } from './services/training-session.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { Config } from './interceptor/config';
import { ListUersComponent } from './views/listing/list-uers/list-uers.component';
import { ListMembersComponent } from './views/listing/list-members/list-members.component';
import { ListCoachsComponent } from './views/listing/list-coachs/list-coachs.component';
import { ListAdminsComponent } from './views/listing/list-admins/list-admins.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './token-getter';
import { EditUserComponent } from './views/edit-user/edit-user.component';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
@NgModule({
  declarations: [
    AppComponent,
    WidgetsComponent,
    StatsComponent,
    GoalComponent,
    AchievementsComponent,
    TasksComponent,
    TasksCalendarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    LandingComponent,
    AddSessionComponent,
    AddExerciceComponent,
    ListUersComponent,
    ListMembersComponent,
    ListCoachsComponent,
    ListAdminsComponent,
    EditUserComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    AppHeaderModule,
    AppFooterModule,
    MatRadioModule,
    AngularFontAwesomeModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    ChartsModule,
    TabsModule.forRoot(),
    AppRoutingModule,
    IgxDialogModule,
    BrowserAnimationsModule,
    IgxCalendarModule,
    IgxIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule, MatInputModule, MatRippleModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    })
  ],
  providers: [
    AdminService,
    CoachService,
    EventService,
    ExercicesService,
    MemberService,
    TrainingSessionService,
    LoginService,
    AuthService,
    AuthGuardService,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Config,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
