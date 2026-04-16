import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './features/user-list/user-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SignalsCounterComponent } from './exercises/signals-counter/signals-counter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    UserListComponent,
    SignalsCounterComponent,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
