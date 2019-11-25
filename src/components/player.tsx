import * as React from 'react';
import { Visual } from './visuals/visuals';

interface ITrack {
    src: string;
    dataArray: Uint8Array;
}

export interface IDataCallback {
    dataArray?: Uint8Array;
    analyser?: AnalyserNode;
}

interface IPlayerProps {
    onFileLoaded(data: IDataCallback): void;
}

interface IPlayerState { }

export class Player extends React.Component<IPlayerProps, IPlayerState> {


    private readonly audioRef: React.RefObject<HTMLAudioElement>;
    private audioContext: AudioContext;
    private analyser: AnalyserNode;

    private dataArray: Uint8Array;

    constructor(props: IPlayerProps) {
        super(props);

        this.audioRef = React.createRef<HTMLAudioElement>();
    }

    componentDidMount() {
        (this.audioRef.current as HTMLAudioElement).onerror = this.onAudioError;
    }

    public setSong = async (fileURL: object) => {
        const currentTrackSrc = URL.createObjectURL(fileURL);

        (this.audioRef.current as HTMLAudioElement).src = currentTrackSrc;
        (this.audioRef.current as HTMLAudioElement).load();
        (this.audioRef.current as HTMLAudioElement).play();

        if (!this.audioContext) {
            const AudioCtx = (window as any).AudioContext
                || (window as any).webkitAudioContext;

            this.audioContext = new AudioCtx();
            const src = this.audioContext.createMediaElementSource(this.audioRef.current as HTMLAudioElement);
            this.analyser = this.audioContext.createAnalyser();

            src.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
        }

        this.analyser.fftSize = 256;

        const bufferLength = this.analyser.frequencyBinCount;

        this.dataArray = new Uint8Array(bufferLength);

        this.props.onFileLoaded({
            analyser: this.analyser,
            dataArray: this.dataArray
        });
    }

    private onAudioError = (e: string | Event) => {
        console.warn(e);
    }

    render() {
        return (
            <div>
                {
                    this.analyser && this.dataArray && (
                        <Visual
                            analyser={this.analyser}
                            dataArray={this.dataArray}
                        />
                    )
                }

                <audio style={{
                    bottom: 0,
                    left: 0,
                    position: 'absolute',
                    zIndex: 9,
                }} ref={this.audioRef} id="audio" controls></audio>

            </div>
        );
    }
}