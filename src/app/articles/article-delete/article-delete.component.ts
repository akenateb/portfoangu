import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-delete',
  templateUrl: './article-delete.component.html',
  styleUrls: ['./article-delete.component.css']
})
export class ArticleDeleteComponent implements OnInit {
  articleId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['id'];
  }

  deleteArticle(): void {
    this.articleService.deleteArticle(this.articleId).subscribe(() => {
      this.router.navigate(['/articles']);
    });
  }
}
