/*! sort-comments - v0.9.0 - 08-04-2013 */
//reduced version of jQuerify by Karl Swedberg
;(function getJQuery(url,success){
  var script = document.createElement('script');
  script.src = url;
  var head = document.getElementsByTagName('head')[0];
  var done = false;
 
  script.onload = script.onreadystatechange = function(){
    if ( !done && (!this.readyState
         || this.readyState == 'loaded'
         || this.readyState == 'complete') ) {
      done = true;
      success();
      script.onload = script.onreadystatechange = null;
      head.removeChild(script);
    }
  };
  head.appendChild(script);
})("http://code.jquery.com/jquery-latest.min.js", sortComments);

function sortComments(){
//TinySort jQuery plugin
;(function(e,c){var h=!1,k=null,o=parseFloat,l=Math.min,m=/(-?\d+\.?\d*)$/g,g=/(\d+\.?\d*)$/g,i=[],f=[],b=function(p){return typeof p=="string"},n=Array.prototype.indexOf||function(r){var p=this.length,q=Number(arguments[1])||0;q=q<0?Math.ceil(q):Math.floor(q);if(q<0){q+=p}for(;q<p;q++){if(q in this&&this[q]===r){return q}}return -1};e.tinysort={id:"TinySort",version:"1.5.2",copyright:"Copyright (c) 2008-2013 Ron Valstar",uri:"http://tinysort.sjeiti.com/",licensed:{MIT:"http://www.opensource.org/licenses/mit-license.php",GPL:"http://www.gnu.org/licenses/gpl.html"},plugin:(function(){var p=function(q,r){i.push(q);f.push(r)};p.indexOf=n;return p})(),defaults:{order:"asc",attr:k,data:k,useVal:h,place:"start",returns:h,cases:h,forceStrings:h,ignoreDashes:h,sortFunction:k}};e.fn.extend({tinysort:function(){var C,B,E=this,s=[],r=[],F=[],G=[],v=0,q,A=[],x=[],y=function(H){e.each(i,function(I,J){J.call(J,H)})},w=function(S,Q){var H=0;if(v!==0){v=0}while(H===0&&v<q){var O=G[v],L=O.oSettings,P=L.ignoreDashes?g:m;y(L);if(L.sortFunction){H=L.sortFunction(S,Q)}else{if(L.order=="rand"){H=Math.random()<0.5?1:-1}else{var R=h,K=!L.cases?a(S.s[v]):S.s[v],J=!L.cases?a(Q.s[v]):Q.s[v];if(!t.forceStrings){var I=b(K)?K&&K.match(P):h,T=b(J)?J&&J.match(P):h;if(I&&T){var N=K.substr(0,K.length-I[0].length),M=J.substr(0,J.length-T[0].length);if(N==M){R=!h;K=o(I[0]);J=o(T[0])}}}H=O.iAsc*(K<J?-1:(K>J?1:0))}}e.each(f,function(U,V){H=V.call(V,R,K,J,H)});if(H===0){v++}}return H};for(C=0,B=arguments.length;C<B;C++){var z=arguments[C];if(b(z)){if(A.push(z)-1>x.length){x.length=A.length-1}}else{if(x.push(z)>A.length){A.length=x.length}}}if(A.length>x.length){x.length=A.length}q=A.length;if(q===0){q=A.length=1;x.push({})}for(C=0,B=q;C<B;C++){var D=A[C],t=e.extend({},e.tinysort.defaults,x[C]),u=!(!D||D==""),p=u&&D[0]==":";G.push({sFind:D,oSettings:t,bFind:u,bAttr:!(t.attr===k||t.attr==""),bData:t.data!==k,bFilter:p,$Filter:p?E.filter(D):E,fnSort:t.sortFunction,iAsc:t.order=="asc"?1:-1})}E.each(function(O,H){var K=e(H),I=K.parent().get(0),J,N=[];for(j=0;j<q;j++){var P=G[j],L=P.bFind?(P.bFilter?P.$Filter.filter(H):K.find(P.sFind)):K;N.push(P.bData?L.data(P.oSettings.data):(P.bAttr?L.attr(P.oSettings.attr):(P.oSettings.useVal?L.val():L.text())));if(J===c){J=L}}var M=n.call(F,I);if(M<0){M=F.push(I)-1;r[M]={s:[],n:[]}}if(J.length>0){r[M].s.push({s:N,e:K,n:O})}else{r[M].n.push({e:K,n:O})}});e.each(r,function(H,I){I.s.sort(w)});e.each(r,function(K,N){var M=N.s.length,J=[],I=M,L=[0,0];switch(t.place){case"first":e.each(N.s,function(P,Q){I=l(I,Q.n)});break;case"org":e.each(N.s,function(P,Q){J.push(Q.n)});break;case"end":I=N.n.length;break;default:I=0}for(C=0;C<M;C++){var O=d(J,C)?!h:C>=I&&C<I+N.s.length,H=(O?N.s:N.n)[L[O?0:1]].e;H.parent().append(H);if(O||!t.returns){s.push(H.get(0))}L[O?0:1]++}});E.length=0;Array.prototype.push.apply(E,s);return E}});function a(p){return p&&p.toLowerCase?p.toLowerCase():p}function d(q,s){for(var r=0,p=q.length;r<p;r++){if(q[r]==s){return !h}}return h}e.fn.TinySort=e.fn.Tinysort=e.fn.tsort=e.fn.tinysort})(jQuery);
//COMMENTS START//
var numOfPages = 5;
//get video id
var videoId = window.location.href.match(/[&?]v=.{11}/i)[0].slice(3);
//first page with comments for the video
var commentsHttp = "http://www.youtube.com/all_comments?v=" + videoId;
//this is where comments will be prepended
var $commmentsView = $("#comments-view");
//creating list that will hold thumbsUp comments
var $thumbsUpUl = $("<ul></ul>");
//div for holding loading gif, centered
var $spinnerContainer = $("<div style='width:40px;margin:auto'></div>").prependTo( $commmentsView );
//spinner options
var $spinner =  $("<img src='data:image/jpeg;base64,R0lGODlhIwAjAMQAAP////f39+/v7+bm5t7e3tbW1s7OzsXFxb29vbW1ta2traWlpZycnJSUlIyMjISEhHt7e3Nzc2tra2NjY1paWlJSUkpKSkJCQjo6OjExMSkpKRkZGRAQEAAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBAAeACwAAAAAIwAjAAAF5CAgjmRpnmiqrmzrvnAsz3Rto4Fwm4EYLIweQHcTKAiAQOPRI0QKRcYiEGA4qI8K9HZoGAIOSOBgCdIGBeLCMUgoBJSJjsBAxAiKRSFAQBCVBwMKGRsNQi8DBwsJhyQVGxMKjTCJk0kPjDI5AlQqBAcICFstBQqmmScFGh0dHBaWKAIEBQQDKQEKDxEQCTMBA5Y/o5oDoZYCHB1PMgIHCQacwCPACRStDTEDBrYABQg5wAgGIg4YYjQCogEGB3wI3J2+oD0G42PfN2Pc7D2JRDb/+In4t8MHwYIIEypcyLChQ4YhAAAh+QQFBAAeACwIAAgAEwATAAAFlqAnjiKSjAFJBscgLos4NIQ6JggAKLHXSDWbp6CoLRgeg0ShGwkIKQ9iITggPJFHaqA4eAYIRK0a9SwK0spl0TQkvEIJJnIlCdDCRk4lEJIGBgcHRn4jBBkciROFKgkNDg51jCJBJJU2ARocD4xNAQsGCBMcGz2FAxwZKQwVDYVwEhwOI02MAxsceJMeOgwaJ7skCX0jIQAh+QQFBAAeACwAAAAAAQABAAAFA6AXAgAh+QQFBAAeACwAAAAAAQABAAAFA6AXAgAh+QQFBAAeACwJAAcAEgAVAAAFjqAnjmJAnihgHChqCACAJKMyoMHBeggSJ40baoC4zTwFB6IlOiwLhkCDMUIYUAUSgiA4RCZLAXPkoDQOsfFosVNjDYaBQiRmWjaaDMTdXDAYbWMJQnwiGBoOBEwmIwVeGhhzKAJ+BBsXIgoSVCcEAxkbAw8enEwAARkaYqluAqliChlLY64aQrNjAT2MKCEAIfkEBQQAHgAsBwAIABQAFAAABZqgJ45jUQBkqorGgQqIsKqteCjyTLbAsBg6UoBA8CgSIoGhGGQNAoXG4zAaNBcPxalJQhS4KwGhUCQgRYHZQGKxVBpgD8CQUCiAYEQTpZpcGFYrBgw5HgkEBg4XFHoqFx10CwMZFCIIDwl8IwscFAQXGR4NGQo6BBocRRUYHgIWGEwqBxoPHgEWoYYXVCsBCTIBqzkHaVwHvCshACH5BAUEAB4ALAAAAAABAAEAAAUDoBcCACH5BAUEAB4ALAcACAAVABQAAAWaoCeOpDECZKqKgRcY7bqanoHI6+EKSIHjCJ2oMPidCgIPQbHwGUkIBoLwJAEM1OpqQBgkC0yjwBGRRBQokfdXOASzo0MjqTrQUwQIpwM/QSYJKQoaHRUKHgtQSgwTEUIeDRcPSRQcHgiBFREiB1IkdAkaEgMUGAILFoE4AxkaRRIVLRIURTIGGQ0iExWcEzQyBzGwI05PV78rIQAh+QQFBAAeACwAAAAAAQABAAAFA6AXAgAh+QQFBAAeACwHAAgAFAAUAAAFlaAnjmRBnmgqCip6kEGbDnJqvmJAsLVIDwgEoTc6JAy0k05VSIoKiSgipgoIaIFKZ8tBVBeNBgORkEwkDt6sYECSBosUwJRybDiqxuOgTmTwCAUKIwAHAwMJDw10CxUNMRIaBQcIAmhPCgYjVAcZDx4REx5lOCoWGCIPER4Bqi0FFwwiEBIxBg9DKpqpEVS5PQUFACohACH5BAUEAB4ALAAAAAABAAEAAAUDoBcCACH5BAUEAB4ALAcACAAUABQAAAWRoCeOpEGeaCoGKmqOQlvKXgId4usR6DA+HA6kQDsxMB0Nr0hSTHxFAgJxIABogpiEI9rgVAiF2ICARCANVovAjsESKoKaNGBkMqrEojA/WDYSHgMIJAVZBwsKSwoSCyIOFx4FJg4LVwQHRCgVDQIOEAEHDi9XJwISFAIADA4iDJ1xEwoiDa2SDFA0rCO5NGwtIQAh+QQFBAAeACwAAAAAAQABAAAFA6AXAgAh+QQFBAAeACwHAAgAEwAUAAAFj6AnisNonqeBLWg7GpwmtAENcc8s6ifyGKJMp1DyIFqNjecxUEiKLpGi4slATcBW4hkdDQ6HbHd048TELtah8XCwxqjAsXXdKSyWuuiAILwmGBBABzUiBDUFCQglCBAJIgsTBAQFAQpzAwZ1BREsCwweBQt+Lg8QNQpvCAqFJwMQc6mGjy6kHrI7cB4DeiIhACH5BAUEAB4ALAAAAAABAAEAAAUDoBcCACH5BAUEAB4ALAcABwASABUAAAWXoCeOI0GQaBpUl5CSRZV4QrYN71hoWBBkGpdISAI4No2BhoNLHRijy8YQmQwOpJMC2BAgIh5fgJZKSDYWYg4FWZMMhkLT7XHYeAW6wrBgLGZ0KQZjgR4IEhFqJIAeBQ8UDQUCeSNzIwcNCCIJDwMDJwgGawSZAQgzBAiWIwELDSIHmh6xOQyiAKciV4oeAHO0IwB0ArweIQAh+QQFBAAeACwAAAAAAQABAAAFA6AXAgAh+QQFBAAeACwHAAcAEAAVAAAFjKAnjuMwkKgnjFJVosSEeMGVrcc1j8TlehVMIIDh7EaMzMKDuTE4k4DHsCiIKJnCI0LYcE6ehMWyPDxGgshyZL5MUqID6uCAowsEwsouWlTGFAR8HgUJCglHgyNWigF0dXYzBAwPCoJgcAUKBnELAgKYcAObHgdyfIYiBQcAdgIJjAanrq0AsoojQyghACH5BAUEAB4ALAAAAAABAAEAAAUDoBcCACH5BAUEAB4ALAcACAAUABQAAAWYoCeKwQhF5aiqA3SIlDVW7yoOlCRKlVhtNZtHYUkIKBfPYoNaFRADUUTWeAwyGYHHAFmIDhIJImBorBIFB6cDSZUnEGEA08k0UiPDQrsSTB58HgEDhEIqAHgIERESVoY2BAcIBwaPlh5Rl04KCnhnKwMJDFCelgMIBAAeT3hBNqoeAggFIgiaX7ZblZoBB5lbqoG3wzbCKyEAIfkEBQQAHgAsBwAHABUAEwAABZygJ46jIJBoSjZPqa6GGEmBZ0zx60Gt90QiSSb3QkgOHskkkMj0UAOkyCEhLBiey2X0SIwMLKRVAPAEHggCY8N5egiKB6OGAmwtC1UhQScFIgt9JAKCKQUICQkxBw2NCycqBhsdlBgBAwUGBgRlKgMPExMSgSSdKmQvBAgIOqwoAgeKkDopBgMiMbOutCgGSLe8IlIeSKbBI1LAKCEAIfkEBQQAHgAsAAAAAAEAAQAABQOgFwIAIfkEBQQAHgAsAAAAAAEAAQAABQOgFwIAIfkECQQAHgAsAAAAACMAIwAABbWgJ45kaZ5oqq5s675wLM90baPBvS6MTgoKgqjxEBEihZuAsRAxHKJHJXk7NAwBB8RzsPRqBYFo4RgkFALKxMhAxAiKBdXtAXgah4Eis2nIBgcLCSgVGxMKNYAoD4MzAgI5KgQHCAhULQUKmgmRJgUaIhwWLwIEBQQDKQEKDxEQCXYxnSUBcjapKAIcHUg+JgkUHRx+YB6zIw4YEMc2QiMBzDB0HgbGvifR19rb3N3e3+Dh4ikhADs='>");
//add spinner to DOM
$spinner.appendTo($spinnerContainer);

//construct links
var links = [];
var link = commentsHttp + "&page=";
for(var i = 1; i <= numOfPages; i++ ){
	links.push( link + i);
}

//this will check if all callbacks have returned
var callbackCounter = 0;

//FIX if no links
$.each(links, function(i, link){

	$.ajax({
      url: link,
      dataType: "html"
  }).done(function(data) {

      var positiveComments = $(data.trim()).find(".comment").has(".comments-rating-positive");
      positiveComments.appendTo( $thumbsUpUl );

      //console.log("callback nr " + (i + 1));

      callbackCounter += 1;
      if( callbackCounter == numOfPages ){
        sortAddVids();
      }
  });
});

function sortAddVids(){
	//sort using tinysort
	$thumbsUpUl.children().tsort({attr:'data-score', order:'desc'});
	//remove spinner
	$spinnerContainer.remove();
	//prepends thumbsUpUl to DOM and prepends the header to DOM
	$commmentsView.prepend( $thumbsUpUl ).prepend( $("<h4><strong>Comments With Thumbs Up (Sorted)</strong></h4>") );
}

}
//COMMENTS END//
