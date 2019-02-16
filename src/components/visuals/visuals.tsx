import * as React from "react";

import { IDataCallback } from '../player';
import "./visuals.css";
import { avg } from 'src/utils/sound';

const RENDERED_OBJECTS = {
    BAR: {
        maxHeight: 250
    },
    CIRCLE: {
        radius: 150,
        width: 15
    }
}

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

        requestAnimationFrame(this.animate);
    }

    onWindowResize = () => {
        this.canvasRef.width = document.documentElement.clientWidth;
        this.canvasRef.height = document.documentElement.clientHeight;
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        const bufferLength = this.props.analyser!.frequencyBinCount;

        const avgBuffer = avg((this.props as any).dataArray);
        const circleLineWidth = avgBuffer < RENDERED_OBJECTS.CIRCLE.width ? RENDERED_OBJECTS.CIRCLE.width : avgBuffer;

        const ctx = this.canvasCtx;

        let rotation = 0;

        const rectLength = RENDERED_OBJECTS.CIRCLE.radius * 2 * Math.PI;
        let barWidth = (rectLength / bufferLength);

        this.props.analyser!.getByteFrequencyData(this.props.dataArray!);

        this.clearBackground();
        this.drawCircle(circleLineWidth);

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

    private drawCircle = (lineWidth: number) => {
        const canvas = this.canvasRef;
        const ctx = this.canvasCtx;

        let WIDTH = canvas.width;
        let HEIGHT = canvas.height;

        let cx = WIDTH / 2;
        let cy = HEIGHT / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, RENDERED_OBJECTS.CIRCLE.radius, 0, Math.PI * 2);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#fff";
        ctx.closePath();
        ctx.stroke();
        ctx.save();

        ctx.translate(cx, cy);
    }

    private drawBar = (rotation: number, barHeight: number, barWidth: number) => {
        const ctx = this.canvasCtx;
        const fixedBarHeight = barHeight > RENDERED_OBJECTS.BAR.maxHeight ? RENDERED_OBJECTS.BAR.maxHeight : barHeight;

        ctx.rotate(rotation);
        ctx.fillStyle = "#fff";
        ctx.fillRect(RENDERED_OBJECTS.CIRCLE.radius + 100, -barWidth / 2, fixedBarHeight, barWidth);
    }

    render() {
        return (
            <canvas id="mu-vis-visualization" ref={ref => this.canvasRef = ref!} width={"100%"} height={"100%"} />
        );
    }
}