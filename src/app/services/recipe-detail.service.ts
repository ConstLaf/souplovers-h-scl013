import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailService {

  private urlRecipesDetailsJson="/assets/data/recipes-data.json";

  constructor(private httpClient:HttpClient) { }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent) {
       // A client-side or network error occurred. Handle it accordingly.
       console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  getRecipes():Observable<any>{
    console.log(this.urlRecipesDetailsJson )
    return this.httpClient.get( this.urlRecipesDetailsJson ).pipe(map(this.extractData), catchError(this.handleError));

  } 
}