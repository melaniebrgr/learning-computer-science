export interface IObservable {
  attachObserver: (observer: IObserver) => void;
  detachObserver: (observer: IObserver) => void;
  notify: () => void;
}

export interface IObserver {
  onNotify: () => void;
}