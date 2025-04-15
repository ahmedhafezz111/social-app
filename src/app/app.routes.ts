import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { authguardGuard } from './core/guards/authguard/authguard.guard';
import { loggedguardGuard } from './core/guards/loggedguard/loggedguard.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [

    {path:'' , redirectTo:'timeline', title:"Timeline" , pathMatch:'full'},
    {canActivate:[authguardGuard],path:'timeline' , component:TimelineComponent , title:"Timeline"},
    {canActivate:[authguardGuard],path:'profile' , component:ProfileComponent , title:"Profile"},

    
    {canActivate:[loggedguardGuard], path:"register" , component:RegisterComponent , title:"register"},
    {canActivate:[loggedguardGuard],path:"login" , component:LoginComponent , title:"Login"}
];
