import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewsDialogComponent } from '../reviews-dialog/reviews-dialog.component';

interface Review {
  id?: string;
  fullName: string;
  isActive: boolean;
  message: string;
  occupation: string;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  reviews$: Observable<Review[]> | undefined;
  filteredReviews$: Observable<Review[]> = of([]);
  paginatedReviews$: Observable<Review[]> = of([]);
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;

  constructor(
    private firestore: AngularFirestore,
    public authService: AuthService,
    private dialog: MatDialog
  ) {}

  openAddReviewDialog(): void {
    const dialogRef = this.dialog.open(ReviewsDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.reviews$ = this.firestore
      .collection<Review>('review')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const reviews = actions.map((a) => {
            const data = a.payload.doc.data() as Review;
            const id = a.payload.doc.id;
            data.id = id;
            return { ...data };
          });
          return reviews;
        })
      );

    this.updateFilteredReviews();
  }

  updateFilteredReviews() {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.reviews$?.subscribe((reviews) => {
        const filteredReviews = reviews.filter(
          (review) => review.isActive || isAdmin
        );
        this.filteredReviews$ = of(filteredReviews);
        this.totalPages = Math.ceil(filteredReviews.length / this.itemsPerPage);
        this.updatePaginatedReviews(filteredReviews);
      });
    });
  }

  updatePaginatedReviews(reviews?: Review[]) {
    this.filteredReviews$?.subscribe((reviewsList) => {
      const reviewsToPaginate = reviews || reviewsList;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedReviews$ = of(
        reviewsToPaginate.slice(startIndex, endIndex)
      );
    });
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedReviews();
    }
  }

  activeazaReview(review: Review) {
    this.firestore
      .collection('review')
      .doc(review.id)
      .update({ isActive: true });
    this.updateFilteredReviews(); // Refresh the filtered reviews
  }
}
