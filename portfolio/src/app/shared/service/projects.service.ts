import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) {}

  private url: string = './assets/projects.json';
  private urlDev: string = '/assets/projects.json';

  public getProjects(language: string): Observable<Project[]> {
    return this.httpClient.get<Project[]>(
      `assets/projects/projects.${language}.json`
    );
  }
}
