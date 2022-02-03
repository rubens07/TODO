
export default class Server {
  constructor() {
    // TODO - Arrumar um arquivo ".env" de configuração em vez da variavel de ambiente
    // Verificar como importar arquivos externos e testar com build
    this.url = `http://localhost:5000/list-tasks`;
    // this.url = `http://${process.env.BACKEND}:${process.env.PORT}/list-tasks`;
    this.header = new Headers();
    this.header.append("Content-Type", "application/json");
    this.header.append("Access-Control-Allow-Origin", "*");
    this.header.append("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin, X-Requested-With");
  }

  async getData() {
    const result = await fetch(this.url, {
      method: 'GET',
      headers: this.header,
    })
    const data = await result.json();

    return data;
  }

  async updateTask() {
    return true;
  }

  async deleteTask() {
    return true;
  }

  async addTask() {
    return true;
  }
}