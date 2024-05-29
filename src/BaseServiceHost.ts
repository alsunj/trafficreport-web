import Axios, { AxiosInstance } from 'axios';

export abstract class BaseServiceHost {

  private static hostBaseURL = "http://localhost:5240/api/v1/";

  protected axios: AxiosInstance;

  constructor(baseUrl: string) {
      this.axios = Axios.create(
          {
              baseURL: BaseServiceHost.hostBaseURL + baseUrl,
              headers: {
                'Content-Type': 'application/json'
              }
          }
      )
  }

}