(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{"8b24":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t._self._c;return e("q-page",{staticClass:"column justify-around"},[e("div",{staticClass:"flex flex-center"},[e("div",[e("div",{staticClass:"text-h2",staticStyle:{opacity:".4"}},[t._v("\n        OC Admin\n      ")]),e("div",{staticClass:"text-h6 text-right",staticStyle:{opacity:".3"}},[e("q-tooltip",{attrs:{"content-style":"font-size: 1em"}},[e("span",{staticClass:"text-bold"},[t._v(t._s(t.$t("OC Admin Client version:")))]),t._v(" v"+t._s(t.version)),e("br"),e("span",{staticClass:"text-bold"},[t._v(t._s(t.$t("OC Admin Server version:")))]),t._v(" v"+t._s(t.serverVersion)+"\n        ")]),t._v("\n        v"+t._s(t.version)+"\n      ")],1)])]),e("div",{staticClass:"row justify-around"},[e("div",{staticClass:"column justify-around",staticStyle:{"max-width":"35rem"}},[e("div",[e("div",{staticClass:"text-h6 q-pb-none"},[t._v("\n          "+t._s(t.$t("Start"))+"\n        ")]),e("div",{staticClass:"q-pt-none"},[t.commonTasks?e("q-list",{attrs:{padding:""}},t._l(t.commonTasks,(function(i,s){return e("q-item",{key:s,staticClass:"text-primary",attrs:{tag:"a",href:i.link,clickable:""}},[e("q-item-section",{attrs:{avatar:""}},[e("q-icon",{attrs:{name:i.icon}})],1),e("q-item-section",[t._v(t._s(i.label))])],1)})),1):t._e()],1)]),e("div",[e("div",{staticClass:"text-h6 q-pb-none"},[t._v("\n          "+t._s(t.$t("Recent"))+"\n        ")]),e("div",{staticClass:"q-pt-none"},[t.recentItems?e("q-list",{attrs:{padding:""}},t._l(t.recentItems,(function(i,s){return e("q-item",{key:s,staticClass:"text-primary",attrs:{tag:"a",href:i.link,clickable:""}},[e("q-item-section",{attrs:{avatar:""}},[e("q-icon",{attrs:{name:i.icon}})],1),e("q-item-section",[t._v(t._s(i.label))])],1)})),1):t._e()],1)])]),e("div",{staticClass:"column",staticStyle:{width:"35rem"}},[e("div",[e("div",{staticClass:"text-h6 q-pb-none"},[t._v("\n          "+t._s(t.$t("Latest"))+"\n        ")]),e("div",{staticClass:"q-pt-none"},[e("q-scroll-area",{staticStyle:{height:"38rem"},attrs:{visible:""}},[t.latestNews?e("q-list",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},t._l(t.latestNews,(function(i,s){return e("q-item",{key:s,staticClass:"q-py-none q-pr-none q-pl-sm q-mr-sm",attrs:{tag:"a",href:i.link,target:"_blank",clickable:""}},[e("q-card",{staticClass:"full-width full-height"},[e("q-card-section",[i.chip?e("q-badge",{staticClass:"q-mr-sm",attrs:{color:i.chip.colour?i.chip.colour:void 0,label:i.chip.label?i.chip.label:void 0,floating:""}}):t._e(),e("q-item",[e("q-item-section",{attrs:{top:"",avatar:""}},[e("q-icon",{attrs:{name:i.icon}})],1),e("q-item-section",[e("q-item-label",{staticClass:"text-bold",attrs:{lines:2}},[t._v(t._s(i.title))]),e("q-item-label",[e("q-markdown",{staticClass:"col",attrs:{src:i.markdownBody,"no-heading-anchor-links":""}})],1)],1)],1)],1)],1)],1)})),1):t._e()],1)],1)])])]),e("q-dialog",{attrs:{persistent:""},model:{value:t.needToConfigureMsSql,callback:function(e){t.needToConfigureMsSql=e},expression:"needToConfigureMsSql"}},[e("q-card",{staticStyle:{"min-width":"350px"}},[e("q-card-section",{staticClass:"row items-center"},[e("q-avatar",{attrs:{icon:"link_off",color:"primary","text-color":"white"}}),e("div",{staticClass:"text-h6 q-ml-sm"},[t._v(t._s(t.$t("No connection to the SIEM")))])],1),e("q-card-section",{staticClass:"q-pt-none"},[t._v("\n        "+t._s(t.$t("The connection details to the SQL server on the SIEM are missing."))+"\n      ")]),e("q-card-section",{staticClass:"q-pt-none q-mb-md"},[t._v("\n        "+t._s(t.$t("Go to the Admin page and fix it."))+"\n      ")]),e("q-separator"),e("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[e("q-btn",{attrs:{flat:"",label:t.$t("Close")},on:{click:function(e){return t.promptIgnoreConfigureMsSql()}}}),e("q-btn",{attrs:{color:"primary",label:t.$t("Go to Admin"),to:"Admin/SIEM/MsSql"}})],1)],1)],1)],1)},a=[],n=i("2f62"),o=i("9224"),l=i("afd9"),r={name:"PageIndex",data(){return{version:o["b"],hideNeedToConfigureMsSqlPopup:!1,commonTasks:[{label:this.$t("Create, Edit and Manage my OpenCollectors..."),icon:"o_mediation",link:"#/OpenCollectors"},{label:this.$t("Create, Edit and Manage my Pipelines..."),icon:"o_account_tree",link:"#/Pipelines"},{label:this.$t("Check my Notifications..."),icon:"o_mail_outline",link:"#/MarketPlace/Notifications"},{label:this.$t("Browse the Marketplace..."),icon:"o_storefront",link:"#/MarketPlace/PipelineTemplates"}]}},computed:{...Object(n["d"])("mainStore",["deployment","extraInformation","latestNews"]),serverVersion(){return this.deployment&&this.deployment.version?this.deployment.version:"?.?.?"},needToConfigureMsSql(){return this.extraInformation&&this.extraInformation.msSqlConnectionConfigMissing&&!this.hideNeedToConfigureMsSqlPopup},recentItems(){let t=[];try{t=JSON.parse(localStorage.getItem("landing.recentItems")||[])}catch(e){}return(t&&Array.isArray(t)?t.map((t=>({label:t.name||this.$t("No name"),icon:"pipeline"===t.type?"o_account_tree":"o_description",link:t.link||("pipeline"===t.type?"#/Pipelines":"#/Welcome"),lastVisit:t.lastVisit||0,type:t.type||"pipeline",uid:t.uid||""}))):[]).sort(((t,e)=>t.lastVisit-e.lastVisit)).slice(-5)}},methods:{...Object(n["b"])("mainStore",["loadLatestNews"]),promptIgnoreConfigureMsSql(){this.$q.dialog({component:l["a"],parent:this,title:this.$t("Confirm"),message:this.$t("A lot of things will NOT work until this is configred. Are you sure you want to ignore this for now?"),persistent:!0}).onOk((()=>{})).onCancel((()=>{this.hideNeedToConfigureMsSqlPopup=!0}))}},mounted(){}},c=r,d=i("2877"),m=i("9989"),p=i("05c0"),q=i("1c1c"),h=i("66e5"),u=i("4074"),v=i("0016"),C=i("4983"),f=i("f09f"),_=i("a370"),g=i("58a8"),b=i("0170"),y=i("24e8"),k=i("cb32"),S=i("eb85"),x=i("4b7e"),w=i("9c40"),M=i("eebe"),I=i.n(M),$=Object(d["a"])(c,s,a,!1,null,null,null);e["default"]=$.exports;I()($,"components",{QPage:m["a"],QTooltip:p["a"],QList:q["a"],QItem:h["a"],QItemSection:u["a"],QIcon:v["a"],QScrollArea:C["a"],QCard:f["a"],QCardSection:_["a"],QBadge:g["a"],QItemLabel:b["a"],QDialog:y["a"],QAvatar:k["a"],QSeparator:S["a"],QCardActions:x["a"],QBtn:w["a"]})}}]);