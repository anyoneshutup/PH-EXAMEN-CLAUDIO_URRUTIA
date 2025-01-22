import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Aviso } from 'src/app/models/aviso.model';  // Importar la interfaz Aviso

@Injectable({
  providedIn: 'root',
})
export class AvisosService {
  private KEY = 'avisos';

  async obtenerAvisos(): Promise<Aviso[]> {
    const { value } = await Preferences.get({ key: this.KEY });
    return value ? JSON.parse(value) : [];
  }

  async agregarAviso(aviso: Aviso): Promise<void> {
    const avisos = await this.obtenerAvisos();
    avisos.push(aviso);
    await Preferences.set({ key: this.KEY, value: JSON.stringify(avisos) });
  }

  async eliminarAviso(id: number): Promise<void> {
    let avisos = await this.obtenerAvisos();
    avisos = avisos.filter((aviso: Aviso) => aviso.id !== id);  // Filtramos usando la interfaz Aviso
    await Preferences.set({ key: this.KEY, value: JSON.stringify(avisos) });
  }
}
