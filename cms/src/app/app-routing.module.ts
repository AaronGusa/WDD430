import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentDetailComponent } from "./documents/document-detail/document-detail.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentListComponent } from "./documents/document-list/document-list.component";
import { DocumentsComponent } from "./documents/documents.component";
import { MessagesComponent } from "./messages/messages.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/documents', pathMatch: 'full'},
    { path: 'documents', component: DocumentsComponent, children: [
        { path: 'new', component: DocumentEditComponent },
        { path: ':id', component: DocumentDetailComponent},
        { path: ':id/edit', component: DocumentEditComponent }
    ]},
    { path: 'messages', component: MessagesComponent},
    { path: 'contacts', component: ContactsComponent}
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}