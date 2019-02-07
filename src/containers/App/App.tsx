import * as React from 'react';
import './App.css';

import { Uploader } from 'src/components/file-uploader/file-uploader';
import { Player, IDataCallback } from 'src/components/player';
import { Unsupported } from 'src/components/unsuported/unsupported';

interface IAppState {
    files?: FileList;
    meta?: IDataCallback;
}

export class App extends React.Component<{}, IAppState> {
    state: IAppState = {}

    private playerRef: Player;

    onFilesChosen = (files: FileList) => {
        this.setState({
            files
        });

        this.playerRef.setSong(files[0]);
    }

    onFileLoaded = (meta: IDataCallback) => {
        this.setState({
            meta
        });
    }

    render() {
        const isBrowserSupported = !!(window as any).AudioContext;
        return (
            <div className="App">
                {
                     isBrowserSupported ?
                        (
                            <>
                                <Uploader onFileChosen={this.onFilesChosen} />
                                {
                                    this.state.files && (
                                        <Player
                                            ref={ref => this.playerRef = ref!}
                                            onFileLoaded={this.onFileLoaded} />
                                    )
                                }
                            </>
                        )
                        :
                        (
                            <Unsupported />
                        )
                }
            </div>
        );
    }
}