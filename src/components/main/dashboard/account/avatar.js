import React from 'react';

import ArrowDown from 'icons/arrow-down';
import TieAvatar from 'icons/tie-avatar';
import ImageUploadIcon from 'icons/image-upload-icon';

export default class Avatar extends React.Component {
    render() {
        return(
            <div className="avatar">
                <h2>Avatar Settings</h2>
                <div className="container">
                    <form action="">
                        <label>
                            <span>Choose Avatar:</span>
                            <button type="button">
                                <TieAvatar />
                                <ArrowDown />
                            </button>
                        </label>

                        <label>
                            <span>Upload an Image:</span>
                            <label className="custom-file-upload">
                                <ImageUploadIcon />
                                <input type="file" accept=".jpg,.jpeg,.png"/>
                            </label>
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}