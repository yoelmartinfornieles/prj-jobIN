// service/index.js
const axios = require('axios');

class CharactersApi {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL
    });
  }

  getAllProjects = (page) => {
    return this.api.get(`/jobs?page=${page}`);
  }

  getProjectById = (id) => {
    return this.api.get(`/jobs/${id}`)
  }

  getCompanyData = (companyId) => {
    return this.api.get(`companies/${companyId}`)
  }

  getCompanyJobs = (companyId, page) => {
    return this.api.get(`/jobs?company=${companyId}&page=${page}`)
  }
}


module.exports = CharactersApi;
