(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["globalNav"],{"26cb":function(t,e,n){"use strict";n("694c")},"694c":function(t,e,n){},8739:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.$auth.isAuthenticated&&this.$parent.USER_AUTHORIZED?n("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"dark"}},[n("b-navbar-brand",{attrs:{to:{path:"/"}}},[n("b-img-lazy",{staticClass:"d-inline-block align-top",attrs:{src:"/assets/blobcamera.png",width:"30",height:"30",alt:"Blob Holding Camera"}}),t._v(" Blob Image Hosting")],1),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:{path:"/"},active:"Home"==t.$route.name}},[t._v("Home")]),n("b-nav-item",{attrs:{to:{path:"/files"},active:"My Files"==t.$route.name}},[t._v("My Files")])],1),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-item",{attrs:{active:""}},[t._v(t._s(t.LANG_STORAGE_USAGE))]),n("b-nav-item",{on:{click:t.logout}},[t._v("Sign Out")])],1)],1)],1):t._e()],1)},r=[],o=(n("99af"),n("96cf"),n("1da1")),i=n("bc3a"),s=n.n(i),c={name:"navbar",computed:{routes:function(){return this.$router.options.routes}},data:function(){return{LANG_STORAGE_USAGE:"Calculating..."}},methods:{logout:function(){this.$auth.logout({returnTo:window.location.origin})},API_me:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.next=3,s.a.get("".concat(e.$parent.API_BASE_URL,"/me"),{headers:{Authorization:"Bearer ".concat(e.$parent.JWT_TOKEN)}}).catch((function(t){if(console.log(t),"UNKNOWN_USER"==t.response.data.error_message)return e.$parent.USER_AUTHORIZED=!1,e.$router.push({name:"unknown_user"})}));case 3:n=t.sent,a=n.data,e.$parent.USER_INFO=a.me,e.$parent.STORAGE_USAGE=a.me.current_storage_usage,e.$parent.STORAGE_LIMIT=a.me.storage_limit,e.$parent.API_KEY=a.me.api_key,"unlimited"==e.$parent.STORAGE_LIMIT?this.LANG_STORAGE_USAGE="You are using ".concat(e.$parent.$options.filters.prettyBytes(e.$parent.STORAGE_USAGE)," out of unlimited storage."):this.LANG_STORAGE_USAGE="You are using ".concat(e.$parent.$options.filters.prettyBytes(e.$parent.STORAGE_USAGE)," out of ").concat(e.$parent.$options.filters.prettyBytes(e.$parent.STORAGE_LIMIT),".");case 10:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),API_domains:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.next=3,s.a.get("".concat(e.$parent.API_BASE_URL,"/domains"),{headers:{Authorization:"Bearer ".concat(e.$parent.JWT_TOKEN)}});case 3:n=t.sent,a=n.data,e.$parent.USER_DOMAINS=a.domains,e.$parent.USER_DEFAULT_DOMAIN=a.default_domain;case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){this.API_me(),this.$nextTick((function(){var t=this;window.setInterval((function(){t.API_me(),t.API_domains()}),this.$parent.REFRESH_INTERVAL)}))}},u=c,l=(n("26cb"),n("2877")),p=Object(l["a"])(u,a,r,!1,null,"4d1fae05",null);e["default"]=p.exports},"99af":function(t,e,n){"use strict";var a=n("23e7"),r=n("d039"),o=n("e8b5"),i=n("861d"),s=n("7b0b"),c=n("50c4"),u=n("8418"),l=n("65f0"),p=n("1dde"),_=n("b622"),d=n("2d00"),f=_("isConcatSpreadable"),m=9007199254740991,h="Maximum allowed index exceeded",v=d>=51||!r((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),A=p("concat"),b=function(t){if(!i(t))return!1;var e=t[f];return void 0!==e?!!e:o(t)},g=!v||!A;a({target:"Array",proto:!0,forced:g},{concat:function(t){var e,n,a,r,o,i=s(this),p=l(i,0),_=0;for(e=-1,a=arguments.length;e<a;e++)if(o=-1===e?i:arguments[e],b(o)){if(r=c(o.length),_+r>m)throw TypeError(h);for(n=0;n<r;n++,_++)n in o&&u(p,_,o[n])}else{if(_>=m)throw TypeError(h);u(p,_++,o)}return p.length=_,p}})}}]);