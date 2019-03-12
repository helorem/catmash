import { Component, OnInit } from '@angular/core';
import { TransitionController, Transition, TransitionDirection } from "ng2-semantic-ui";
import { VoteService } from '../_services/vote.service';
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  items = [
    {
      "id" : null,
      "src" : null,
      "transition" : new TransitionController(),
      "status" : "loading"
    },
    {
      "id" : null,
      "src" : null,
      "transition" : new TransitionController(),
      "status" : "loading"
    }
  ]

  constructor(
    private voteService : VoteService
  ) { }

  ngOnInit() {
    this.nextCats();
  }

  nextCats() {
    this.voteService.getMatch().subscribe(
      (response) => {
        for (let i  in response) {
          this.items[i]["id"] = response[i]["id"];
          this.items[i]["src"] = response[i]["image"];
          this.items[i]["status"] = "loading";
        }
        this.animateOpening();
      },
      error => console.log(error)
    );
  }

  animateOpening() {
    this.items[0]["transition"].animate(new Transition("fly right", 500, TransitionDirection.In, () => {
      this.items[0]["status"] = null;
    }));
    this.items[1]["transition"].animate(new Transition("fly left", 500, TransitionDirection.In, () => {
      this.items[1]["status"] = null;
    }));
  }

  animateEnding() {
    let remaining = 2;
    this.items[0]["transition"].animate(new Transition("fly down", 500, TransitionDirection.Out, () => {
        remaining -= 1;
        if (remaining == 0) {
          this.nextCats();
        }
    }));
    this.items[1]["transition"].animate(new Transition("fly up", 500, TransitionDirection.Out, () => {
        remaining -= 1;
        if (remaining == 0) {
          this.nextCats();
        }
    }));
  }

  setWinner(index) {
    let winner = this.items[0];
    let looser = this.items[1];
    if (index != 0) {
      winner = this.items[1];
      looser = this.items[0];
    }

    winner["status"] = "win";
    looser["status"] = "loose";

    this.voteService.resolveMatch(winner["id"], looser["id"]).subscribe(
      (response) => {
        setTimeout(() => this.animateEnding(), 500);
      },
      error => console.log(error)
    );
  }


}
