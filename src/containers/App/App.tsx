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

    onFilesChosen = (files: FileList) => {
        this.setState({
            files
        });
    }

    onFileLoaded = (meta: IDataCallback) => {
        this.setState({
            meta
        });
    }

    render() {
        return (
            <div className="App">
                {
                    !this.state.files && (<Uploader onFileChosen={this.onFilesChosen} />)
                }
                {
                    this.state.files && (
                        <Player
                            onFileLoaded={this.onFileLoaded}
                            files={this.state.files} />
                    )
                }

            </div>
        );
    }
}