import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

export default function Products() {
  const videoEl = useRef(null);
  const videoE2 = useRef(null);
  const videoE3 = useRef(null);
  const videoE4 = useRef(null);
  const videoE5 = useRef(null);

  const handleMouseEnter = (ref) => {
    if (ref && ref.current) {
      ref.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
    }
  };

  const handleMouseLeave = (ref) => {
    if (ref && ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  return (
    <div>
      <section style={{ margin: "7px" }}>
        <div>
          <div className="section__color-wrapper ">
            <div className="container1">
              <div className="html">
                <h1
                  style={{ marginLeft: "20px", marginTop: "25px" }}
                  className="ui2-heading"
                >
                  Explore
                  <span>
                    <b> Bestsellers</b>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>

        <div className="container-fluid">
          <div className="row">
            <div className="scrollcards" style={{ cursor: "pointer" }}>
            <Link className=".Link" to="/neckbands">
              <div className="card">
                <video
                  className="video"
                  loop
                  muted
                  alt="All the devices"
                  poster="//cdn.shopify.com/s/files/1/0057/8938/4802/files/quinn_KXwTUL2r91fh5uAHqSyIH.jpg?v=14850539122786675893"
                  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quinn_OyJHanx4QSdUN3OVGTO7C.mp4"
                  ref={videoE3}
                  onMouseEnter={() => handleMouseEnter(videoE3)}
                  onMouseLeave={() => handleMouseLeave(videoE3)}
                />
                <div className="q-frame-25272611">
                  <p 
                    data-layer="productName"
                    className="q-text-25272612 quinn_product_title"
                  >
                    Neckbands
                  </p>
                </div>
              </div>
             </Link>
              <Link to="/headphones">
              <div className="card">
                <video
                  className="video"
                  loop
                  muted
                  alt="All the devices"
                  poster="//cdn.shopify.com/s/files/1/0057/8938/4802/files/quinn_v90hMzAEa585W2YTUR9UF.jpg?v=17250700239301190396"
                  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quinn_CpsRIdJWtpXyFN3enwbXd.mp4"
                  ref={videoE4}
                  onMouseEnter={() => handleMouseEnter(videoE4)}
                  onMouseLeave={() => handleMouseLeave(videoE4)}
                />
                <div className="q-frame-25272611">
                  <p
                    data-layer="productName"
                    className="q-text-25272612 quinn_product_title"
                  >
                    Headphones
                  </p>
                </div>
              </div>
              </Link>
<Link to="wirelessSpeakers">
              <div className="card">
                <video
                  className="video"
                  loop
                  muted
                  alt="All the devices"
                  poster="//cdn.shopify.com/s/files/1/0057/8938/4802/files/quinn_FY7dfyFMiXzNTqSLFu2lV.jpg?v=12472483265184956393"
                  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quinn_j1TwOEeceKYOJc7d7mAim.mp4"
                  ref={videoE5}
                  onMouseEnter={() => handleMouseEnter(videoE5)}
                  onMouseLeave={() => handleMouseLeave(videoE5)}
                />
                <div className="q-frame-25272611">
                  <p
                    data-layer="productName"
                    className="q-text-25272612 quinn_product_title"
                  >
                    Wireless Speakers
                  </p>
                </div>
              </div>
              </Link>
<Link to="/wirelessEarbuds">
              <div className="card">
                <video
                  className="video"
                  loop
                  muted
                  alt="All the devices"
                  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quinn_Bejc8URjU1NSXdhabLCmD.mp4"
                  poster="//cdn.shopify.com/s/files/1/0057/8938/4802/files/quinn_9O6xvZXZ3kYLbUbtsnj4S.jpg?v=10589554669730693856"
                  ref={videoE2}
                  onMouseEnter={() => handleMouseEnter(videoE2)}
                  onMouseLeave={() => handleMouseLeave(videoE2)}
                />
                <div className="q-frame-25272611">
                  <p
                    data-layer="productName"
                    className="q-text-25272612 quinn_product_title"
                  >
                    Wireless Earbuds
                  </p>
                </div>
              </div>
              </Link>
<Link to="/smartwatches">
              <div className="card">
                <video
                  className="video"
                  loop
                  muted
                  alt="All the devices"
                  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quinn_RUxbhR7CvjkNtlFUDxgw9.mp4"
                  poster="//cdn.shopify.com/s/files/1/0057/8938/4802/files/quinn_N8V0FmOXVCG4QfYvPSp1w.jpg?v=6926631039531719009"
                  ref={videoEl}
                  onMouseEnter={() => handleMouseEnter(videoEl)}
                  onMouseLeave={() => handleMouseLeave(videoEl)}
                />
                <div className="q-frame-25272611">
                  <p
                    data-layer="productName"
                    className="q-text-25272612 quinn_product_title"
                  >
                    Smartwatches
                  </p>
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
