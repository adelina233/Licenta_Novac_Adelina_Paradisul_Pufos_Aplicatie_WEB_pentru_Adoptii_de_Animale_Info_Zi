import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Adopt, AdoptService } from 'src/app/services/adopt.service';
import { AddAdoptComponent } from '../add-adopt/add-adopt.component';
import { EditAdoptComponent } from '../edit-adopt/edit-adopt.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Observable, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css'],
})
export class AdoptComponent implements OnInit {
  adoptList: Adopt[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  favoriteIds$: Observable<string[]> = of([]);
  ageFilter: number | undefined = undefined;
  vaccinatedFilter: boolean | null = null;
  animalTypeFilter: string | undefined = undefined;
  breedFilter: string | undefined = undefined;

  constructor(
    private adoptService: AdoptService,
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private favoriteService: FavoriteService
  ) {
    console.log(this.vaccinatedFilter);
  }

  addToFavorites(adoptId: string): void {
    this.favoriteService.addFavorite(adoptId).then(() => {
      this.updateFavoriteIds();
    });
  }

  removeFromFavorites(adoptId: string): void {
    this.favoriteService.removeFavorite(adoptId).then(() => {
      this.updateFavoriteIds();
    });
  }

  updateFavoriteIds(): void {
    this.authService.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            return this.favoriteService
              .getFavorites()
              .pipe(map((favorites) => favorites?.adoptIds || []));
          } else {
            return of([]);
          }
        })
      )
      .subscribe((favoriteIds) => {
        this.favoriteIds$ = of(favoriteIds);
      });
  }

  isAuthenticated(): boolean {
    if (this.authService.isAuthenticated) return true;
    return false;
  }

  ngOnInit(): void {
    this.adoptService.getAdoptList().subscribe((data) => {
      this.adoptList = data;
    });
    this.authService.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            return this.favoriteService
              .getFavorites()
              .pipe(map((favorites) => favorites?.adoptIds || []));
          } else {
            return of([]);
          }
        })
      )
      .subscribe((favoriteIds) => {
        this.favoriteIds$ = of(favoriteIds);
      });
  }

  openAddAdoptDialog(): void {
    const dialogRef = this.dialog.open(AddAdoptComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Poți adăuga cod aici pentru a actualiza lista de adopții dacă este necesar
    });
  }

  acceptAdopt(adopt: Adopt): void {
    this.adoptService.acceptAdopt(adopt.id).then(() => {
      this.ngOnInit();
    });
  }

  deleteAdopt(adopt: Adopt): void {
    this.adoptService.deleteAdopt(adopt.id).then(() => {
      this.router.navigate(['adopt']);
      console.log(adopt.id + ' deleted');
    });
  }

  openEditAdoptDialog(adopt: Adopt): void {
    console.log(adopt);

    const dialogRef = this.dialog.open(EditAdoptComponent, {
      width: '400px',
      data: adopt,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Poți adăuga cod aici pentru a actualiza lista de adopții dacă este necesar
    });
  }

  applyFilters(): void {
    this.currentPage = 1;
  }

  get filteredAdoptList(): Adopt[] {
    return this.adoptList
      .filter((adopt) => this.authService.isAdmin$ || adopt.isAccepted)
      .filter((adopt) => {
        const ageMatch =
          this.ageFilter === undefined ||
          this.ageFilter === null ||
          adopt.age === this.ageFilter;
        const vaccinatedMatch =
          this.vaccinatedFilter === null ||
          this.vaccinatedFilter === undefined ||
          adopt.vaccinated === this.vaccinatedFilter;
        const animalTypeMatch =
          this.animalTypeFilter === undefined ||
          adopt.animalType
            .toLowerCase()
            .includes(this.animalTypeFilter.toLowerCase());
        const breedMatch =
          this.breedFilter === undefined ||
          adopt.breed.toLowerCase().includes(this.breedFilter.toLowerCase());

        return ageMatch && vaccinatedMatch && animalTypeMatch && breedMatch;
      });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAdoptList.length / this.itemsPerPage);
  }

  get paginatedAdoptList(): Adopt[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAdoptList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
