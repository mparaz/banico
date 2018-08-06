export class Section {
  id: string;
  name: string;
  modules: string;

  public initialize() {
    this.name = '';
    this.modules = '';
  }
}