import React, {useState } from 'react';
import axios from 'axios';
import './FileUpload.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Progress from './Progress';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const [image, setImage] = useState(false)


    
    const fileSelectedHandler = (event) =>{
        
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    }

    const fileUploadHander = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        axios.post('/predict', formData,config)
        .then(
            res => {

                console.log(res.data);


            
                setImage(`http://localhost:5000/image/${res.data.results}`)
            });
    }

    const config = {
        onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
           
  
            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
          }
    }

    return(
        <div className="holding">
            <div className="file-upload">
                <div className="custom-file">
                    <input 
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={fileSelectedHandler}
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                    {filename}
                    </label>

                    
                    <Progress percentage={uploadPercentage} />

                </div>
            </div>

            <div className="">
                <button className="upload"  onClick={fileUploadHander}>
                    Upload
                </button>
            </div>

            {image ? <img src={image} alt='Image not Rendered'/>: <p>no image</p>}
            {/* {image ? <a href={image} download="image"></a>: <p>no image</p>} */}

        </div>

    );
};

export default FileUpload;