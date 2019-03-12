import { Component, OnInit } from '@angular/core';
import { VoteService } from '../_services/vote.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  items = [];

  constructor(
    private voteService : VoteService
  ) { }

  ngOnInit() {
    this.voteService.getResults().subscribe(
      (response) => this.items = response,
      error => console.log(error)
    );
  }

}
