import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactive-guard.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }, //localhost:4200/
  { 
    path: 'servers', 
    //canActivate: [AuthGuard]
    canActivateChild:[AuthGuard], 
    component: ServersComponent, 
    children: [
      { path: ':id', component: ServerComponent }, //localhost:4200/servers/(server id number)
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] } //localhost:4200/servers/id and edit
    ]
  }, //localhost:4200/servers
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent } //localhost:4200/users
    ] 
  }, //localhost:4200/users
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' } //** is the wildcard route. Must be the last in the array becuase of top-bottom parsing.
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
