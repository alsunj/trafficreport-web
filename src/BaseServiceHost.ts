import Axios, { AxiosInstance } from 'axios';
import Sidebar from "@/app/Components/sidebar";

export abstract class BaseServiceHost {

  private static hostBaseURL = "https://alsunjtrafficreport.azurewebsites.net/api/v1/";

  protected axios: AxiosInstance;

  constructor(baseUrl: string) {
      this.axios = Axios.create(
          {
              baseURL: BaseServiceHost.hostBaseURL + baseUrl,
              headers: {
                'Content-Type': 'application/json',
              }
          }
      )
  }

}