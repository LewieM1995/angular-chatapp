import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'chat', component: ChatComponent, canActivate: [authGuard]},
];
