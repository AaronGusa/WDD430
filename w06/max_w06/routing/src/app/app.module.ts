import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactive-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

// const appRoutes: Routes = [
//   { path: '', component: HomeComponent }, //localhost:4200/
//   { path: 'servers', component: ServersComponent, children: [
//     { path: ':id', component: ServerComponent }, //localhost:4200/servers/(server id number)
//     { path: ':id/edit', component: EditServerComponent } //localhost:4200/servers/id and edit
//     //children routes need a separate outlet because they cannot overwrite the servers component
//     //they should be loaded nested into the server component. See the servers html
//     ]
//   }, //localhost:4200/servers
  
//   //Initial pathing for users
//     //{ path: 'users', component: UsersComponent }, //localhost:4200/users
//     //{ path: 'users/:id/:name', component: UserComponent }, //localhost:4200/users
//   //Child pathing for users
//   { path: 'users', component: UsersComponent, children: [
//     { path: ':id/:name', component: UserComponent } //localhost:4200/users
//     ] 
//   }, //localhost:4200/users
//   { path: 'not-found', component: PageNotFoundComponent },
//   { path: '**', redirectTo: '/not-found' } //** is the wildcard route. Must be the last in the array becuase of top-bottom parsing.


// ];
// // Pathing is required to follow the above syntax. Ensure that the string in the path does no include the / because it will result in a double /. 
// // This variable appRoutes will be called in the imports section fo the @NgModule through RouterModule.forRoot() (needs to be imported)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
    // RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService, AuthService, AuthGuard, CanDeactivateGuard, ServerResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
