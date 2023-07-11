import React from "react";

export default function Slider() {
  return (
    <>
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>
        <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="3000">
  <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/6479f251b26a9553692093_1440x.gif?v=1685716141" className="d-block w-100" alt="..."/>
</div>
<div className="carousel-item" data-bs-interval="3000">
  <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/genesis_desktop_1799_1440x.jpg?v=1685557646" className="d-block w-100" alt="..."/>
</div>
<div className="carousel-item" data-bs-interval="3000">
  <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/DDnew-dimension_desktop_65851fdc-8162-46b6-b808-472ea00401b9_1440x.jpg?v=1682600881" className="d-block w-100 "  alt="..."/>
</div>
<div className="carousel-item" data-bs-interval="3000">
  <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/purple_desktop_1440x.jpg?v=1685006383" className="d-block w-100 "  alt="..."/>
</div>
<div className="carousel-item" data-bs-interval="3000">
  <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/ultima-connect-max-desktop2199_1440x.jpg?v=1685715903" className="d-block w-100 "  alt="..."/>
</div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span aria-hidden="true">
            {" "}
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/arrow_homepage.svg?v=1685355827"
              alt="arrow"
              style={{ rotate: "180deg", height: "40px", width: "40px" }}
            />
          </span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span aria-hidden="true">
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/arrow_homepage.svg?v=1685355827"
              alt="arrow"
              style={{ height: "40px", width: "40px" }}
            />
          </span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
