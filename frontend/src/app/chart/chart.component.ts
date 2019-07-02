import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  // Initialize variables with default values
  currentVariable: String = "Age";
  highlightValue: String = "randomString";
  highlightPlayer: Object;
  highlightPlayerName: String = "";
  margin: Object = { top: 50, right: 20, bottom: 30, left: 40 };

  // Grab what we need from the page load
  @ViewChild('chart')
    private chartContainer: ElementRef;
  @Input()
  data: Object;

  // No additonal constructors or oninit command.
  constructor() { }
  ngOnInit() { }

  // if this.data changes redraw the graph
  ngOnChanges(): void {
    if (!this.data) { return; }
    this.createChart(this.currentVariable, this.highlightValue, this.highlightPlayerName);
  }

  // Redraw graph on page resize
  onResize() {
    this.createChart(this.currentVariable, this.highlightValue, this.highlightPlayerName);
  }

  // Graph a vairiable on click
  public graphVariable(variable): void {
    this.currentVariable = variable;
    this.createChart(this.currentVariable, this.highlightValue, this.highlightPlayerName);
    this.highlight(this.highlightPlayer)
  }

  // Highlight a specific bar on the graph on click
  public highlight(player) {
    this.highlightPlayer = player
    this.highlightPlayerName = player['Name']
    this.highlightValue = player[this.currentVariable].toString();

    this.createChart(this.currentVariable, this.highlightValue, this.highlightPlayerName);

  }

  // Main create chart function
  private createChart(variable, highlightValue, highlightPlayerName): void {

    // Remove the graph if it exists
    d3.select('svg').remove();

    // Get the data and which element the graph will go in
    const element = this.chartContainer.nativeElement;
    const data = this.data;

    // Summarize the table so the bars show correctly
    var summaryStats = d3.nest()
      .key(function(d) { return d[variable]; })
      .rollup(function(v) { return v.length; })
      .sortKeys(d3.ascending)
      .entries(data);

    // Set height and width
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // Set the chart size inside the element
    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    // Set the x-axis scale
    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(summaryStats.map(function(d) { return d.key }));

    // Set the y axis scale
    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(summaryStats, d => d.value)]);

    // Move the graph pane to the right position
    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // Append the name to the top of the graph if we're passed one
    g.append('text')
      .attr('x', 100)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .text(highlightPlayerName)

    // Set the x axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    // Set the y axis
    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    // Map the data to bars
    g.selectAll('.bar')
      .data(summaryStats)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.key))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.value))
      .attr('fill', function (d) {
        if(d.key == highlightValue) {
          return "#ADD8E6";
        } else {
          return "black";
        }
      });
  }
}
