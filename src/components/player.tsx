import * as React from "react";
import { Visual } from './visuals';

interface ITrack {
    src: string;
    dataArray: Uint8Array;
}

export interface IDataCallback {
    dataArray?: Uint8Array,
    analyser?: AnalyserNode
};

interface IPlayerProps {
    files: FileList;
    onFileLoaded(data: IDataCallback): void;
}

interface IPlayerState {
    currentTrack?: ITrack;
    meta: IDataCallback;
}

export class Player extends React.Component<IPlayerProps, IPlayerState> {
    private audioRef: HTMLAudioElement;

    state: IPlayerState = {
        meta: {}
    }

    async componentDidMount() {
        const currentTrackSrc = URL.createObjectURL(this.props.files[0]);
        this.audioRef.src = currentTrackSrc;
        this.audioRef.load();
        this.audioRef.play();

        const context = new AudioContext();
        const src = context.createMediaElementSource(this.audioRef);
        const analyser = context.createAnalyser();

        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 256;

        const bufferLength = analyser.frequencyBinCount;

        const dataArray = new Uint8Array(bufferLength);

        await this.setState({
            meta: {
                analyser,
                dataArray
            }
        });

        this.props.onFileLoaded({
            analyser,
            dataArray
        });
    }

    render() {
        return (
            <div>
                {this.state.meta.analyser && this.state.meta.analyser && (
                    <Visual
                        analyser={this.state.meta.analyser}
                        dataArray={this.state.meta.dataArray}
                    />
                )}

                <audio style={{
                    bottom: 0,
                    left: 0,
                    position: "absolute",
                    zIndex: 9
                }} ref={ref => this.audioRef = ref!} id="audio" controls></audio>

            </div>
        );
    }
}