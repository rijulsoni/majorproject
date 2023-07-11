import React from "react";
import './AboutUs.css';
import resumePDF from "../Resume/Resume_rijul.pdf";
import resumePDF1 from"../Resume/indivarResume.pdf";

export default function AboutUs() {
  const handleDownloadResume = () => {
    // Create an anchor element
    const link = document.createElement("a");
    link.href = resumePDF;
    link.target = "_blank";
    link.download = "Resume_rijul.pdf";
  
    // Dispatch a click event on the anchor element
    link.dispatchEvent(new MouseEvent("click"));
  };
  const handleDownloadResume1 = () => {
    // Create an anchor element
    const link = document.createElement("a");
    link.href = resumePDF1;
    link.target = "_blank";
    link.download = "indivarResume.pdf";
  
    // Dispatch a click event on the anchor element
    link.dispatchEvent(new MouseEvent("click"));
  };

  return (
    <>
      
      <div className="responsive-container-block bigContainer">
  <div className="responsive-container-block Container">
    <img className="mainImg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/eaboutus1.svg"/>
    <div className="allText aboveText">
      <p className="text-blk headingText">
        Our Mission
      </p>
      <p className="text-blk subHeadingText">
      
      </p>
      <p className="text-blk description">
      Our vision is to become your go-to destination for all your electronics needs.
       We aim to create a platform that offers convenience, reliability, and innovation, making it effortless for you to explore and purchase the latest electronic gadgets and accessories.
      </p>
      <button className="explore">
        Explore
      </button>
    </div>
  </div>
  <div className="responsive-container-block Container bottomContainer">
    <img className="mainImg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/xpraup2.svg"/>
    <div className="allText bottomText">
      <p className="text-blk headingText">
        Our Vision
      </p>
      
      <p className="text-blk description">
      We believe in fostering a vibrant community of electronics enthusiasts. Through our blog, social media channels, and forums, we provide engaging content, product reviews, and expert insights to keep you informed and inspired. We encourage you to join our community, share your experiences, and connect with like-minded individuals who share your passion for technology.
      </p>
      <button className="explore">
        Happy Shoping
      </button>
    </div>
  </div>
</div>
            <div style={{margin:"40px",}} className="data">
              <button className="hire" onClick={handleDownloadResume}>
                Hire Rijul
              </button>
     
              <button className="hire" onClick={handleDownloadResume1}>
                Hire Indivar
              </button>
            </div>
          
    </>
  );
}