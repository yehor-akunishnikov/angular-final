import { BehaviorSubject } from 'rxjs';
import { pluck } from 'rxjs/operators';

interface State<T> {
  entities: {
    [key: string]: T,
  },
  isLoading: boolean,
}

export abstract class Store<T extends {[key: string]: any}> {
  protected state$ = new BehaviorSubject<State<T>>({
    entities: {},
    isLoading: false,
  });
  protected getState$() {
    return this.state$.asObservable();
  }
  protected setState(newState: any) {
    this.state$.next({...this.state$.getValue(), ...newState});
  }
  protected transformArray(array: T[], key: keyof T) {
    return array.reduce((acc, item) => ({...acc, [item[key]]: item}), {})
  }
  protected deleteEntity(entityId: string) {
    const entities = { ...this.state$.getValue().entities };
    delete entities[entityId];
    const state = { entities };
    this.setState(state);
  }
  public isLoading$() {
    return this.getState$()
      .pipe(pluck('isLoading'));
  }
}
