import React from 'react';
import { connect } from 'react-redux';


import { uploadImage } from 'actions/protected-data';

import ArrowDown from 'icons/arrow-down';
import TieAvatar from 'icons/tie-avatar';
import ImageUploadIcon from 'icons/image-upload-icon';

export class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileName: null,
            error: false
        };
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // 
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleChange = (e) => {
        // console.log(e.target.files);
        if(e.target.files.length > 0) {
            let fileName = e.target.files[0].name;
            let file = e.target.files[0];
            this.setState({
                file,
                fileName,
                error: false
            });
        }
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Handles submit and dispatches action to upload file
    // to server
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.fileName === null) {
            this.setState({
                error: true
            });
        } else {

            // this.props.uploadFile(this.refs.form);

            // let formData = new FormData();
            // formData.append('file', this.refs.fileInput.files[0]);
            // console.log(formData.entries());
            // this.props.uploadFile(formData);
            // for (var p of formData) {
            //     console.log('yee', p);
            //     console.log('0', p[0]);
            //     console.log('1', p[1]);
            //     console.log(typeof(p));
            // }


            const reader = new FileReader();
            // const $this = this;
            reader.onload = e => this.props.uploadFile({file: e.target.result});
            
            const file = this.refs.fileInput.files[0];
            reader.readAsBinaryString(file);
        }
    };

    render() {
        let fileName, button;
        if(this.state.fileName) {
            fileName = <label className="file-name">File: {this.state.fileName}</label>;
            button = <button className="upload-btn" type="submit">Upload</button>;
        } 
        return(
            <div className="avatar">
                <h2>Avatar Settings</h2>
                <div className="container">
                    <form id="file-form"  method="POST" ref="form" onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <label>
                            <span>Choose Avatar:</span>
                            <button type="button">
                                <TieAvatar />
                                <ArrowDown />
                            </button>
                        </label>

                        <div className="upload-label">
                            <span>Upload an Image:</span>
                            {fileName}
                            <label className="custom-file-upload">
                                <ImageUploadIcon />
                                <input id="file-input" name="imgFIle" type="file" ref="fileInput" accept=".jpg,.jpeg,.png"  
                                       onChange={this.handleChange}/>
                            </label>
                        </div>
                        {button}
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    uploadFile: data => dispatch(uploadImage(data))
});


export default connect(null, mapDispatchToProps)(Avatar);