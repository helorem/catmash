import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  getMatch() {
    return this.http.get("/api/match");
  }

  resolveMatch(winner_id : number, looser_id : number) {
    return this.http.post("/api/match", { winner : winner_id, looser : looser_id});
  }
}
