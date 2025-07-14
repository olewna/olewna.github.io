import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) {}

  protected url: string = './assets/projects.json';
  protected urlDev: string = '/assets/projects.json';

  public getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.urlDev);
  }
}
