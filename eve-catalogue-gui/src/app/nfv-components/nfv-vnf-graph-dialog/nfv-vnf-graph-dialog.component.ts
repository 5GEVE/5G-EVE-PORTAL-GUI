import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../nfv-ns/nfv-ns.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VsbDetailsService } from '../../vsb-details.service';
import { dump } from 'js-yaml';

@Component({
  selector: 'app-nfv-vnf-graph-dialog',
  templateUrl: './nfv-vnf-graph-dialog.component.html',
  styles: [`app-blueprints-graph {
    height: 70vh;
    float: left;
    width: 100%;
    position: relative;
  }`]
})
export class NfvVnfGraphDialogComponent implements OnInit {

  node_name: string;

  graphData = {
    nodes: [],
    edges: []
  };

  constructor(public dialogRef: MatDialogRef<NfvVnfGraphDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public vsbDetailsService: VsbDetailsService) { }

  ngOnInit() {
    //console.log(this.data);
    let nodeTempl = this.data.descriptorContent['topologyTemplate']['nodeTemplates'];

    var col=0;
    var ypos=50;

    for(let key of Object.keys(nodeTempl)) {
      if (nodeTempl[key]['type'] === 'tosca.nodes.nfv.VNF'){
        this.graphData.nodes.push({ group: 'nodes', data: {id: key, name: key, label: key, faveShape: 'rectangle', faveColor: '#DDDDDD'} });
        this.graphData.nodes.push({ group: 'nodes', data: {id: 'externalCp', parent: key, name: 'externalCp', label: 'externalCp', faveShape: 'rectangle', faveColor: '#CCCCCC'} });
        for(let key1 of Object.keys(nodeTempl)) {
          if (nodeTempl[key1]['type'] === 'tosca.nodes.nfv.Vdu.Compute'){
            this.graphData.nodes.push({ group: 'nodes', data: { id: key1, col: col, parent: key, name: key1, label: key1, weight: 100, faveColor: '#DDDDDD', faveShape: 'ellipse'}, classes: 'bottom-center vdu'});
          }
        }
      }
    }

    col=col+1;
    for(let key of Object.keys(nodeTempl)) {
      if (nodeTempl[key]['type'] === 'tosca.nodes.nfv.VnfExtCp') {
        this.graphData.nodes.push({ group: 'nodes', data: { id: key, col: col,parent: 'externalCp', name: key, label: key, weight: 50, faveColor: '#fff', faveShape: 'ellipse'}, classes: 'bottom-center extcp'});
      }
    }

    col=col+1;
    for(let key of Object.keys(nodeTempl)) {
      if (nodeTempl[key]['type'] === 'tosca.nodes.nfv.VnfExtCp') {
        let requirements = nodeTempl[key]['requirements'];
        for(let key1 of Object.keys(requirements)) {
          this.graphData.nodes.push({ group: 'nodes', data: { id: key1 + requirements[key1], col: col, name: requirements[key1], label: requirements[key1], weight: 50, faveColor: '#fff', faveShape: 'ellipse'}, classes: 'bottom-center net'});
          this.graphData.edges.push({ group: 'edges', data: { source: key, target: key1 + requirements[key1], faveColor: '#706f6f', strength: 70 } });
        }
      }
    }

    this.vsbDetailsService.updateVSBGraph(this.graphData);
  }

  nodeChange(event: any) {
    this.node_name = event;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
