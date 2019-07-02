// Import all necessary classes from their respective locations.
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { ChartComponent } from './chart/chart.component';
import * as d3 from "d3";

// Boilerplate, auto-generated and unchanged.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/* 
  Here is where most of the TypeScript lives. The only parts that are missing are the graph components
  which are in their own component and the data service which is in another file in this directory.
*/
export class AppComponent {
  // Set title and the objects that will hold the players data and which variables are being displayed.
  title: string = 'Soccer Players Web App';
  players: Object[];
  tableVariables: Object[];
  allVariables: Object;
  notTableVariables: Object;

  // Initialize out data service for get requests to the API and the title service to change the title.
  constructor(private data: DataService, private titleService: Title) { }

  @ViewChild(ChartComponent, {static: false}) child;

  // This function takes 2 objects as input, the array of all variables and the array of table variables, and 
  // returns the variables that are not in the table variables.
  private getNotTableVariables(allVariables, tableVariables): Object {
    // Initalize the array lengths to zero in case of issues passing the arrays through.
    var l1 = 0;
    var l2 = 0;

    // for each variable in the table loop through all variables in allVariables.
    l1 = tableVariables.length;
    for (var j = 0; j < l1; j++) {
      l2 = allVariables.length;
      for (var i = 0; i < l2; i++){
        // This if checks the variables are equal and will then remove the variable from all variables.
        if (JSON.stringify(tableVariables[j]) == JSON.stringify(allVariables[i])) {
          allVariables.splice(i, 1);
          i--;
          l2--;
        }
      }
    }

    // We return the modified local copy of allVariables that only has the variables not in the table remaining.
    return allVariables;
  }

  // This function is activated on click and allows us to add a variable to the table.
  public addVariable(input): void {
    // First we push the variable to the tableVariables.
    this.tableVariables.push({"id": input});

    // Then we refresh the notTableVariables so that the other dropdowns function as expected.
    this.notTableVariables = this.getNotTableVariables(this.allVariables, this.tableVariables);
  }

  // This function is activated on click and allows us to remove variables from the table. 
  public removeVariable(input): void {
    // Find where input is in tableVariables
    for (var i = 0; i < this.tableVariables.length; i++) {
      if (this.tableVariables[i]["id"] == input ) {
        // Once we've found the matchin entry, remove it.
        this.tableVariables.splice(i, 1);
        i--; 
      }
    }

    // We also need to update the variables that are not in table after the update to tableVariables. 
    this.notTableVariables = this.getNotTableVariables(this.allVariables, this.tableVariables);
  }
  
  // This function highlights just one row and passes the highlight on click event to the ChartComponent.
  highlight(player): void {
    // Remove highlight from all other rows
    for (var i = 0; i < this.players.length; i++) {
      this.players[i]['highlight'] = ""
    }

    // Set table highlight
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i] == player) {
        this.players[i]['highlight'] = "highlight"
      }
    }

    this.players = this.players

    // Highlight the chart
    this.child.highlight(player);
  }

  // This function passes the graphVariables on click event to the ChartComponent.
  private graphVariable(variable) {
    this.child.graphVariable(variable)
  }

  private sortVariable(sortVariable): void {
    // Use built in string comparator to sort the players array of arrays based on one variable.
    this.players = this.players.sort(function(a, b) {
      return a[sortVariable].toString().localeCompare(b[sortVariable].toString())
    })
  }
  
  // Runs on page load
  ngOnInit() {

    // Set the page title.
    this.titleService.setTitle(this.title);
  	
    // Get the players data from the api using our service.
    this.data.getPlayers().subscribe(data => {
        this.players = Object.values(data)
    })

    // Hard code the tableVariables. This could be programatic for compatibility but is hard coded as a time saver. 
    this.tableVariables = [
      {"id": "Name"},
      {"id": "Nationality"},
      {"id": "National_Position"},
      {"id": "Club"},
      {"id": "Height"},
      {"id": "Preffered_Foot"},
      {"id": "Age"},
      {"id": "Aggression"},
      {"id": "Weight"}
    ]


    
    // Hard code allVariables. This could be programatic for compatibility but is hard coded as a time saver. 
    this.allVariables = [
      {"id": "Club_Position"},
      {"id": "Weight"},
      {"id": "Vision"},
      {"id": "Penalties"},
      {"id": "Skill_Moves"},
      {"id": "Agility"},
      {"id": "GK_Positioning"},
      {"id": "Birth_Date"},
      {"id": "Work_Rate"},
      {"id": "Name"},
      {"id": "Attacking_Position"},
      {"id": "Dribbling"},
      {"id": "GK_Handling"},
      {"id": "Reactions"},
      {"id": "Club"},
      {"id": "Ball_Control"},
      {"id": "GK_Reflexes"},
      {"id": "Club_Kit"},
      {"id": "Balance"},
      {"id": "Weak_foot"},
      {"id": "Long_Pass"},
      {"id": "Aggression"},
      {"id": "Height"},
      {"id": "GK_Diving"},
      {"id": "Rating"},
      {"id": "National_Position"},
      {"id": "Sliding_Tackle"},
      {"id": "Composure"},
      {"id": "Preffered_Foot"},
      {"id": "Contract_Expiry"},
      {"id": "Shot_Power"},
      {"id": "Club_Joining"},
      {"id": "Curve"},
      {"id": "Jumping"},
      {"id": "Short_Pass"},
      {"id": "Marking"},
      {"id": "Heading"},
      {"id": "National_Kit"},
      {"id": "Interceptions"},
      {"id": "Speed"},
      {"id": "Standing_Tackle"},
      {"id": "Strength"},
      {"id": "Preffered_Position"},
      {"id": "Age"},
      {"id": "Stamina"},
      {"id": "Nationality"},
      {"id": "Long_Shots"},
      {"id": "GK_Kicking"},
      {"id": "Finishing"},
      {"id": "Crossing"},
      {"id": "Acceleration"},
      {"id": "Freekick_Accuracy"},
      {"id": "Volleys"}
      ]
    
    // Get the notTableVariables based on the above information. 
    this.notTableVariables = this.getNotTableVariables(this.allVariables, this.tableVariables)
  }
  
}
