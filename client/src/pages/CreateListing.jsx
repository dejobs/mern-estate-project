import { useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false)
  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      setUploading(true);
      setImageUploadError(false)

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
          
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false);
        });
        
    } else {
      setImageUploadError(
        "You can not upload more than six images per listing"
      );
      setUploading(false)
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`file is ${progress}% uploaded`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    setFormData({...formData, imageUrls: formData.imageUrls.filter((_, indx) => indx !== index  )})
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-lg "
            type="text"
            placeholder="Name"
            id="name"
            maxLength={62}
            minLength={10}
            required
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Description"
            id="description"
            maxLength={62}
            minLength={10}
            required
          />
          <input
            className="border p-3 rounded-lg "
            type="text"
            placeholder="Address"
            id="address"
            maxLength={62}
            minLength={10}
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="sell" />
              <label for="sell">Sell</label>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="rent" />
              <label for="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="parking" />
              <label for="parking">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="furnished" />
              <label for="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="offer" />
              <label for="offer">Offer</label>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border rounded-lg border-grey-300"
              />
              <label for="bedrooms">Bedrooms</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border rounded-lg border-grey-300"
              />
              <label for="bathrooms">Baths</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border rounded-lg border-grey-300"
              />
              <label className="flex flex-col text-center" for="regularPrice">
                <span>Regular Price </span>
                <span className="text-sm">($ / month)</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border rounded-lg border-grey-300"
              />
              <label className="flex flex-col text-center" for="discountPrice">
                <span>discount Price </span>
                <span className="text-sm">($ / month)</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full "
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading}
              type="button"
              onClick={handleImageSubmit}
              className="border rounded border-green-700 p-3 text-green-700 uppercase hover:shadow-lg disabled:opacity-80"
            >
             {uploading ? "uploading..." : "upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div className=" flex justify-between items-center p-3 border" key={url}>
                <img
                  src={url}
                  alt="listing"
                  className="w-20 h20 object-contain rounded-lg"
                />
                <button type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="p-1 text-red-700 uppercase border rounded-md  text-sm hover:opacity-95"
                >
                  delete
                </button>
              </div>
            ))}
          <button
            type="submit"
            className="p-3 border rounded-lg text-white bg-gray-700 uppercase hover:opacity-95 disabled:opacity-80"
          >
            create listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
