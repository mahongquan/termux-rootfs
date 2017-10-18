"use strict";function extractOffset(a){var e=a.match(/(0x[a-fA-F0-9]+)/);return null===e?null:e[1]}function extractFct(a){var e=a.replace(/<[^>]*>/g,""),t=e.match(/\(fcn\) ([\S^]+)/);return null===t?null:t[1]}function extractVar(a){var e=a.replace(/<[^>]*>/g,""),t=e.match(/; var ([a-zA-Z0-9]+) ([\S^]+)/);return null===t?null:t[2]}function prepareClickableOffsets(a){return a=a.replace(/0x([a-zA-Z0-9]*)/g,"<a class='r2seek'>0x$1</a>"),a=a.replace(/sym\.([\.a-zA-Z0-9_]*)/g,"<a class='r2seek'>sym.$1</a>"),a=a.replace(/fcn\.([\.a-zA-Z0-9_]*)/g,"<a class='r2seek'>fcn.$1</a>"),a=a.replace(/str\.([\.a-zA-Z0-9_]*)/g,"<a class='r2seek'>str.$1</a>")}function getChunk(a,e){var t;r2.cmd("pD "+e+"@"+a+"|H",function(a){t=a}),t=prepareClickableOffsets(t);for(var s=t.split("\n"),r=0;r<s.length;r++){var n=extractFct(s[r]);null!==n&&(s[r]="<span class='fcn' id='"+n+"'>"+s[r]+"</span>");var l=extractVar(s[r]);null!==l&&(s[r]="<span class='var' id='"+l+"'>"+s[r]+"</span>");var c=extractOffset(s[r]);null!==c&&(s[r]="<span class='offset' id='"+parseInt(c,16)+"'>"+s[r]+"</span>")}return'<pre style="border-bottom:1px dashed white;" title="'+a+'" id="block'+a+'">'+s.join("\n")+"</pre>"}importScripts("/m/r2.js"),self.onmessage=function(a){if(a.data.offset<0)self.postMessage({offset:0,data:"before 0x00"});else{var e={offset:a.data.offset,size:a.data.size,data:getChunk(a.data.offset,a.data.size)};self.postMessage(e)}};