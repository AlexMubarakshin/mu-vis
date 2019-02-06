import * as React from "react";

import { IDataCallback } from './player';
import { analyzeSound } from 'src/utils/sound';

interface IVisualsProps extends IDataCallback { }

export class Visual extends React.Component<IVisualsProps> {
    private canvasRef: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;

    componentDidMount() {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;

        this.canvasRef.height = height;
        this.canvasRef.width = width;

        this.canvasCtx = this.canvasRef.getContext("2d")!;

        window.addEventListener("resize", this.onWindowResize);

        setTimeout(this.onWindowResize, 150);

        requestAnimationFrame(this.animate);
    }

    onWindowResize = () => {
        this.canvasRef.width = document.documentElement.clientWidth;
        this.canvasRef.height = document.documentElement.clientHeight;
    }


    animate = () => {
        requestAnimationFrame(this.animate);

        const bufferLength = this.props.analyser!.frequencyBinCount;

        const ctx = this.canvasCtx;
        const canvas = this.canvasRef;

        let WIDTH = canvas.width;
        let HEIGHT = canvas.height;

        let barHeight;
        
        let cx = WIDTH / 2;
        let cy = HEIGHT / 2;
        let rectHeight = 15;
        let rotation = 0;
        
        const rectRadius = 100;
        const rectLength = rectRadius * 2 * Math.PI;
        let barWidth = (rectLength / bufferLength);
        
        this.props.analyser!.getByteFrequencyData(this.props.dataArray!);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(cx, cy, rectRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.save();
        
        ctx.translate(cx, cy);

        for (let i = 0; i < bufferLength; i++) {
            barHeight = this.props.dataArray![i];
            let r = barHeight + (25 * (i/bufferLength));
            let g = 250 * (i/bufferLength);
            let b = 50;

            ctx.rotate(rotation);
            // ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillStyle = "#fff";
            ctx.fillRect(-rectHeight / 2 + 150, -barWidth / 2, barHeight, barWidth);
            rotation = (rotation / (bufferLength + barWidth)) % 360 + 1;
        }

        ctx.restore();
    }

    render() {
        return (
            <canvas ref={ref => this.canvasRef = ref!} id="canvas" width={"100%"} height={"100%"} />
        );
    }
}