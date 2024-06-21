import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { AdoptService, Adopt } from 'src/app/services/adopt.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit {
  favoriteAdopts$: Observable<Adopt[]> = of([]);

  constructor(
    private favoriteService: FavoriteService,
    private adoptService: AdoptService
  ) {}

  ngOnInit(): void {
    this.favoriteAdopts$ = this.favoriteService.getFavorites().pipe(
      switchMap((favorites) => {
        if (favorites && favorites.adoptIds && favorites.adoptIds.length > 0) {
          return this.adoptService.getAdoptsByIds(favorites.adoptIds);
        } else {
          return of([]);
        }
      })
    );
  }
}
