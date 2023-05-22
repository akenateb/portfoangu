import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'https://microporfolio.net/midware/'; // Reemplaza con la URL de tu API de artículos

  constructor(private http: HttpClient) {}

  getAllArticles() {
    //return this.http.get<Article[]>(this.apiUrl);
    return this.http.get(`${this.apiUrl}articles.php`);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  createArticle(article: { title: string; user_id: number; content: string }) {
    return this.http.post(`${this.apiUrl}articles.php`, JSON.stringify(article));
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  deleteArticle(id: number) {
    return this.http.delete<void>(`${this.apiUrl}articles.php?code=${id}`);
  }
}
