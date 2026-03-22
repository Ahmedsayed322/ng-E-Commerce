import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from '../models/seo';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  private readonly siteName = 'My Store';
  private readonly baseUrl = 'https://ng-e-commerce-beta.vercel.app';
  private readonly fallbackImage = `28267842_7.svg`;

  updateSeoTags(seoData: SeoData): void {
    const pageUrl = seoData.url ?? `${this.baseUrl}${this.router.url}`;
    const imageUrl = seoData.image ?? this.fallbackImage;

    this.title.setTitle(`${seoData.title} | ${this.siteName}`);

    const tags: { [key: string]: string }[] = [
      { name: 'description', content: seoData.description },

      { property: 'og:type', content: seoData.type ?? 'website' },
      { property: 'og:site_name', content: this.siteName },
      { property: 'og:title', content: seoData.title },
      { property: 'og:description', content: seoData.description },
      { property: 'og:url', content: pageUrl },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_US' },
    ];

    tags.forEach((tag) => this.meta.updateTag(tag));
  }
}
