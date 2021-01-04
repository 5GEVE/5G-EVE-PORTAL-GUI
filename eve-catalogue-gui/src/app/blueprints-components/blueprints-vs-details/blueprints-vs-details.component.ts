import { Component, OnInit, ViewChild } from "@angular/core";
import { VsbDetailsService } from "../../vsb-details.service";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import {
  BlueprintsVsDetailsItemKV,
  BlueprintsVsDetailsDataSource,
} from "./blueprints-vs-details.datasource";
import { VsBlueprintInfo } from "../blueprints-vs/vs-blueprint-info";
import { BlueprintsVsService } from "../../blueprints-vs.service";
import { CtxBlueprintInfo } from "../blueprints-ec/ctx-blueprint-info";
import { BlueprintsEcService } from "../../blueprints-ec.service";
import { DescriptorsVsService } from "../../descriptors-vs.service";
import { VsDescriptorInfo } from "../../descriptors-vs/vs-descriptor-info";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: "app-blueprints-vs-details",
  templateUrl: "./blueprints-vs-details.component.html",
  styles: [
    `
      app-blueprints-graph {
        height: 70vh;
        float: left;
        width: 100%;
        position: relative;
      }
    `,
  ],
})
export class BlueprintsVsDetailsComponent implements OnInit {
  node_name: string;
  isComposite: boolean = false;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false })
  table: MatTable<BlueprintsVsDetailsItemKV>;
  dataSource: BlueprintsVsDetailsDataSource;

  graphData = {
    nodes: [],
    edges: [],
  };

  tableData: BlueprintsVsDetailsItemKV[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["key", "value"];

  constructor(
    public vsbDetailservice: VsbDetailsService,
    private blueprintsVsService: BlueprintsVsService,
    private ctxBlueprintService: BlueprintsEcService,
    private vsDescriptorService: DescriptorsVsService
  ) {}

  ngOnInit() {
    var vsbId = localStorage.getItem("vsbId");
    this.dataSource = new BlueprintsVsDetailsDataSource(
      this.vsbDetailservice._vsBlueprintDetailsItems
    );
    this.getVsBlueprint(vsbId);
  }

  nodeChange(event: any) {
    this.node_name = event;
  }

  getVsBlueprint(vsbId: string) {
    this.blueprintsVsService
      .getVsBlueprint(vsbId)
      .subscribe((vsBlueprintInfo: VsBlueprintInfo) => {
        this.vsDescriptorService
          .getVsDescriptors()
          .subscribe((vsDescriptors: VsDescriptorInfo[]) => {
            this.ctxBlueprintService
              .getCtxBlueprints()
              .subscribe((ctxBlueprintInfos: CtxBlueprintInfo[]) => {
                this.blueprintsVsService
                  .getVsBlueprints()
                  .subscribe((vsBlueprintsInfo: VsBlueprintInfo[]) => {
                    var vsBlueprint = vsBlueprintInfo["vsBlueprint"];
                    //console.log(JSON.stringify(vsBlueprint));
                    if (vsBlueprint["interSite"] !== undefined) {
                      this.isComposite = vsBlueprint["interSite"];
                      //console.log(vsBlueprint.interSite);
                    }
                    this.tableData.push({
                      key: "Name",
                      value: [vsBlueprint["name"]],
                    });
                    //this.tableData.push({key: "Id", value: [vsBlueprint['blueprintId']]});
                    this.tableData.push({
                      key: "Version",
                      value: [vsBlueprint["version"]],
                    });
                    this.tableData.push({
                      key: "Description",
                      value: [vsBlueprint["description"]],
                    });
                    var values = [];
                    if (vsBlueprint["parameters"] !== undefined) {
                      for (
                        var i = 0;
                        i < vsBlueprint["parameters"].length;
                        i++
                      ) {
                        values.push(
                          vsBlueprint["parameters"][i]["parameterName"]
                        );
                      }
                      this.tableData.push({ key: "Parameters", value: values });
                    }
                    values = [];

                    var atomicComponents = vsBlueprint["atomicComponents"];
                    for (var i = 0; i < atomicComponents.length; i++) {
                      if (
                        atomicComponents[i]["placement"] !== null &&
                        atomicComponents[i]["placement"] !== undefined &&
                        atomicComponents[i]["placement"] !== ""
                      ) {
                        values.push(
                          atomicComponents[i]["componentId"] +
                            " (" +
                            atomicComponents[i]["placement"].toLowerCase() +
                            ")"
                        );
                      } else {
                        values.push(atomicComponents[i]["componentId"]);
                      }
                    }
                    this.tableData.push({ key: "Components", value: values });

                    values = [];

                    var endPoints = vsBlueprint["endPoints"];
                    for (var i = 0; i < endPoints.length; i++) {
                      values.push(endPoints[i]["endPointId"]);
                    }
                    this.tableData.push({ key: "Endpoints", value: values });

                    values = [];
                    /*
        if( vsBlueprint['compatibleContextBlueprint'] !== undefined){
          for (var i = 0; i < vsBlueprint['compatibleContextBlueprint'].length; i++) {
            for(var j = 0; j < ctxBlueprintInfos.length; j ++){
              if (vsBlueprint['compatibleContextBlueprint'][i] === ctxBlueprintInfos[j]['ctxBlueprintId']){
                values.push(ctxBlueprintInfos[j]['name']);
              }
            }
          }

          this.tableData.push({key: "Context Blueprints", value: values});
        }
        */
                    values = [];

                    for (
                      var i = 0;
                      i < vsBlueprint["compatibleSites"].length;
                      i++
                    ) {
                      values.push(vsBlueprint["compatibleSites"][i]);
                    }
                    this.tableData.push({
                      key: "Compatible Sites",
                      value: values,
                    });
                    //console.log(this.tableData);
                    this.vsbDetailservice.updateVSBTable(this.tableData);
                    this.dataSource = new BlueprintsVsDetailsDataSource(
                      this.tableData
                    );
                    this.dataSource.sort = this.sort;
                    this.table.dataSource = this.dataSource;

                    /*
        values = [];

        for (var i = 0; i < vsBlueprintInfo['activeVsdId'].length; i++) {
          for(var j = 0; j < vsDescriptors.length; j++) {
            if (vsBlueprintInfo['activeVsdId'][i] === vsDescriptors[j]['vsDescriptorId']){
              values.push(vsDescriptors[j]['name']);
            }
          }
        }
        this.tableData.push({key: "Active Vsds", value: values});
*/
                    var atomicComponentsCps = [];

                    if (this.isComposite == false) {
                      for (var i = 0; i < atomicComponents.length; i++) {
                        this.graphData.nodes.push({
                          data: {
                            id: atomicComponents[i]["componentId"],
                            name: atomicComponents[i]["componentId"],
                            weight: 70,
                            colorCode: "white",
                            shapeType: "ellipse",
                          },
                          classes: "bottom-center vnf",
                        });

                        atomicComponentsCps.push(
                          ...atomicComponents[i]["endPointsIds"]
                        );
                        //console.log(atomicComponentsCps);
                      }

                      var sapCps = [];
                      for (var i = 0; i < endPoints.length; i++) {
                        if (
                          !atomicComponentsCps.includes(
                            endPoints[i]["endPointId"]
                          )
                        ) {
                          sapCps.push(endPoints[i]["endPointId"]);
                          this.graphData.nodes.push({
                            data: {
                              id: endPoints[i]["endPointId"],
                              name: endPoints[i]["endPointId"],
                              weight: 50,
                              colorCode: "white",
                              shapeType: "ellipse",
                            },
                            classes: "bottom-center sap",
                          });
                        }
                      }

                      var connectivityServices =
                        vsBlueprint["connectivityServices"];

                      for (var i = 0; i < connectivityServices.length; i++) {
                        this.graphData.nodes.push({
                          data: {
                            id: "conn_service_" + i,
                            name: connectivityServices[i]["name"],
                            weight: 50,
                            colorCode: "white",
                            shapeType: "ellipse",
                          },
                          classes: "bottom-center net",
                        });

                        for (var j = 0; j < atomicComponents.length; j++) {
                          for (
                            var h = 0;
                            h < atomicComponents[j]["endPointsIds"].length;
                            h++
                          ) {
                            if (
                              connectivityServices[i]["endPointIds"].includes(
                                atomicComponents[j]["endPointsIds"][h]
                              )
                            ) {
                              this.graphData.edges.push({
                                data: {
                                  source: atomicComponents[j]["componentId"],
                                  target: "conn_service_" + i,
                                  colorCode: "black",
                                  strength: 70,
                                },
                              });
                            }
                          }
                        }

                        for (var j = 0; j < sapCps.length; j++) {
                          if (
                            connectivityServices[i]["endPointIds"].includes(
                              sapCps[j]
                            )
                          ) {
                            this.graphData.edges.push({
                              data: {
                                source: sapCps[j],
                                target: "conn_service_" + i,
                                colorCode: "grey",
                                strength: 70,
                              },
                            });
                          }
                        }
                      }
                    } else {
                      //console.log(JSON.stringify(vsBlueprint));
                      for (let a = 0; a < vsBlueprintsInfo.length; a++) {
                        var element = vsBlueprintsInfo[a]["vsBlueprint"];
                        for (
                          let b = 0;
                          b < vsBlueprint.atomicComponents.length;
                          b++
                        ) {
                          if (
                            element.blueprintId ===
                            vsBlueprint.atomicComponents[b]["associatedVsbId"]
                          ) {
                            for (
                              var i = 0;
                              i < element.atomicComponents.length;
                              i++
                            ) {
                              this.graphData.nodes.push({
                                data: {
                                  id:
                                    element.atomicComponents[i]["componentId"] +
                                    "_" +
                                    vsBlueprint.atomicComponents[b][
                                      "compatibleSite"
                                    ],
                                  name:
                                    element.atomicComponents[i]["componentId"],
                                  weight: 70,
                                  colorCode: "white",
                                  shapeType: "ellipse",
                                },
                                classes: "bottom-center vnf",
                              });
                              for (
                                let c = 0;
                                c <
                                element.atomicComponents[i]["endPointsIds"]
                                  .length;
                                c++
                              ) {
                                atomicComponentsCps.push(
                                  element.atomicComponents[i]["endPointsIds"][
                                    c
                                  ] +
                                    "_" +
                                    vsBlueprint.atomicComponents[b][
                                      "compatibleSite"
                                    ]
                                );
                              }
                              //atomicComponentsCps.push(...element.atomicComponents[i]['endPointsIds']+'_'+vsBlueprint.atomicComponents[b]['compatibleSite']);
                              //console.log(atomicComponentsCps);
                            }
                            var sapCps = [];
                            for (var i = 0; i < element.endPoints.length; i++) {
                              if (
                                !atomicComponentsCps.includes(
                                  element.endPoints[i]["endPointId"] +
                                    "_" +
                                    vsBlueprint.atomicComponents[b][
                                      "compatibleSite"
                                    ]
                                )
                              ) {
                                sapCps.push(
                                  element.endPoints[i]["endPointId"] +
                                    "_" +
                                    vsBlueprint.atomicComponents[b][
                                      "compatibleSite"
                                    ]
                                );
                                this.graphData.nodes.push({
                                  data: {
                                    id:
                                      element.endPoints[i]["endPointId"] +
                                      "_" +
                                      vsBlueprint.atomicComponents[b][
                                        "compatibleSite"
                                      ],
                                    name: element.endPoints[i]["endPointId"],
                                    weight: 50,
                                    colorCode: "white",
                                    shapeType: "ellipse",
                                  },
                                  classes: "bottom-center sap",
                                });
                              }
                            }
                            //                  console.log(JSON.stringify(this.graphData));
                            var connectivityServices =
                              element["connectivityServices"];
                            //console.log(JSON.stringify(connectivityServices));
                            for (
                              var i = 0;
                              i < connectivityServices.length;
                              i++
                            ) {
                              this.graphData.nodes.push({
                                data: {
                                  id:
                                    "conn_service_" +
                                    i +
                                    "_" +
                                    vsBlueprint.atomicComponents[b][
                                      "compatibleSite"
                                    ],
                                  name: connectivityServices[i]["name"],
                                  weight: 50,
                                  colorCode: "white",
                                  shapeType: "ellipse",
                                },
                                classes: "bottom-center net",
                              });

                              for (
                                var j = 0;
                                j < element.atomicComponents.length;
                                j++
                              ) {
                                for (
                                  var h = 0;
                                  h <
                                  element.atomicComponents[j]["endPointsIds"]
                                    .length;
                                  h++
                                ) {
                                  if (
                                    connectivityServices[i][
                                      "endPointIds"
                                    ].includes(
                                      element.atomicComponents[j][
                                        "endPointsIds"
                                      ][h]
                                    )
                                  ) {
                                    this.graphData.edges.push({
                                      data: {
                                        source:
                                          element.atomicComponents[j][
                                            "componentId"
                                          ] +
                                          "_" +
                                          vsBlueprint.atomicComponents[b][
                                            "compatibleSite"
                                          ],
                                        target:
                                          "conn_service_" +
                                          i +
                                          "_" +
                                          vsBlueprint.atomicComponents[b][
                                            "compatibleSite"
                                          ],
                                        colorCode: "black",
                                        strength: 70,
                                      },
                                    });
                                  }
                                }
                              }

                              for (var j = 0; j < sapCps.length; j++) {
                                for (
                                  var k = 0;
                                  k <
                                  connectivityServices[i]["endPointIds"].length;
                                  k++
                                ) {
                                  if (
                                    connectivityServices[i]["endPointIds"][k] +
                                      "_" +
                                      vsBlueprint.atomicComponents[b][
                                        "compatibleSite"
                                      ] ===
                                    sapCps[j]
                                  ) {
                                    this.graphData.edges.push({
                                      data: {
                                        source: sapCps[j],
                                        target:
                                          "conn_service_" +
                                          i +
                                          "_" +
                                          vsBlueprint.atomicComponents[b][
                                            "compatibleSite"
                                          ],
                                        colorCode: "grey",
                                        strength: 70,
                                      },
                                    });
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    this.vsbDetailservice.updateVSBGraph(this.graphData);
                  });
              });
          });
      });
  }
}
