import { IPaises } from "./model/paises.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable(
    { providedIn: 'root' }
)
export class PaisesService {

    pais?: IPaises;
    resultado: any;
   
    url = 'http://localhost:8080/paises';
    urlInfoPais = 'https://servicodados.ibge.gov.br/api/v1/paises';
    urlCidadesPais = 'http://www.geonames.org/childrenJSON?geonameId';

    constructor(
        private http: HttpClient,         
        private messageService: MessageService
        ) { }

    getAllPaises() : Observable<IPaises[]> {
        return this.http.get<IPaises[]>(`${ this.url }/all`)
        // não conseguir usar com o pipe e map tenho que ver depois o que é isso
        // .pipe(
        //     map((response: any) => response.data)
        // );
    }

    recebePaisSelecionado(pais: IPaises) {
        this.pais = pais;
    }

    getPaisSelecionado() {
        return this.pais;
    }

    getInfoPais(): Observable<any[]> {
        return this.http.get<any[]>(`${ this.urlInfoPais }/${this.pais?.sigla}`);
    }

    getIndicadoresPais() {
        return this.http.get(`${ this.urlInfoPais }/${this.pais?.sigla}/indicadores`);
    }

    getCidadesPorCodPais() {
        return this.http.get(`${ this.urlCidadesPais }=${this.pais?.countryId}`)
        // .pipe(
        //     map((response: any) => response.data)
        // );
    }


    /** Log a HeroService message with the MessageService */
//     private log(message: string) {
//         this.messageService.add(`HeroService: ${message}`);
//     }

//     const subscription = this.service.getAll()
//   .subscribe(
//     (data) => this.onSuccess(data),
//     (error) => this.handleError(error)
//   );

// subscription.add(() => this.stopLoading());

// this.service.getAll()
// .subscribe(
//     data => this.onSuccess(data),
//     error => this.handleError(error),
//     () => this.onComplete()
// );
}