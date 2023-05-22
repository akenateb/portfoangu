import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent {
  article: { title: string; user_id: number; content: string } = { title: '', content: '', user_id: 0 };

  constructor(private articleService: ArticleService,
              private authService: AuthService,
              private router: Router) {}

  createArticle(): void {
    const currentUser = this.authService.getCurrentUserId();
    if (currentUser) {
      this.article.user_id = currentUser;
      this.articleService.createArticle(this.article).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    }else{
      alert("no veo a nadie chico");
    }
  }
}
