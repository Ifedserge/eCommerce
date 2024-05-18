import Registartion from '../views/registration/registration';

class App {
  main: HTMLElement;

  reg: Registartion;

  constructor() {
    this.main = document.createElement('main');
    this.reg = new Registartion();
  }

  render(): void {
    document.body.append(this.main);
  }

  init(): void {
    this.render();
    this.reg.init();
  }
}

export default App;
