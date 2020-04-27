import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../nfv-ns/nfv-ns.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VsbDetailsService } from '../vsb-details.service';
import { dump } from 'js-yaml';

@Component({
  selector: 'app-nfv-ns-graph-dialog',
  templateUrl: './nfv-ns-graph-dialog.component.html',
  styles: [`
    app-blueprints-graph {
      height: 70vh;
      float: left;
      width: 100%;
      position: relative;
    }`]
})
export class NfvNsGraphDialogComponent implements OnInit {

  node_name: string;

  graphData = {
    nodes: [],
    edges: []
  };

  constructor(public dialogRef: MatDialogRef<NfvNsGraphDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private vsbDetailsService: VsbDetailsService) { }

  ngOnInit() {
    console.log(this.data);
    let nodeTempl = this.data.descriptorContent['topologyTemplate']['nodeTemplates'];

    for(let key of Object.keys(nodeTempl)) {
      //console.log(key + " " + value['type']);
      if (nodeTempl[key]['type'] === 'tosca.nodes.nfv.NsVirtualLink'){
          this.graphData.nodes.push({ group: 'nodes', data: { id: key, name: key, label: key, weight: 50, faveColor: '#fff', faveShape: 'ellipse' }, classes: 'bottom-center net'});
      }
      //console.log(nodes);
    }

    for(let key of Object.keys(nodeTempl)) {
      //console.log(key + " " + value['type']);
      if (nodeTempl[key]['type'] === 'tosca.nodes.nfv.VNF'){
        this.graphData.nodes.push({ group: 'nodes', data: { id: key, name: key, label: key, weight: 70, faveColor: '#fff', faveShape: 'ellipse' }, classes: 'bottom-center vnf'});
        let virtualLinks =  nodeTempl[key]['requirements']['virtualLink'];
        for(let key1 of Object.keys(virtualLinks)) {
          //console.log(key1 + " " + value1.split('/')[0]);
          //console.log(key);
          this.graphData.edges.push({ group: 'edges', data: { source: key, target: virtualLinks[key1].split('/')[0], faveColor: '#706f6f', strength: 70 }});
          //console.log(nodes);
        }
      }
      //console.log(nodes);
    }

    for(let key of Object.keys(nodeTempl)) {
      //console.log(key + " " + value['type']);
      if (nodeTempl[key]['type'] === 'tosca.nodes.nfv.PNF'){
        this.graphData.nodes.push({ group: 'nodes', data: { id: key, name: key, label: key, weight: 70, faveColor: '#fff', faveShape: 'ellipse' }, classes: 'bottom-center pnf'});
        let virtualLinks =  nodeTempl[key]['requirements']['virtualLink'];
        for(let key1 of Object.keys(virtualLinks)) {
          //console.log(key1 + " " + value1.split('/')[0]);
          //console.log(key);
          this.graphData.edges.push({ group: 'edges', data: { source: key, target: virtualLinks[key1].split('/')[0], faveColor: '#706f6f', strength: 70 }});
          //console.log(nodes);
        }
      }
      //console.log(nodes);
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
