const upload_preset = process.env.REACT_APP_UPLOAD_PRESET || "diplomski-sysem";
const cloud_name = process.env.REACT_APP_CLOUD_NAME || "adamovickaca1";

const uploadImageToCloudinary = async file => {
    const uploadData = new FormData()

    uploadData.append('file', file)
    uploadData.append('upload_preset', upload_preset)
    uploadData.append('cloud_name', cloud_name)

    const res = await fetch(
        `http://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
            method: 'post',
            body: uploadData
        }
      );
    
      const data = await res.json();
      return data;

}

export default uploadImageToCloudinary