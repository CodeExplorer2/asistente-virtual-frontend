import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Service()
export class Recordatorios {

    private http = inject(HttpClient);

    obtenerRecordatorios() {
        return this.http.get<any[]>(`${environment.apiUrl}/recordatorios`)
    }

    crearRecordatorio(recordatorio: any) {
        return this.http.post(`${environment.apiUrl}/recordatorios`, recordatorio);
    }

    actualizarRecordatorio(id: any, datos: any) {
        return this.http.put(`${environment.apiUrl}/recordatorios/${id}`, datos);
    }

    eliminarRecordatorio(id: any) {
        return this.http.delete(`${environment.apiUrl}/recordatorios/${id}`);
    }

    recordar(texto: string) {
        return this.http.post(`${environment.apiUrl}/recordar`, { texto: texto });
    }
}