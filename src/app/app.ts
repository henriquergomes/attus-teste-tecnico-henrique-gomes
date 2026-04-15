import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './features/user-list/user-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
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
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Attus Technical Challenge</span>
    </mat-toolbar>

    <mat-tab-group>
      <mat-tab label="Listagem de Usuários (Desafio 4)">
        <app-user-list></app-user-list>
      </mat-tab>

      <mat-tab label="Exercícios (Signals/NgRx)">
        <div class="exercises-container">
          <section>
            <h3>3.1 Signals Counter</h3>
            <app-signals-counter></app-signals-counter>
          </section>

          <hr />

          <section>
            <h3>3.2 NgRx To-do</h3>
            <p>Implementação de Actions, Reducers, Selectors e Effects concluída no código.</p>
            <p><em>(Veja a pasta src/app/exercises/todo-ngrx)</em></p>
          </section>
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [
    `
      .exercises-container {
        padding: 40px;
        max-width: 800px;
        margin: 0 auto;
      }
      section {
        margin-bottom: 40px;
      }
    `,
  ],
})
export class App {}
