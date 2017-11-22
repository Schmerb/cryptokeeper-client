import React from 'react';
import { connect } from 'react-redux';

import { uploadImage, removeAvatar } from 'actions/protected-data';


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

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
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
            let formData = new FormData();
            formData.append('file', this.refs.fileInput.files[0]);
            this.props.uploadFile(formData);
        }
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Handles removal of profile image
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleDeleteClick = (e, avatarId) => {
        e.preventDefault();
        this.props.removeUserAvatar(avatarId);
        // this.props.confirmDelete('Are you sure you want to remove your avatar image?', removeUserAvatar(avatarId), 'Yes, remove it');
    }

    render() {
        let fileName, button, deleteBtn;
        if(this.state.fileName) {
            fileName = <label className="file-name">File: {this.state.fileName}</label>;
            button = <button className="upload-btn" type="submit">Upload</button>;
        } 
        let avatarImg = null;
        if(this.props.avatar) {
            avatarImg = <img className="user-avatar-img" src={this.props.avatar.url} alt="User avatar profile"/>;
            deleteBtn = <button type="button" onClick={e => this.handleDeleteClick(e, this.props.avatar.avatarId)} className="remove-avatar-btn">Remove</button>
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
                                {avatarImg}
                                <ImageUploadIcon />
                                <input id="file-input" name="imgFIle" type="file" ref="fileInput" accept=".jpg,.jpeg,.png"  
                                       onChange={this.handleChange}/>
                            </label>
                        </div>
                        {button}
                        {deleteBtn}
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    avatar: state.protectedData.avatar
});

const mapDispatchToProps = dispatch => ({
    uploadFile: data => dispatch(uploadImage(data)),
    removeUserAvatar: avatarId => dispatch(removeAvatar(avatarId))
});


export default connect(mapStateToProps, mapDispatchToProps)(Avatar);