import * as React from 'react';
import './App.css';

import { Uploader } from 'src/components/file-uploader';
import { Player, IDataCallback } from 'src/components/player';

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
        return (
            <div className="App">
                <Uploader onFileChosen={this.onFilesChosen} />
                {
                    this.state.files && (
                        <Player
                            ref={ref => this.playerRef = ref!}
                            onFileLoaded={this.onFileLoaded} />
                    )
                }
            </div>
        );
    }
}