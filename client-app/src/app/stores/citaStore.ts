import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Cita } from '../models/cita';
import {v4 as uuid} from 'uuid';

export default class CitaStore {
  citaRegistry = new Map<string, Cita>();
  selectedCita: Cita | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

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
        this.setCita(cita);
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error)
      this.setLoadingInitial(false);
    }
  }

  loadCita = async (id:string) => {
    let cita = this.getCita(id);
    if (cita) {
      this.selectedCita = cita;
      return cita;
    }
    else {
      this.loadingInitial = true;
      try {
        cita = await agent.Citas.details(id);
        this.setCita(cita);
        runInAction(() => this.selectedCita = cita);
        this.setLoadingInitial(false);
        return cita;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  }

  private setCita = (cita: Cita) => {
    cita.fechaHoraInicio = cita.fechaHoraInicio.split('T')[0];
    cita.fechaHoraFin = cita.fechaHoraFin.split('T')[0];
    this.citaRegistry.set(cita.id, cita);
  }

  private getCita = (id: string) => {
    return this.citaRegistry.get(id);
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
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