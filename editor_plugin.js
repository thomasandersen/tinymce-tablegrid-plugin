(function(){tinymce.PluginManager.requireLangPack("tablegrid");tinymce.create("tinymce.plugins.TableGrid",{createControl:function(f,a){var d=this,b=d.ed;if(f==="tablegrid"){var e=a.createSplitButton("grid",{title:"tablegrid.create_table",image:d.url+"/img/table-grid.gif",onclick:function(){b.execCommand("mceInsertTable")}});e.showMenu=function(){d.ed.execCommand("openTableGridPopup")};return e}return null},init:function(a,b){var c=this,d=tinymce.DOM;c.url=b;c.ed=a;c.popupIsVisible=0;c.tableGridSelectionBoookmark=null;a.addCommand("openTableGridPopup",function(){c._showPopupMenu()});a.onClick.add(function(f,g){c._hidePopupMenu()});a.onNodeChange.add(function(f,e,h){var g;h=f.selection.getStart();g=f.dom.getParent(h,"td,th,caption");e.setActive("grid",h.nodeName==="TABLE"||!!g);if(g&&g.nodeName==="CAPTION"){g=0}e.setDisabled("delete_table",!g);e.setDisabled("delete_col",!g);e.setDisabled("delete_table",!g);e.setDisabled("delete_row",!g);e.setDisabled("col_after",!g);e.setDisabled("col_before",!g);e.setDisabled("row_after",!g);e.setDisabled("row_before",!g);e.setDisabled("row_props",!g);e.setDisabled("cell_props",!g);e.setDisabled("split_cells",!g);e.setDisabled("merge_cells",!g)});a.onInit.add(function(f,e){d.loadCSS(b+"/css/tablegrid.css");c._createPopupMenu()});d.bind(document,"mousedown",function(g){var h=d.getParent(g.target,".tg-menu-container");var f=g.target.id===a.id+"_grid_open";if(!f&&!h){c._hidePopupMenu()}})},getInfo:function(){return{longname:"Table Grid",author:"Thomas Andersen (thomas@mr-andersen.no)",authorurl:"http://www.mr-andersen.no.com",infourl:"http://www.mr-andersen.no.com",version:"1.0"}},_createPopupMenu:function(){var j=this,f=j.ed,d=tinymce.DOM;var i,h,g,c,e,a,b;i=d.create("table",{cellpadding:0,cellspacing:0,id:f.id+"-tg-menu-container","class":"tg-menu-container",style:"display:none"});h=d.create("tbody");g=d.create("tr");c=d.create("td");d.add(i,h);d.add(h,g);d.add(g,c);e=d.create("div",{id:f.id+"-tg-grid-wrapper","class":"tg-grid-wrapper"});a=j._createGrid();g=d.create("tr");c=d.create("td");b=d.create("div",{id:f.id+"-tg-menu-info","class":"tg-menu-info"},"0 x 0");d.bind(b,"mouseover",function(l){var k=f.getLang("tablegrid.close_grid");l.target.innerHTML=k;l.target.title=k});d.bind(b,"click",function(k){j._hidePopupMenu()});d.add(c,e);d.add(e,a);d.add(h,g);d.add(g,c);d.add(c,b);d.add(d.select("body",document)[0],i)},_showPopupMenu:function(h){var k=this,g=k.ed,e=tinymce.DOM;var a=e.select("#"+g.id+"-tg-menu-container",document)[0];if(tinymce.isIE){g.focus();k.tableGridSelectionBoookmark=g.selection.getBookmark()}if(k.popupIsVisible){return k._hidePopupMenu()}var b=e.select("#"+g.id+"_grid",document)[0];var j=e.getPos(b,document.getElementsByTagName("body")[0]);var f=e.getRect(b);var i=j.y+f.h;var d=j.x;e.addClass(b,"mceSplitButtonSelected");e.show(a);e.setStyles(a,{top:(i+"px"),left:(d+"px")});k.popupIsVisible=1},_hidePopupMenu:function(){var b=this,a=b.ed,e=tinymce.DOM;var d=e.select("#"+a.id+"-tg-menu-container",document)[0];var c=e.select("#"+a.id+"_grid",document)[0];if(!d){return}e.removeClass(c,"mceSplitButtonSelected");e.hide(d);b._clearGrid();b.popupIsVisible=0},_createGrid:function(){var m=this,g=m.ed,d=tinymce.DOM,h,c,b,f,e;var l=parseInt(g.getParam("tablegrid_row_size"))||10;var k=parseInt(g.getParam("tablegrid_col_size"))||10;var a=d.create("table",{"class":"tg-grid",cellSpacing:1,cellPadding:0});b=d.create("tbody");for(f=0;f<l;f++){h=d.create("tr",{});d.add(b,h);for(e=0;e<k;e++){c=m._createCell(f,e);d.add(h,c)}}d.add(a,b);return a},_createCell:function(g,e){var i=this,d=i.ed,b=tinymce.DOM,h,f;var a=b.create("td");var c=b.create("a",{row:g,col:e,"class":"tg-blank"},"&nbsp;");b.add(a,c);b.bind(c,"mouseover",function(j){i._fillCells(j.target)},document);b.bind(c,"click",function(j){h=parseInt(b.getAttrib(j.target,"row"))+1;f=parseInt(b.getAttrib(j.target,"col"))+1;i._insert(h,f);i._hidePopupMenu()},document);return a},_fillCells:function(f){var o=this,k=o.ed,e=tinymce.DOM;var c=e.select("#"+k.id+"-tg-menu-container",document)[0];var a=e.select("#"+k.id+"-tg-grid-wrapper",document)[0];var b=e.select("#"+k.id+"-tg-menu-info",c)[0];var n=e.select("tr",a);var l=parseInt(e.getAttrib(f,"row"))+1,h=parseInt(e.getAttrib(f,"col"))+1;var m,g,d;for(g=0;g<n.length;g++){m=e.select("a",n[g]);for(d=0;d<m.length;d++){if(d<h&&g<l){e.setAttrib(m[d],"class","tg-fill-color");b.innerHTML=(g+1)+" x "+(d+1)}else{e.setAttrib(m[d],"class","tg-blank")}}}},_clearGrid:function(){var c=this,a=c.ed,g=tinymce.DOM,b;var d=g.select("#"+a.id+"-tg-menu-container",document)[0];var e=g.select("#"+a.id+"-tg-menu-info",d)[0];var f=g.select("a",d);e.innerHTML="0 x 0";g.setAttrib(f,"class","tg-blank")},_insert:function(a,b){var l=this,h=l.ed,c=h.dom,k=h.selection,e,d;var g='<table border="0" class="mceItemTable" _mce_new="1">\n';g+="<tbody>\n";for(e=0;e<a;e++){g+="<tr>\n";for(d=0;d<b;d++){if(!tinymce.isIE){g+='<td><br _mce_bogus="1" /></td>\n'}else{g+="<td></td>\n"}}g+="</tr>\n"}g+="</tbody>\n";g+="</table>\n";if(tinymce.isIE){h.selection.moveToBookmark(l.tableGridSelectionBoookmark)}h.execCommand("mceBeginUndoLevel");if(h.settings.fix_table_elements){var f="";h.focus();h.selection.setContent('<br class="_mce_marker" />');tinymce.each("h1,h2,h3,h4,h5,h6,p".split(","),function(i){if(f){f+=","}f+=i+" ._mce_marker"});tinymce.each(h.dom.select(f),function(i){h.dom.split(h.dom.getParent(i,"h1,h2,h3,h4,h5,h6,p"),i)});c.setOuterHTML(c.select("br._mce_marker")[0],g)}else{h.execCommand("mceInsertContent",false,g)}tinymce.each(c.select("table[_mce_new]"),function(i){var j=c.select("td",i);h.selection.select(j[0],true);h.selection.collapse(true);c.setAttrib(i,"_mce_new","")});h.addVisual();h.execCommand("mceEndUndoLevel")}});tinymce.PluginManager.add("tablegrid",tinymce.plugins.TableGrid)})();