import { httpClient } from './httpClient';

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
}

const create = (endpoint) => new StudentService(endpoint);

export default create;
