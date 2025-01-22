import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvisosService } from 'src/app/servicios/avisos.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, 
  IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Aviso } from 'src/app/models/aviso.model';
import { AlertController } from '@ionic/angular';  // Asegúrate de importar AlertController

@Component({
  selector: 'app-listado-avisos',
  standalone: true,
  templateUrl: './listado-avisos.page.html',
  styleUrls: ['./listado-avisos.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, 
    IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, IonFab, IonFabButton, FormsModule, CommonModule, ReactiveFormsModule, RouterLink]
})
export class ListadoAvisosPage {
  avisos: Aviso[] = [];  // Usar la interfaz Aviso

  constructor(
    private avisosService: AvisosService,
    private alertController: AlertController // Inyectamos AlertController
  ) {}

  ionViewWillEnter() {
    this.avisosService.obtenerAvisos().then((data) => {
      this.avisos = data;
    });
  }

  async confirmarEliminacion(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este aviso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.avisosService.eliminarAviso(id).then(() => {
              this.ionViewWillEnter();
            });
          },
        },
      ],
    });

    await alert.present();
  }
}