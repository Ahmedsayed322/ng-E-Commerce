import { Component, inject } from '@angular/core';
import { SeoService } from '../../services/seo-service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  seo = inject(SeoService);

  constructor() {
    this.seo.updateSeoTags({
      title: 'not-found | My Store',
      description:
        "The page you're looking for doesn't exist or may have been moved. Explore My Store to find what you need.",
    });
  }
}
