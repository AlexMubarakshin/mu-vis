(this["webpackJsonpmu-vis"]=this["webpackJsonpmu-vis"]||[]).push([[0],[,,,,,,,,,,function(e,t,n){e.exports=n(21)},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(9),i=n(6),o=n.n(i),c=n(7),u=n(1),s=n(2),l=n(4),d=n(3),f=n(5),h=(n(16),n(17),function(e){var t=e.onFileChosen,n=a.useRef(null),r=function(e){var n=e.target.files;null!==n&&n.length&&t(n)};return a.useEffect((function(){return n.current.addEventListener("change",r),function(){n.current.removeEventListener("change",r)}}),[]),a.createElement("div",{className:"uploader"},a.createElement("input",{ref:n,type:"file",id:"music-file",accept:"audio/*"}))});n(18);function m(e){return e.reduce((function(e,t){return e+t}))/e.length}var v={BAR:{maxHeight:250},CIRCLE:{radius:150,width:15}},p=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).canvasRef=void 0,n.canvasCtx=void 0,n.onWindowResize=function(){n.canvasRef.width=document.documentElement.clientWidth,n.canvasRef.height=document.documentElement.clientHeight},n.animate=function(){requestAnimationFrame(n.animate);var e=n.props.analyser.frequencyBinCount,t=m(n.props.dataArray),a=t<v.CIRCLE.width?v.CIRCLE.width:t,r=n.canvasCtx,i=0,o=2*v.CIRCLE.radius*Math.PI/e;n.props.analyser.getByteFrequencyData(n.props.dataArray),n.clearBackground(),n.drawCircle(a);for(var c=0;c<e;c++){var u=n.props.dataArray[c];n.drawBar(i,u,o),i=i/(e+o)%360+1}r.restore()},n.clearBackground=function(){var e=n.canvasRef,t=n.canvasCtx;t.clearRect(0,0,e.width,e.height),t.fillStyle="black",t.fillRect(0,0,e.width,e.height)},n.drawCircle=function(e){var t=n.canvasRef,a=n.canvasCtx,r=t.width/2,i=t.height/2;a.beginPath(),a.arc(r,i,v.CIRCLE.radius,0,2*Math.PI),a.lineWidth=e,a.strokeStyle="#fff",a.closePath(),a.stroke(),a.save(),a.translate(r,i)},n.drawBar=function(e,t,a){var r=n.canvasCtx,i=t>v.BAR.maxHeight?v.BAR.maxHeight:t;r.rotate(e),r.fillStyle="#fff",r.fillRect(v.CIRCLE.radius+100,-a/2,i,a)},n}return Object(f.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=document.documentElement.clientWidth,t=document.documentElement.clientHeight;this.canvasRef.height=t,this.canvasRef.width=e,this.canvasCtx=this.canvasRef.getContext("2d"),window.addEventListener("resize",this.onWindowResize),requestAnimationFrame(this.animate)}},{key:"render",value:function(){var e=this;return a.createElement("canvas",{id:"mu-vis-visualization",ref:function(t){return e.canvasRef=t},width:"100%",height:"100%"})}}]),t}(a.Component),y=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).audioRef=void 0,n.audioContext=void 0,n.analyser=void 0,n.dataArray=void 0,n.setSong=function(){var e=Object(c.a)(o.a.mark((function e(t){var a,r,i,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=URL.createObjectURL(t),n.audioRef.current.src=a,n.audioRef.current.load(),n.audioRef.current.play(),n.audioContext||(r=window.AudioContext||window.webkitAudioContext,n.audioContext=new r,i=n.audioContext.createMediaElementSource(n.audioRef.current),n.analyser=n.audioContext.createAnalyser(),i.connect(n.analyser),n.analyser.connect(n.audioContext.destination)),n.analyser.fftSize=256,c=n.analyser.frequencyBinCount,n.dataArray=new Uint8Array(c),n.props.onFileLoaded({analyser:n.analyser,dataArray:n.dataArray});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.onAudioError=function(e){console.warn(e)},n.audioRef=a.createRef(),n}return Object(f.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.audioRef.current.onerror=this.onAudioError}},{key:"render",value:function(){return a.createElement("div",null,this.analyser&&this.dataArray&&a.createElement(p,{analyser:this.analyser,dataArray:this.dataArray}),a.createElement("audio",{style:{bottom:0,left:0,position:"absolute",zIndex:9},ref:this.audioRef,id:"audio",controls:!0}))}}]),t}(a.Component),C=(n(19),function(){return a.createElement("div",{className:"unsupported-message"},a.createElement("h1",{className:"unsupported-message__title"},"Sorry, your browser is not supported."),a.createElement("h2",{className:"unsupported-message__title"},a.createElement("span",{role:"img","aria-label":""},"\ud83d\ude25")))}),R=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={},n.playerRef=void 0,n.onFilesChosen=function(){var e=Object(c.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({file:t[0]});case 2:n.playerRef.setSong(t[0]);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.onFileLoaded=function(e){n.setState({meta:e})},n}return Object(f.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=!!window.AudioContext;return a.createElement("div",{className:"App"},t?a.createElement(a.Fragment,null,a.createElement(h,{onFileChosen:this.onFilesChosen}),this.state.file&&a.createElement(y,{ref:function(t){return e.playerRef=t},onFileLoaded:this.onFileLoaded})):a.createElement(C,null))}}]),t}(a.Component);n(20);r.render(a.createElement(R,null),document.getElementById("root"))}],[[10,1,2]]]);
//# sourceMappingURL=main.42ae62ff.chunk.js.map