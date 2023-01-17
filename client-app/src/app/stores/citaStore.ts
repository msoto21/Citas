import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Cita } from '../models/cita';
import {v4 as uuid} from 'uuid';

export default class CitaStore {
  citaRegistry = new Map<string, Cita>();
  selectedCita: Cita | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this)
  }

  get citasByDate() {
    return Array.from(this.citaRegistry.values()).sort((a, b) => 
      Date.parse(a.fechaHoraInicio) - Date.parse(b.fechaHoraInicio));
  }

  loadCitas = async () => {
    this.setLoadingInitial(true);
    try {
      const citas = await agent.Citas.list();
      citas.forEach(cita => {
        cita.fechaHoraInicio = cita.fechaHoraInicio.split('T')[0];
        cita.fechaHoraFin = cita.fechaHoraFin.split('T')[0];
        this.citaRegistry.set(cita.id, cita);
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error)
      this.setLoadingInitial(false);
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  selectCita = (id: string) => {
    this.selectedCita = this.citaRegistry.get(id);
  }

  cancelSelectedCita = () => {
    this.selectedCita = undefined;
  }

  openForm = (id?: string) => {
    id ? this.selectCita(id) : this.cancelSelectedCita();
    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }

  createCita = async (cita: Cita) => {
    this.loading = true;
    cita.id = uuid()
    try {
      await agent.Citas.create(cita);
      runInAction(() => {
        this.citaRegistry.set(cita.id, cita);
        this.selectedCita = cita;
        this.editMode = false;
        this.loading= false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  updateCita = async (cita: Cita) => {
    this.loading = true;
    try {
      await agent.Citas.update(cita)
      runInAction(() => {
        this.citaRegistry.set(cita.id, cita);
        this.selectedCita = cita;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  deleteCita =async (id:string) => {
    this.loading = true;
    try {
      await agent.Citas.delete(id);
      runInAction(() => {
        this.citaRegistry.delete(id);
        if (this.selectedCita?.id === id) this.cancelSelectedCita();
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(()=> {
        this.loading = false;
      })
    }
  }
}