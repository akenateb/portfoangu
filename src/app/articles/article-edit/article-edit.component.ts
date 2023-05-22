import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  article: Article = { id: 0, title: '', content: '', userId: 0 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.params['id'];
    this.getArticle(articleId);
  }

  getArticle(id: number): void {
    this.articleService.getArticleById(id).subscribe(article => this.article = article);
  }

  updateArticle(): void {
    this.articleService.updateArticle(this.article.id, this.article).subscribe(() => {
      this.router.navigate(['/articles']);
    });
  }
}
