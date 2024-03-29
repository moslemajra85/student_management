import  httpClient  from './httpClient';

class StudentService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAllStudent() {
    const controller = new AbortController();
    const request = httpClient.get(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  addNewStudent(student) {
  
    return httpClient.post(this.endpoint, student);
  }
}

const create = (endpoint) => new StudentService(endpoint);

export default create;
