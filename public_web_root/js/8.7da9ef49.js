(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"2b96":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e._self._c;return t("q-page",{staticClass:"q-pa-sm"},[t("q-header",{class:e.darkMode?"":"bg-grey-1",style:e.darkMode?"background: var(--q-color-dark);":"",attrs:{elevated:""}},[t("q-toolbar",{staticClass:"q-gutter-x-sm",class:e.darkMode?"":"text-black"},[t("q-btn",{attrs:{"no-caps":"",flat:"",dense:"",icon:"arrow_back",label:e.$t("Return to Market Place Pipeline Templates"),to:"/MarketPlace/PipelineTemplates"}}),t("q-separator",{attrs:{spaced:"",vertical:""}}),t("q-btn",{attrs:{"no-caps":"",flat:"",dense:"",icon:"input",color:"primary",label:e.$t("Import")}},[t("q-menu",[t("q-list",{staticStyle:{"min-width":"20rem"}},[t("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){return e.doPromptForNewPipelineDetails()}}},[t("q-item-section",{attrs:{avatar:"",top:""}},[t("q-avatar",{attrs:{icon:"auto_awesome",color:"primary","text-color":"white"}})],1),t("q-item-section",[t("q-item-label",{attrs:{lines:"1"}},[e._v(e._s(e.$t("Into new Pipeline")))]),t("q-item-label",{attrs:{caption:""}},[e._v(e._s(e.$t("Create a new Pipeline and import this Template")))])],1)],1),t("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){return e.doPromptForExistingPipelineDetails()}}},[t("q-item-section",{attrs:{avatar:"",top:""}},[t("q-avatar",{attrs:{icon:"input",color:"purple-10","text-color":"white"}})],1),t("q-item-section",[t("q-item-label",{attrs:{lines:"1"}},[e._v(e._s(e.$t("Into existing Pipeline")))]),t("q-item-label",{attrs:{caption:""}},[e._v(e._s(e.$t("Override parts of an existing Pipeline with this Template")))])],1)],1)],1)],1)],1),t("q-toolbar-title",{staticClass:"text-center",staticStyle:{opacity:".4"}},[e._v(e._s(e.$t("EZ Market Place : Pipeline Templates : {ezMarketPipelineTemplateName}",{ezMarketPipelineTemplateName:e.ezMarketPipelineTemplate.name})))])],1)],1),t("q-card",{staticClass:"q-pa-md q-mx-none q-mb-md"},[t("q-card-section",{attrs:{horizontal:""}},[t("q-card-section",{staticClass:"col q-ma-none q-pa-none"},[t("q-card-section",{staticClass:"text-h4"},[e._v("\n            "+e._s(e.$t("Properties"))+"\n        ")]),t("q-card-section",{staticClass:"row"},[t("div",[t("IconPicture",{attrs:{pngBase64:e.ezMarketPipelineTemplate.iconPicture,size:150}})],1),t("div",{staticClass:"q-ml-md col"},[t("div",{staticClass:"row"},[t("div",[t("div",{staticClass:"text-h5"},[e._v("\n                  "+e._s(e.ezMarketPipelineTemplate.name)+"\n                ")]),t("div",{staticClass:"text-caption text-italic"},[e._v("\n                  "+e._s(e.ezMarketPipelineTemplate.uid)+"\n                ")])]),t("q-space"),t("div",{staticClass:"row"},[t("div",["Visible"===e.ezMarketPipelineTemplate.status?t("q-icon",{attrs:{name:"o_visibility",color:"positive",size:"lg"}}):"Hidden"===e.ezMarketPipelineTemplate.status?t("q-icon",{staticStyle:{opacity:".5"},attrs:{name:"o_visibility_off",size:"lg"}}):"Pending review"===e.ezMarketPipelineTemplate.status?t("q-icon",{attrs:{name:"o_pending_actions",color:"primary",size:"lg"}}):"Failed Review"===e.ezMarketPipelineTemplate.status?t("q-icon",{staticStyle:{opacity:".75"},attrs:{name:"o_assignment_late",color:"negative",size:"lg"}}):"To be deleted"===e.ezMarketPipelineTemplate.status?t("q-icon",{staticStyle:{opacity:".5"},attrs:{name:"o_auto_delete",color:"negative",size:"lg"}}):t("q-icon",{attrs:{name:"o_question_mark",color:"orange",size:"lg"}})],1),t("div",{staticClass:"q-ml-sm"},[t("div",{staticClass:"text-bold"},[e._v("\n                    "+e._s(e.$t(e.ezMarketPipelineTemplate.status))+"\n                  ")]),t("div",{staticClass:"text-caption"},[e._v("\n                    "+e._s(e.$t(e.ezMarketPipelineTemplate.statusDescription))+"\n                  ")])])])],1),t("q-separator",{attrs:{spaced:""}}),t("div",{staticClass:"row justify-between"},[t("div",{},[t("div",{},[e._v("\n                  "+e._s(e.$t("Created: {ezMarketPipelineTemplateCreated}",{ezMarketPipelineTemplateCreated:e.timeAgo(e.ezMarketPipelineTemplate.created)}))+"\n                  "),t("q-tooltip",{attrs:{"content-style":"font-size: 1rem;"}},[e._v("\n                    "+e._s(e.ezMarketPipelineTemplate.created)+"\n                  ")])],1),t("div",{},[e._v("\n                  "+e._s(e.$t("Modified: {ezMarketPipelineTemplateModified}",{ezMarketPipelineTemplateModified:e.timeAgo(e.ezMarketPipelineTemplate.modified)}))+"\n                  "),t("q-tooltip",{attrs:{"content-style":"font-size: 1rem;"}},[e._v("\n                    "+e._s(e.ezMarketPipelineTemplate.modified)+"\n                  ")])],1)]),t("div",{staticClass:"text-h6"},[e._v("\n                "+e._s(e.$t("by"))+"\n              ")]),t("div",{staticClass:"text-center"},[t("Identicon",{attrs:{identity:e.ezMarketPipelineTemplate.publisher}}),t("div",{},[t("div",{staticClass:"text-bold"},[e._v("\n                    "+e._s(e.ezMarketPipelineTemplate.publisher)+"\n                  ")])])],1)])],1)])],1)],1)],1),t("q-card",{staticClass:"q-pa-md q-mx-none q-mb-md"},[t("q-card-section",{attrs:{horizontal:""}},[t("q-card-section",{staticClass:"col q-ma-none q-pa-none"},[t("q-card-section",{staticClass:"text-h4"},[e._v("\n            "+e._s(e.$t("Read Me"))+"\n        ")]),t("q-card-section",{},[t("q-markdown",{staticClass:"col",attrs:{src:e.readmeMarkdown,"no-heading-anchor-links":""}})],1)],1)],1)],1),t("q-card",{staticClass:"q-pa-md q-mx-none q-mb-md"},[t("q-card-section",{attrs:{horizontal:""}},[t("q-card-section",{staticClass:"col q-ma-none q-pa-none"},[t("q-card-section",{staticClass:"text-h4"},[e._v("\n            "+e._s(e.$t("Collection"))+"\n        ")]),t("q-card-section",{staticClass:"row items-center"},[t("span",{staticClass:"text-bold"},[e._v(e._s(e.$t("Shipper and Method:")))]),t("div",{staticClass:"q-ml-md text-center"},[e.collectionShipperOption.icon&&e.collectionShipperOption.icon.length?t("img",{attrs:{src:"/shippers/"+e.collectionShipperOption.icon+".svg",width:"64px"}}):e._e(),t("div",[e._v(e._s(e.collectionShipperOption.label))])]),t("div",{staticClass:"q-ml-xl text-center"},[t("q-icon",{attrs:{name:e.collectionMethodOption.icon,size:"64px"}}),t("div",[e._v(e._s(e.collectionMethodOption.label))])],1)]),t("q-card-section",[t("div",{},[t("div",{staticClass:"text-bold"},[e._v(e._s(e.$t("Collection Configuration:")))]),t("div",{staticClass:"row q-my-sm"},[t("q-separator",{attrs:{vertical:"",size:"2px",color:"teal"}}),t("div",{staticClass:"q-ml-sm"},[t("pre",[e._v(e._s(e.collectionConfigOutput))])])],1)])])],1)],1)],1),t("q-card",{staticClass:"q-pa-md q-mx-none q-mb-md"},[t("q-card-section",{attrs:{horizontal:""}},[t("q-card-section",{staticClass:"col q-ma-none q-pa-none"},[t("q-card-section",{staticClass:"row wrap justify-between"},[t("div",{staticClass:"text-h4"},[e._v("\n            "+e._s(e.$t("Fields Mapping"))+"\n          ")]),t("div",{staticClass:"row q-gutter-md"},[t("div",{staticStyle:{width:"300px"}},[t("q-input",{attrs:{outlined:"",dense:"",debounce:"300",placeholder:e.$t("Search")},scopedSlots:e._u([{key:"append",fn:function(){return[e.searchFilter.length?t("q-btn",{attrs:{dense:"",flat:"",icon:"close"},on:{click:function(t){e.searchFilter=""}}}):e._e(),t("q-icon",{attrs:{name:"o_search"}})]},proxy:!0}]),model:{value:e.searchFilter,callback:function(t){e.searchFilter=t},expression:"searchFilter"}})],1)])]),t("q-card-section",{},[t("q-table",{attrs:{data:e.tableData,columns:e.columns,"row-key":"name",dense:"","no-data-label":e.$t("No Fields to display."),filter:e.searchFilter,loading:e.pipelineTemplateLoading,"rows-per-page-label":e.$t("Fields per page:"),pagination:e.pagination},on:{"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"body-cell-frequency",fn:function(i){return[t("q-td",{staticStyle:{width:"3em"},attrs:{props:i}},[t("div",[t("q-tooltip",{attrs:{"content-style":"font-size: 1em;"}},[e._v("\n                    "+e._s(e.$t("Seen in {seenInOverMaxSeenInLog}% of logs in the sample ({seenIn}/{maxSeenInLog})",{seenInOverMaxSeenInLog:0!=e.maxSeenInLog?Math.round(i.value/e.maxSeenInLog*100):0,seenIn:i.value,maxSeenInLog:e.maxSeenInLog}))+"\n                  ")]),t("q-linear-progress",{attrs:{value:i.value/e.maxSeenInLog,color:e.darkMode?"blue-10":"blue-7",rounded:"",size:"1em"}})],1)])]}}])})],1)],1)],1)],1),t("q-dialog",{attrs:{persistent:""},model:{value:e.showImportPopupNewPipeline,callback:function(t){e.showImportPopupNewPipeline=t},expression:"showImportPopupNewPipeline"}},[t("q-card",{staticStyle:{"min-width":"350px"}},[t("q-card-section",[t("div",{staticClass:"text-h6"},[e._v(e._s(e.$t("Import Template into a new Pipeline")))])]),t("q-card-section",{staticClass:"q-pt-none"},[t("q-input",{attrs:{dense:"",autofocus:"",label:e.$t("Pipeline Name"),rules:[t=>!!t||e.$t("Pipeline name cannot be empty")]},on:{keyup:[function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"]))return null;e.showImportPopupNewPipeline=!1},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.ImportIntoNewPipeline()}]},model:{value:e.newPipelineName,callback:function(t){e.newPipelineName=t},expression:"newPipelineName"}})],1),t("q-card-section",{staticClass:"q-pt-none"},[t("q-select",{attrs:{dense:"",options:e.openCollectorsOptions,label:e.$t("Primary OpenCollector"),"emit-value":"","map-options":""},model:{value:e.newPipelineOpenCollector,callback:function(t){e.newPipelineOpenCollector=t},expression:"newPipelineOpenCollector"}})],1),t("q-card-section",{staticClass:"q-pt-none"},[t("q-list",{staticStyle:{"min-width":"400px"}},[t("q-item-label",{attrs:{header:""}},[e._v(e._s(e.$t("Import Options")))]),t("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{tag:"label"}},[t("q-item-section",[t("q-item-label",[e._v(e._s(e.$t("Import Collection Configuation")))]),t("q-item-label",{attrs:{caption:""}},[e._v(e._s(e.$t("Include the Shipper's Collection Configuation")))])],1),t("q-item-section",{attrs:{avatar:""}},[t("q-toggle",{model:{value:e.importCollectionConfiguration,callback:function(t){e.importCollectionConfiguration=t},expression:"importCollectionConfiguration"}})],1)],1),t("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{tag:"label"}},[t("q-item-section",[t("q-item-label",[e._v(e._s(e.$t("Import Fields Mapping")))]),t("q-item-label",{attrs:{caption:""}},[e._v(e._s(e.$t("Include the Shipper's Collection Configuation")))])],1),t("q-item-section",{attrs:{avatar:""}},[t("q-toggle",{model:{value:e.importFieldsMapping,callback:function(t){e.importFieldsMapping=t},expression:"importFieldsMapping"}})],1)],1)],1)],1),t("q-card-actions",{staticClass:"text-primary q-mt-md",attrs:{align:"right"}},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:e.$t("Cancel")}}),t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{color:"primary",label:e.$t("Create from Template"),disabled:!(e.newPipelineName.length&&(e.importCollectionConfiguration||e.importFieldsMapping))},on:{click:function(t){return e.ImportIntoNewPipeline()}}})],1)],1)],1),t("q-dialog",{attrs:{persistent:""},model:{value:e.showImportPopupExistingPipeline,callback:function(t){e.showImportPopupExistingPipeline=t},expression:"showImportPopupExistingPipeline"}},[t("q-card",{staticStyle:{"min-width":"800px"}},[t("q-card-section",[t("div",{staticClass:"text-h6"},[e._v(e._s(e.$t("Import Template into an existing Pipeline")))])]),t("q-card-section",{staticClass:"q-pt-none"},[t("q-table",{attrs:{title:e.$t("Existing Pipelines"),data:e.existingPipelineTableData,columns:e.existingPipelineTableColumns,"row-key":"uid",dense:"","no-data-label":e.$t("No Pipeline to display."),filter:e.existingPipelineTableSearchFilter,loading:e.dataLoading,"rows-per-page-label":e.$t("Pipelines per page:"),pagination:e.existingPipelineTablePagination},on:{"update:pagination":function(t){e.existingPipelineTablePagination=t}},scopedSlots:e._u([{key:"top",fn:function(){return[t("div",{staticClass:"full-width row wrap justify-between"},[t("div",{staticClass:"q-table__title"},[e._v("\n                "+e._s(e.$t("Existing Pipelines"))+"\n              ")]),t("div",{staticClass:"row q-gutter-md"},[t("div",{staticStyle:{width:"300px"}},[t("q-input",{attrs:{outlined:"",dense:"",debounce:"300",placeholder:e.$t("Search")},scopedSlots:e._u([{key:"append",fn:function(){return[e.existingPipelineTableSearchFilter.length?t("q-btn",{attrs:{dense:"",flat:"",icon:"close"},on:{click:function(t){e.existingPipelineTableSearchFilter=""}}}):e._e(),t("q-icon",{attrs:{name:"o_search"}})]},proxy:!0}]),model:{value:e.existingPipelineTableSearchFilter,callback:function(t){e.existingPipelineTableSearchFilter=t},expression:"existingPipelineTableSearchFilter"}})],1),t("q-btn",{attrs:{dense:"",outline:"",icon:"refresh"},on:{click:function(t){return e.loadPipelines()}}},[t("q-tooltip",{attrs:{"content-style":"font-size: 1em"}},[e._v("\n                    "+e._s(e.$t("Reload the list of Pipelines."))+"\n                  ")])],1)],1)])]},proxy:!0},{key:"body-cell-actions",fn:function(i){return[t("q-td",{attrs:{props:i}},[t("q-btn",{staticClass:"q-mr-sm",attrs:{dense:"",icon:"input",color:"primary"},on:{click:function(t){return e.ImportIntoExistingPipeline(i.row,{importCollectionConfiguration:!0,importFieldsMapping:!0})}}},[t("q-tooltip",{attrs:{"content-style":"font-size: 1em"}},[e._v("\n                  "+e._s(e.$t("Import Collection and Fields Mapping"))+"\n                ")])],1),t("q-btn",{attrs:{flat:"",dense:"",icon:"mediation"},on:{click:function(t){return e.ImportIntoExistingPipeline(i.row,{importCollectionConfiguration:!0,importFieldsMapping:!1})}}},[t("q-tooltip",{attrs:{"content-style":"font-size: 1em"}},[e._v("\n                  "+e._s(e.$t("Import Collection only"))+"\n                ")])],1),t("q-btn",{attrs:{flat:"",dense:"",icon:"account_tree"},on:{click:function(t){return e.ImportIntoExistingPipeline(i.row,{importCollectionConfiguration:!1,importFieldsMapping:!0})}}},[t("q-tooltip",{attrs:{"content-style":"font-size: 1em"}},[e._v("\n                  "+e._s(e.$t("Import Fields Mapping only"))+"\n                ")])],1)],1)]}},{key:"body-cell-status",fn:function(i){return[t("q-td",{attrs:{props:i}},["Ready"===i.value?t("q-icon",{attrs:{name:"o_arrow_circle_up",color:"green",size:"md"}}):"Dev"===i.value?t("q-icon",{attrs:{name:"o_construction",color:e.darkMode?"green-3":"green-10",size:"md"}}):"New"===i.value?t("q-icon",{attrs:{name:"o_auto_awesome",size:"md"}}):t("q-icon",{attrs:{name:"o_help_center",color:"grey",size:"md"}}),t("q-tooltip",{attrs:{"content-style":"font-size: 1em"}},[e._v("\n                "+e._s(e.$t(i.value))+"\n              ")])],1)]}},{key:"body-cell-collectionShipper",fn:function(i){return[t("q-td",{attrs:{props:i}},[i.row&&i.row.collectionConfig&&i.row.collectionConfig.collectionShipper&&i.row.collectionConfig.collectionShipper.length?t("img",{attrs:{src:"/shippers/"+e.collectionShipperDetails(i.row.collectionConfig.collectionShipper).icon+".svg",width:"32px"}}):e._e(),t("q-tooltip",{attrs:{"content-style":"font-size: 1em"}},[i.row&&i.row.collectionConfig&&i.row.collectionConfig.collectionShipper&&i.row.collectionConfig.collectionShipper.length?t("span",[e._v(e._s(e.collectionShipperDetails(i.row.collectionConfig.collectionShipper).label))]):e._e()])],1)]}},{key:"body-cell-collectionMethod",fn:function(i){return[t("q-td",{attrs:{props:i}},[i.row&&i.row.collectionConfig&&i.row.collectionConfig.collectionShipper&&i.row.collectionConfig.collectionShipper.length&&i.row.collectionConfig.collectionMethod&&i.row.collectionConfig.collectionMethod.length?t("q-icon",{attrs:{name:e.collectionMethodDetails(i.row.collectionConfig.collectionShipper,i.row.collectionConfig.collectionMethod).icon,size:"md"}}):e._e(),t("q-tooltip",{attrs:{"content-style":"font-size: 1em"}},[i.row&&i.row.collectionConfig&&i.row.collectionConfig.collectionShipper&&i.row.collectionConfig.collectionShipper.length&&i.row.collectionConfig.collectionMethod&&i.row.collectionConfig.collectionMethod.length?t("span",[e._v(e._s(e.collectionMethodDetails(i.row.collectionConfig.collectionShipper,i.row.collectionConfig.collectionMethod).label))]):e._e()])],1)]}},{key:"body-cell-mappingStats",fn:function(i){return[t("q-td",{attrs:{props:i}},[i.row.fieldsMapping&&Array.isArray(i.row.fieldsMapping)&&i.row.fieldsMapping.length?t("div",[t("q-circular-progress",{attrs:{value:Math.round(i.value),"show-value":"","font-size":i.value<100?"0.5em":"0.4em",size:"2.8em",thickness:.2,color:e.darkMode?"blue-3":"blue-10","track-color":e.darkMode?"grey-9":"grey-3"}}),t("q-tooltip",{attrs:{"content-style":"font-size: 1em"}},[t("span",[e._v(e._s(e.$t("Detected fields: {fieldsMappingDetectedCount}",{fieldsMappingDetectedCount:i.row.fieldsMapping.length})))]),t("br"),t("span",[e._v(e._s(e.$t("Mapped fields: {fieldsMappingMappedCount} ({fieldsMappingMappedPercent}%)",{fieldsMappingMappedCount:i.row.fieldsMapping.reduce(((e,t)=>t.mappedField&&t.mappedField.length>0?e+1:e),0),fieldsMappingMappedPercent:Math.round(100*i.value)/100})))])])],1):e._e()])]}}])})],1),t("q-card-actions",{staticClass:"text-primary q-mt-md",attrs:{align:"right"}},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:e.$t("Close")}})],1)],1)],1)],1)},o=[],l=i("1732"),a=i("2f62"),s=i("a87d"),p=i("c1dc"),r=i("31c4"),c=i("da35"),d=i("2675"),m=i("7c4c"),u=i("541d"),g=i("afd9");m["a"].addDefaultLocale(u);var h={name:"PageMarketPipelineTemplateProperties",mixins:[s["a"],p["a"],r["a"]],components:{Identicon:c["a"],IconPicture:d["a"]},data(){return{pipelineTemplateUid:"",searchFilter:"",columns:[{name:"frequency",align:"center",label:this.$t("Frequency"),field:"seenInLogCount",sortable:!0},{name:"Fields",align:"left",label:this.$t("Field Full Paths"),field:"name",sortable:!0,classes:"",style:"font-family: monospace; white-space: pre-line;"},{name:"mapping",align:"center",label:this.$t("Mappings"),field:"mappedField",sortable:!0},{name:"modifiers",align:"center",label:this.$t("Modifiers"),field:e=>e.modifiers&&Array.isArray(e.modifiers)?e.modifiers.join(", "):null,sortable:!0}],pagination:{sortBy:"mapping",descending:!0,rowsPerPage:25},pipelineTemplateLoading:!1,showImportPopupNewPipeline:!1,newPipelineName:"",newPipelineOpenCollector:null,newPipelineStatus:null,importCollectionConfiguration:!0,importFieldsMapping:!0,showImportPopupExistingPipeline:!1,existingPipelineTableSearchFilter:"",existingPipelineTableColumns:[{name:"actions",align:"center",label:this.$t("Actions"),field:"actions",sortable:!1},{name:"status",align:"center",label:this.$t("Status"),field:"status",sortable:!0,sort:(e,t,i,n)=>this.statusTextToId(e)-this.statusTextToId(t)},{name:"name",align:"center",label:this.$t("Pipeline Name"),field:"name",sortable:!0},{name:"collectionShipper",align:"center",label:this.$t("Shipper"),field:e=>e.collectionConfig.collectionShipper,sortable:!0},{name:"collectionMethod",align:"center",label:this.$t("Method"),field:e=>e.collectionConfig.collectionMethod,sortable:!0},{name:"mappingStats",align:"center",label:this.$t("Mapping (%)"),field:e=>e.fieldsMapping&&Array.isArray(e.fieldsMapping)&&e.fieldsMapping.length>0?e.fieldsMapping.reduce(((e,t)=>t.mappedField&&t.mappedField.length>0?e+1:e),0)/e.fieldsMapping.length*100:null,sortable:!0}],existingPipelineTablePagination:{sortBy:"status",descending:!0,rowsPerPage:10}}},computed:{...Object(a["d"])("mainStore",["collectionMethodsOptions","collectionShippersOptions","ezMarketPipelineTemplate"]),readmeMarkdown(){return this.ezMarketPipelineTemplate&&this.ezMarketPipelineTemplate.readmeMarkdown?this.ezMarketPipelineTemplate.readmeMarkdown:""},collectionMethod(){return this.ezMarketPipelineTemplate.collection_configuration&&this.ezMarketPipelineTemplate.collection_configuration.collectionConfig&&this.ezMarketPipelineTemplate.collection_configuration.collectionConfig.collectionMethod?this.ezMarketPipelineTemplate.collection_configuration.collectionConfig.collectionMethod:""},collectionShipper(){return this.ezMarketPipelineTemplate.collection_configuration&&this.ezMarketPipelineTemplate.collection_configuration.collectionConfig&&this.ezMarketPipelineTemplate.collection_configuration.collectionConfig.collectionShipper?this.ezMarketPipelineTemplate.collection_configuration.collectionConfig.collectionShipper:""},collectionMethodOption(){const e={value:"unknown",label:this.$t("Unknown or not set"),icon:"help_center"};return this.collectionMethod&&this.collectionMethod.length&&this.collectionMethodsOptions.find((e=>e.value&&e.value===this.collectionMethod))||e},collectionShipperOption(){const e={value:"unknown",label:this.$t("Unknown or not set"),icon:"unknown",outputFormat:"json"};return this.collectionShipper&&this.collectionShipper.length&&this.collectionShippersOptions.find((e=>e.value&&e.value===this.collectionShipper))||e},collectionConfigOutput(){let e="";return e=this.collectionShipper&&this.collectionShipper.length?this.collectionShipperOption&&this.collectionShipperOption.outputFormat&&this.collectionShipperOption.outputFormat.length?this.collectionMethod&&this.collectionMethod.length?this.collectionConfigOutputFor(this.collectionShipperOption.outputFormat,this.ezMarketPipelineTemplate.collection_configuration.collectionConfig):"# "+this.$t("No Collection Method configured."):"# "+this.$t("Unknown output format."):"# "+this.$t("No Collecting Shipper configured."),e},tableData(){return this.ezMarketPipelineTemplate&&this.ezMarketPipelineTemplate.mapping_configuration&&this.ezMarketPipelineTemplate.mapping_configuration.fieldsMapping?this.ezMarketPipelineTemplate.mapping_configuration.fieldsMapping:[]},existingPipelineTableData(){const e=[];return this.pipelines.forEach((t=>{const i=this.openCollectors.find((e=>e.uid===t.primaryOpenCollector));e.push(Object.assign({},t,{openCollector:i&&i.name&&i.hostname?i.name+" ("+i.hostname+")":null}))})),e},maxSeenInLog(){let e=0;return this.tableData.forEach((t=>{t.seenInLogCount>e&&(e=t.seenInLogCount)})),e},openCollectorsOptions(){const e=[];return this.openCollectors.forEach((t=>{e.push({value:t.uid,label:t.name+" ("+t.hostname+")"})})),e}},methods:{...Object(a["b"])("mainStore",["loadEzMarketPipelineTemplateById","upsertPipeline","adaptPipelineCollectionConfiguration"]),timeAgo(e){let t=this.$t("Some time ago");try{const i=new m["a"]("en-US");t=i.format(new Date(e))}catch(i){}return t},doPromptForNewPipelineDetails(){this.newPipelineName=this.ezMarketPipelineTemplate.name,this.newPipelineOpenCollector=null,this.newPipelineStatus=null,this.importCollectionConfiguration=!0,this.importFieldsMapping=!0,this.showImportPopupNewPipeline=!0},async ImportIntoNewPipeline(){if(this.newPipelineName.length&&(this.importCollectionConfiguration||this.importFieldsMapping)){this.showImportPopupNewPipeline=!1;const e=Object(l["a"])();this.upsertPipeline({pushToApi:!0,caller:this,pipeline:{uid:e,name:this.newPipelineName,status:this.newPipelineStatus&&this.newPipelineStatus.length?this.newPipelineStatus:"New",primaryOpenCollector:this.newPipelineOpenCollector&&this.newPipelineOpenCollector.length?this.newPipelineOpenCollector:null,fieldsMapping:this.importFieldsMapping&&this.ezMarketPipelineTemplate&&this.ezMarketPipelineTemplate.mapping_configuration&&this.ezMarketPipelineTemplate.mapping_configuration.fieldsMapping?JSON.parse(JSON.stringify(this.ezMarketPipelineTemplate.mapping_configuration.fieldsMapping)):null,collectionConfig:this.importCollectionConfiguration&&this.ezMarketPipelineTemplate&&this.ezMarketPipelineTemplate.collection_configuration&&this.ezMarketPipelineTemplate.collection_configuration.collectionConfig?await this.adaptPipelineCollectionConfiguration({importedCollectionConfiguration:this.ezMarketPipelineTemplate.collection_configuration.collectionConfig,targetDetails:{uid:e,name:this.newPipelineName}}):null,options:this.ezMarketPipelineTemplate&&this.ezMarketPipelineTemplate.mapping_configuration&&this.ezMarketPipelineTemplate.mapping_configuration.options?JSON.parse(JSON.stringify(this.ezMarketPipelineTemplate.mapping_configuration.options)):null}})}},collectionMethodDetails(e,t){const i={value:"unknown",label:this.$t("Unknown or not set"),icon:"help_center"};return e&&e.length&&t&&t.length?this.collectionMethodsOptions.find((i=>i.shipper&&i.shipper===e&&i.value&&i.value===t))||i:t},statusTextToId(e){let t=0;return"Ready"===e&&(t=3),"Dev"===e&&(t=2),"New"===e&&(t=1),t},doPromptForExistingPipelineDetails(){this.showImportPopupExistingPipeline=!0},ImportIntoExistingPipeline(e,t){if(e&&e.uid&&e.uid.length&&t){const i=e.uid,n=e.name,o=e.primaryOpenCollector||null,l=e.status,a=!!t&&!!t.importCollectionConfiguration,s=!!t&&!!t.importFieldsMapping;if(n.length&&(a||s)){let e="";a&&s?e=this.$t("This will overide any existing Collection Configuration and Fields Mapping in the selected Pipeline. Are you sure?"):a?e=this.$t("This will overide any existing Collection Configuration in the selected Pipeline. Are you sure?"):s&&(e=this.$t("This will overide any existing Fields Mapping in the selected Pipeline. Are you sure?")),this.$q.dialog({component:g["a"],parent:this,title:this.$t("Confirm overide"),message:e,persistent:!0}).onOk((async()=>{this.upsertPipeline({pushToApi:!0,caller:this,pipeline:{uid:i,name:n,status:l&&l.length?l:"New",primaryOpenCollector:o&&o.length?o:null,fieldsMapping:s&&this.ezMarketPipelineTemplate&&this.ezMarketPipelineTemplate.mapping_configuration&&this.ezMarketPipelineTemplate.mapping_configuration.fieldsMapping?JSON.parse(JSON.stringify(this.ezMarketPipelineTemplate.mapping_configuration.fieldsMapping)):null,collectionConfig:a&&this.ezMarketPipelineTemplate&&this.ezMarketPipelineTemplate.collection_configuration&&this.ezMarketPipelineTemplate.collection_configuration.collectionConfig?await this.adaptPipelineCollectionConfiguration({importedCollectionConfiguration:this.ezMarketPipelineTemplate.collection_configuration.collectionConfig,targetDetails:{uid:i,name:n}}):null,options:this.ezMarketPipelineTemplate&&this.ezMarketPipelineTemplate.mapping_configuration&&this.ezMarketPipelineTemplate.mapping_configuration.options?JSON.parse(JSON.stringify(this.ezMarketPipelineTemplate.mapping_configuration.options)):null},onSuccessCallBack:this.loadPipelines,onErrorCallBack:this.loadPipelines})}))}}}},mounted(){this.$route.params.pipelineTemplateUid&&this.$route.params.pipelineTemplateUid.length&&this.pipelineTemplateUid!==this.$route.params.pipelineTemplateUid&&(this.pipelineTemplateUid=this.$route.params.pipelineTemplateUid),this.ezMarketPipelineTemplates&&this.ezMarketPipelineTemplates.length||this.loadEzMarketPipelineTemplateById({pipelineTemplateUid:this.pipelineTemplateUid})}},f=h,P=(i("3fba"),i("2877")),C=i("9989"),M=i("e359"),q=i("b498"),w=i("65c6"),v=i("9c40"),_=i("eb85"),b=i("4e73"),k=i("1c1c"),T=i("66e5"),y=i("4074"),z=i("cb32"),S=i("0170"),x=i("6ac5"),$=i("f09f"),I=i("a370"),O=i("2c91"),F=i("0016"),N=i("05c0"),Q=i("27f9"),D=i("eaac"),E=i("db86"),L=i("6b1d"),A=i("24e8"),U=i("ddd8"),j=i("9564"),J=i("4b7e"),B=i("58ea"),R=i("7f67"),H=i("714f"),V=i("eebe"),Z=i.n(V),G=Object(P["a"])(f,n,o,!1,null,null,null);t["default"]=G.exports;Z()(G,"components",{QPage:C["a"],QHeader:M["a"],QColor:q["a"],QToolbar:w["a"],QBtn:v["a"],QSeparator:_["a"],QMenu:b["a"],QList:k["a"],QItem:T["a"],QItemSection:y["a"],QAvatar:z["a"],QItemLabel:S["a"],QToolbarTitle:x["a"],QCard:$["a"],QCardSection:I["a"],QSpace:O["a"],QIcon:F["a"],QTooltip:N["a"],QInput:Q["a"],QTable:D["a"],QTd:E["a"],QLinearProgress:L["a"],QDialog:A["a"],QSelect:U["a"],QToggle:j["a"],QCardActions:J["a"],QCircularProgress:B["a"]}),Z()(G,"directives",{ClosePopup:R["a"],Ripple:H["a"]})},"3fba":function(e,t,i){"use strict";i("7e9e")},"7e9e":function(e,t,i){}}]);