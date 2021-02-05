import React, {useState} from "react";

const ShareImageForm = ({uploadImage, captureFile}) => {

    const [imgData, setImgData] = useState();
    const [imgDescription, setImgDescription] = useState('');
    const fileInput = React.createRef();

    const handleSubmit = (event) => {
        event.preventDefault()
        uploadImage({imgData, imgDescription})
    }

    const handleDescriptionChange = event => {
        setImgDescription(event.target.value);
    }

    const handleFileChange = () => {
        const file = fileInput.current.files[0];
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)

        reader.onloadend = () => {
            setImgData(Buffer(reader.result))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif"
                   ref={fileInput}
                   onChange={handleFileChange}/>
            <div className="form-group mr-sm-2">
                <br></br>
                <input
                    type="text"
                    value={imgDescription}
                    onChange={handleDescriptionChange}
                    className="form-control"
                    placeholder="Image description..."
                    required/>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
        </form>
    )
}

export default ShareImageForm;