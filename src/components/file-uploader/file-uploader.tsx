import * as React from "react";

import './file-uploader.css';

interface IUploaderProps {
    onFileChosen(files: FileList): void;
}

export class Uploader extends React.Component<IUploaderProps> {
    inputRef: HTMLInputElement;

    componentDidMount() {
        this.inputRef.addEventListener("change", this.onInputChange);
    }

    componentWillUnmount() {
        this.inputRef.removeEventListener("change", this.onInputChange);
    }

    private onInputChange = (e: Event) => {
        const files = (e.target as HTMLInputElement).files;
        if (files === null || !files.length) {
            return;
        }
        
        this.props.onFileChosen(files);
    }

    render() {
        return (
            <div className="uploader">
                <input ref={ref => this.inputRef = ref!} type="file" id="music-file" accept="audio/*" />
            </div>
        );

    }
}

// window.onload = function () {

//     var file = document.getElementById("thefile");
//     var audio = document.getElementById("audio");

//     file.onchange = function () {
//         var files = this.files;
//         audio.src = URL.createObjectURL(files[0]);
//         audio.load();
//         audio.play();
//         var context = new AudioContext();
//         var src = context.createMediaElementSource(audio);
//         var analyser = context.createAnalyser();

//         var canvas = document.getElementById("canvas");
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         var ctx = canvas.getContext("2d");

//         src.connect(analyser);
//         analyser.connect(context.destination);

//         analyser.fftSize = 256;

//         var bufferLength = analyser.frequencyBinCount;
//         console.log(bufferLength);

//         var dataArray = new Uint8Array(bufferLength);

//         var WIDTH = canvas.width;
//         var HEIGHT = canvas.height;

//         var barWidth = (WIDTH / bufferLength) * 2.5;
//         var barHeight;
//         var x = 0;

//         function renderFrame() {
//             requestAnimationFrame(renderFrame);

//             x = 0;

//             analyser.getByteFrequencyData(dataArray);

//             ctx.fillStyle = "#000";
//             ctx.fillRect(0, 0, WIDTH, HEIGHT);

//             for (var i = 0; i < bufferLength; i++) {
//                 barHeight = dataArray[i];

//                 var r = barHeight + (25 * (i / bufferLength));
//                 var g = 250 * (i / bufferLength);
//                 var b = 50;

//                 ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
//                 ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

//                 x += barWidth + 1;
//             }
//         }

//         audio.play();
//         renderFrame();
//     };
// };