import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sell&limit=4`);
        const data = await res.json();
        setSaleListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <div>
      {/*top */}

      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Fortitude Estate is the best place to find your next perfect place to
          live.
          <br /> We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-blue-800 font-bold text-xs lg:text-sm hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/*swiper */}

      {offerListings && offerListings.length > 0 && (
        <div>
          <Swiper navigation>
            {offerListings.map((listing) => (
              <SwiperSlide>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[500px]"
                  key={listing._id}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto flex flex-col p-3 my-10 gap-8">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-500">Recent offers</h2>
              <Link to={"/search?offer=true"} className="text-sm font-semibold text-blue-800 hover:underline">Show more offers</Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-500">Recent places for sale</h2>
              <Link to={"/search?type=sell"} className="text-sm font-semibold text-blue-800 hover:underline">Show more offers</Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-500" >Recent places for rent</h2>
              <Link to={"/search?type=rent"} className="text-sm font-semibold text-blue-800 hover:underline">Show more offers</Link>
            </div>
            <div className="flex gap-4 flex-wrap ">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
