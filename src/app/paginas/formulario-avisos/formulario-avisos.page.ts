import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AvisosService } from '../../servicios/avisos.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, 
  IonButton, IonTextarea, IonBackButton, IonButtons, IonText, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Aviso } from 'src/app/models/aviso.model';

@Component({
  selector: 'app-formulario-avisos',
  standalone: true,
  templateUrl: './formulario-avisos.page.html',
  styleUrls: ['./formulario-avisos.page.scss'],
  imports: [IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, 
  IonButton, IonTextarea, IonButtons, IonBackButton, IonText, IonIcon, FormsModule, CommonModule, ReactiveFormsModule]
})
export class FormularioAvisosPage {
  form: FormGroup;
  imagen: string | null = null;

  constructor(private fb: FormBuilder, private avisosService: AvisosService) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  async capturarFoto() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 90,
    });
  
    // Verificar si image.dataUrl está definido antes de asignarlo
    this.imagen = image.dataUrl || null;
  }

  guardarAviso() {
    // Crear el objeto aviso con la interfaz Aviso
    const nuevoAviso: Aviso = {
      id: Date.now(),  // Usar un valor único como ID
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      imagen: this.imagen,
      fecha: new Date().toISOString(),
    };

    // Pasar el objeto nuevoAviso al servicio
    this.avisosService.agregarAviso(nuevoAviso).then(() => {
      this.form.reset();
      this.imagen = null;
    });
  }
}