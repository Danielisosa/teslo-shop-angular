import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { DsField } from '@shared/components/ds-field/ds-field';
import { ProductsService } from '@products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'product-details',
  imports: [CommonModule, ProductCarousel, ReactiveFormsModule, DsField],
  templateUrl: './product-details.html',

})
export class ProductDetails implements OnInit {
  product = input<Product>();

  router= inject(Router);
  fb= inject(FormBuilder);
  productsService= inject(ProductsService);
  wasSaved = signal(false);

  imageFileList: FileList | undefined = undefined;
  tempImages = signal<string[]>([]);

  imagesToCarousel =computed(() => {
    const currentProductImages= [...(this.product()?.images ?? []), ...(this.tempImages() ?? [])];
    return currentProductImages;
  });

  productForm= this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [[] as string[]],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/(men|women|kid|unisex)/)]],

  });

  sizes=[
    'XS', 'S', 'M', 'L', 'XL', 'XXL'
  ]

  ngOnInit(){
    const p = this.product();
    if (p) this.setFormValue(p);
  }

  setFormValue(formLike: Partial<Product> | undefined){
    if(!formLike) return;
    this.productForm.reset(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',')});
  }

  onSizeCliked(size: string){
    const currentSizes: string[] = this.productForm.get('sizes')?.value ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  async onSubmit(){
    const isValid =this.productForm.valid;
    this.productForm.markAllAsTouched();

    if(!isValid) return;
    const formValue= this.productForm.value;

     const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase().split(',').map(tag=> tag.trim()) ?? [],
     }

    const productId = this.product()?.id;
    if (productId === 'new'){
      await firstValueFrom(this.productsService.createProduct(productLike, this.imageFileList));
      this.wasSaved.set(true);
      await new Promise((res)=> setTimeout(res, 800));
      this.router.navigate(['/admin/products']);
    } else if (productId) {
      await firstValueFrom(this.productsService.updateProduct(productId, productLike, this.imageFileList));
      this.wasSaved.set(true);
      await new Promise((res)=> setTimeout(res, 800));
      this.router.navigate(['/admin/products']);
    }

  }
  onCancel(){
    this.router.navigate(['/admin/products']);
  }

  onFileChanged(event: Event){
    const fileList= (event.target as HTMLInputElement).files;
    this.imageFileList= fileList ?? undefined;

    this.tempImages.set([]);

    const imageUrls= Array.from(fileList ?? [] ).map((file) => URL.createObjectURL(file));

    this.tempImages.set(imageUrls);


  }
}
