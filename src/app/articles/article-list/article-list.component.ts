import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: any = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getAllArticles().subscribe(articles => this.articles = articles);
  }
  deleteArticle(articleId: number): void {
    this.articleService.deleteArticle(articleId); // Llama a la función deleteArticle() del servicio ArticleDeleteService
  }
}
