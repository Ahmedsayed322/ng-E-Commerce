import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from '../models/seo';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  title = inject(Title);
  meta = inject(Meta);
  private readonly siteName = 'My Store';
  private logo = '28267842_7.svg';
  updateSeoTags(seoData: SeoData) {
    this.title.setTitle(`${seoData.title} | ${this.siteName}`);
    this.meta.updateTag({ name: 'description', content: seoData.description });
    const imageUrl = seoData.image || this.logo;
    this.meta.updateTag({ property: 'og:type', content: seoData.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:width', content: '640' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
  }
}
