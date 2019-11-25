import * as React from 'react';

import './file-uploader.css';

interface IUploaderProps {
    onFileChosen(files: FileList): void;
}

export const Uploader: React.FC<IUploaderProps> = ({ onFileChosen }: IUploaderProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onInputChange = (e: Event) => {
        const files = (e.target as HTMLInputElement).files;
        if (files === null || !files.length) {
            return;
        }

        onFileChosen(files);
    };

    React.useEffect(() => {
        (inputRef.current as HTMLInputElement).addEventListener('change', onInputChange);
        return () => {
            (inputRef.current as HTMLInputElement).removeEventListener('change', onInputChange);
        };
    }, []);


    return (
        <div className="uploader">
            <input ref={inputRef} type="file" id="music-file" accept="audio/*" />
        </div>
    );
};
