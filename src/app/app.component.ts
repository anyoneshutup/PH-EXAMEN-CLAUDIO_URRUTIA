import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline, addOutline, trashOutline } from 'ionicons/icons'; // Aquí añadí los iconos que importé


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      trash: trashOutline,        // Asocia nombre "trash" al icono de "Eliminar"
      settings: settingsOutline,  // Asocia el nombre "settings" al icono de "Configuracion"
      add: addOutline,            // Asocia el nombre "add" al icono para ir a Gestion de citas
    });
  }
}
