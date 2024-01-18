import React from "react";

function CreateListing() {
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
              className="p-3 border border-gray-300 rounded w-full "
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button className="border rounded border-green-700 p-3 text-green-700 uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
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
