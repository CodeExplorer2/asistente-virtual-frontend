import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recordatorios } from '../services/recordatorios';

@Component({
  selector: 'app-panel-recordatorios',
  imports: [FormsModule],
  styleUrl: './panel-recordatorios.css',
  templateUrl: './panel-recordatorios.html',
})
export class PanelRecordatorios {
  private recordatorios = inject(Recordatorios);

  protected readonly listaRecordatorios = signal<any[]>([]);
  protected readonly cargando = signal(false);
  protected readonly filtro = signal<'todos' | 'trabajo' | 'personal'>('todos');
  protected readonly textoLibre = signal('');
  protected readonly mensajeError = signal('');
  protected readonly confirmacion = signal('');

  private temporizadorConfirmacion: any;
  private temporizador: any;

  protected readonly recordatoriosFiltrados = computed(() => {
    const filtroActual = this.filtro();
    const lista = this.listaRecordatorios();
    return filtroActual === 'todos' ? lista : lista.filter(r => r.categoria === filtroActual);
  });

  protected readonly pendientes = computed(() =>
    this.listaRecordatorios().filter(r => !r.completado).length
  );

  contarPorCategoria(categoria: string) {
    return this.listaRecordatorios().filter(r => r.categoria === categoria).length;
  }

  ngOnInit() {
    this.cargarLista();
    setInterval(() => this.cargarLista(), 5000);
  }

  private cargarLista() {
    this.recordatorios.obtenerRecordatorios().subscribe((datos: any[]) => {
      this.listaRecordatorios.set(datos);
    });
  }

  recordar() {
    this.cargando.set(true);
    this.recordatorios.recordar(this.textoLibre()).subscribe({
      next: (respuesta: any) => {
        this.cargando.set(false);
        this.textoLibre.set('');
        this.confirmacion.set('✅ Recordatorio guardado');
        clearTimeout(this.temporizadorConfirmacion);
        this.temporizadorConfirmacion = setTimeout(() => this.confirmacion.set(''), 4000);
        if (Array.isArray(respuesta)) {
          this.listaRecordatorios.set(respuesta);
        } else {
          this.cargarLista();
        }
      },
      error: () => {
        this.cargando.set(false);
        this.mensajeError.set('No se pudo procesar tu recordatorio');
      }
    });
  }

  marcarCompletado(recordatorio: any) {
    this.recordatorios.actualizarRecordatorio(recordatorio.id, { completado: !recordatorio.completado })
      .subscribe(() => this.cargarLista());
  }

  eliminar(id: any) {
    this.recordatorios.eliminarRecordatorio(id).subscribe(() => this.cargarLista());
  }

  escuchar() {
    const reconocimiento = new (window as any).webkitSpeechRecognition();
    reconocimiento.lang = 'es-ES';
    reconocimiento.continuous = true;

    reconocimiento.onresult = (evento: any) => {
      const texto = evento.results[evento.results.length - 1][0].transcript;
      this.textoLibre.set(texto);

      clearTimeout(this.temporizador);
      this.temporizador = setTimeout(() => {
        reconocimiento.stop();
        this.recordar();
      }, 2000);
    };

    reconocimiento.start();
  }
}
