import { useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const { currentUser } = useSelector((state) => state.user);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      setUploading(true);
      setImageUploadError(false);

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
      setUploading(false);
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
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, indx) => indx !== index),
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "sell" || id === "rent") {
      setFormData({ ...formData, type: id });
    } else if (id === "furnished" || id === "parking" || id === "offer") {
      setFormData({ ...formData, [id]: !formData[id] });
    } else if (id === "discountPrice" || id === "regularPrice" || id === "bedrooms" || id === "bathrooms") {
      setFormData({ ...formData, [id]: Number(value) });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload atleast one image");
      if (formData.regularPrice < formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`)
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a listing
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            onChange={handleChange}
            value={formData.name}
            className="border p-3 rounded-lg "
            type="text"
            placeholder="Name"
            id="name"
            maxLength={62}
            minLength={10}
            required
          />
          <input
            onChange={handleChange}
            value={formData.description}
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Description"
            id="description"
            maxLength={200}
            minLength={10}
            required
          />
          <input
            onChange={handleChange}
            value={formData.address}
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
              <input
                onChange={handleChange}
                checked={formData.type === "sell"}
                className="w-5"
                type="checkbox"
                id="sell"
              />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "rent"}
                className="w-5"
                type="checkbox"
                id="rent"
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.parking}
                className="w-5"
                type="checkbox"
                id="parking"
              />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.furnished}
                className="w-5"
                type="checkbox"
                id="furnished"
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.offer}
                className="w-5"
                type="checkbox"
                id="offer"
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className=" flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.bedrooms}
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border rounded-lg border-grey-300"
              />
              <label htmlFor="bedrooms">Bedrooms</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.bathrooms}
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border rounded-lg border-grey-300"
              />
              <label htmlFor="bathrooms">Baths</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.regularPrice}
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border rounded-lg border-grey-300"
              />
              <label
                className="flex flex-col text-center"
                htmlFor="regularPrice"
              >
                <span>Regular Price </span>
                <span className="text-sm">($ / month)</span>
              </label>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  onChange={handleChange}
                  value={formData.discountPrice}
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="5000000"
                  required
                  className="p-3 border rounded-lg border-grey-300"
                />
                <label
                  className="flex flex-col text-center"
                  htmlFor="discountPrice"
                >
                  <span>discount Price </span>
                  <span className="text-sm">($ / month)</span>
                </label>
              </div>
            )}
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
              <div
                className=" flex justify-between items-center p-3 border"
                key={url}
              >
                <img
                  src={url}
                  alt="listing"
                  className="w-20 h20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="p-1 text-red-700 uppercase border rounded-md  text-sm hover:opacity-95"
                >
                  delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            type="submit"
            className="p-3 border rounded-lg text-white bg-gray-700 uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "creating..." : "create listing"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
