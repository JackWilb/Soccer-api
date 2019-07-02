import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  currentVariable: String = "Age";
  highlightValue: String = "randomString";
  highlightPlayer: Object;
  highlightPlayerName: String = "";

  @ViewChild('chart')
    private chartContainer: ElementRef;

  @Input()
  data: Object;

  margin = { top: 50, right: 20, bottom: 30, left: 40 };

  constructor() { }

  ngOnInit() { }

  ngOnChanges(): void {
    if (!this.data) { return; }

    this.createChart(this.currentVariable, this.highlightValue, this.highlightPlayerName);
  }

  onResize() {
    this.createChart(this.currentVariable, this.highlightValue, this.highlightPlayerName);
  }

  public graphVariable(variable): void {
    this.currentVariable = variable;
    this.createChart(this.currentVariable, this.highlightValue, this.highlightPlayerName);
    this.highlight(this.highlightPlayer)
  }

  public highlight(player) {
    this.highlightPlayer = player
    this.highlightPlayerName = player['Name']
    this.highlightValue = player[this.currentVariable].toString();

    this.createChart(this.currentVariable, this.highlightValue, this.highlightPlayerName);

  }

  private createChart(variable, highlightValue, highlightPlayerName): void {

    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.data;

    var summaryStats = d3.nest()
      .key(function(d) { return d[variable]; })
      .rollup(function(v) { return v.length; })
      .sortKeys(d3.ascending)
      .entries(data);

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(summaryStats.map(function(d) { return d.key }));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(summaryStats, d => d.value)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('text')
      .attr('x', 100)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .text(highlightPlayerName)

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

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
          return "blue";
        } else {
          return "black";
        }
      });
  }
}
