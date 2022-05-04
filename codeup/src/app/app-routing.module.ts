import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ForumComponent} from "./forum/forum.component";
import {PostComponent} from "./post/post.component";
import {SearchComponent} from "./search/search.component";
import {AccountComponent} from "./account/account.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CreatePostComponent} from "./create-post/create-post.component";
import {UserResolver} from "./resolvers/userResolver";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path : 'forum/:id', component: ForumComponent },
  { path : 'comment/:id', component: ForumComponent },
  { path : 'post/:id', component: PostComponent },
  { path : 'search', component: SearchComponent },
  {
    path : 'account/:id',
    component: AccountComponent,
    resolve: {
      userResolver: UserResolver
    },
  },
  { path : 'my-account', component: AccountComponent },
  { path : 'post-create', component: CreatePostComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
