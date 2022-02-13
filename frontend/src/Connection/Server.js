import axios from 'axios';

export default class Server {
  constructor() {
    this.url = `http://localhost:5000/`;
    // this.url = `http://${process.env.BACKEND}:${process.env.PORT}/`;
    this.header = new Headers();
    this.header.append("Content-Type", "application/json");
    this.header.append("Access-Control-Allow-Origin", "*");
    this.header.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    this.header.append("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin, X-Requested-With");
  }

  async getData() {
    const urlList = `${this.url}/list-tasks`;

    const result = await axios.get(urlList, {
      headers: this.header,
    });

    return result.data;
  }

  async updateTask(id, description, status) {
    const urlUpdate = `${this.url}/update-task`;
    const form = new FormData();
    form.append('id', id);
    form.append('description', description);
    form.append('status', status);

    const result = await axios.put(urlUpdate, form, {
      headers: this.header,
    });
    
    return result.data;
  }

  async deleteTask(id) {
    const urlDelete = `${this.url}/delete-task`;
    const form = new FormData();
    form.append('id', id);

    const result = await axios.delete(urlDelete, {
      headers: this.header,
      data: form
    });
    
    return result.data;
  }

  async addTask(description) {
    const urlAdd = `${this.url}/add-task`;
    const form = new FormData();
    form.append('description', description);

    const result = await axios.post(urlAdd, form, {
      headers: this.header,
    });
    
    return result.data;
  }
}