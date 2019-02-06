import * as React from "react";

import { IDataCallback } from '../player';
import "./visuals.css";

interface IVisualsProps extends IDataCallback { }

export class Visual extends React.Component<IVisualsProps> {
    private canvasRef: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;

    private CIRCLE_RADIUS = 100;

    componentDidMount() {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;

        this.canvasRef.height = height;
        this.canvasRef.width = width;

        this.canvasCtx = this.canvasRef.getContext("2d")!;

        window.addEventListener("resize", this.onWindowResize);

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

        let rotation = 0;

        const rectLength = this.CIRCLE_RADIUS * 2 * Math.PI;
        let barWidth = (rectLength / bufferLength);

        this.props.analyser!.getByteFrequencyData(this.props.dataArray!);

        this.clearBackground();
        this.drawCircle();

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = this.props.dataArray![i];

            this.drawBar(rotation, barHeight, barWidth);

            rotation = (rotation / (bufferLength + barWidth)) % 360 + 1;
        }

        ctx.restore();
    }

    private clearBackground = () => {
        const canvas = this.canvasRef;
        const ctx = this.canvasCtx;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    private drawCircle = () => {
        const canvas = this.canvasRef;
        const ctx = this.canvasCtx;

        let WIDTH = canvas.width;
        let HEIGHT = canvas.height;

        let cx = WIDTH / 2;
        let cy = HEIGHT / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, this.CIRCLE_RADIUS, 0, Math.PI * 2);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#fff";
        ctx.closePath();
        ctx.stroke();
        ctx.save();

        ctx.translate(cx, cy);
    }

    private drawBar = (rotation: number, barHeight: number, barWidth: number) => {
        const ctx = this.canvasCtx;

        ctx.rotate(rotation);
        ctx.fillStyle = "#fff";
        ctx.fillRect(150, -barWidth / 2, barHeight, barWidth);
    }

    render() {
        return (
            <canvas id="mu-vis-visualization" ref={ref => this.canvasRef = ref!} width={"100%"} height={"100%"} />
        );
    }
}