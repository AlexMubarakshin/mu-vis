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