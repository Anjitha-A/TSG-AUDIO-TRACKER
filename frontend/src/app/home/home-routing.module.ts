import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { AdminListComponent } from '@app/admin-list/admin-list.component';
import { AdminCategoryListComponent } from '@app/admin-category-list/admin-category-list.component';
import { AddAudioComponent } from '@app/add-audio/add-audio.component';
import { UserhomeComponent } from '@app/userhome/userhome.component';
import { EditAudioComponent } from '@app/edit-audio/edit-audio.component';
import { AuthenticationGuard } from '@app/auth';
import { EditComponent } from '@app/edit/edit.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
    // { path: 'userhome',component:UserhomeComponent, pathMatch: 'full' },
    { path: 'adminlist',component:AdminListComponent, pathMatch: 'full',canActivate:[AuthenticationGuard] },
    { path: 'categorylisting',component:AdminCategoryListComponent, pathMatch: 'full', canActivate:[AuthenticationGuard] },
    { path: 'add_audio',component:AddAudioComponent, pathMatch: 'full', canActivate:[AuthenticationGuard] },
    // { path: 'edit',component:EditAudioComponent, pathMatch: 'full',  },
    { path: 'edit',component:EditComponent, pathMatch: 'full', canActivate:[AuthenticationGuard] },
    
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
