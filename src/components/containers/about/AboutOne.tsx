import React from "react";
import Image from "next/image";
import One from "public/img/about/about-thumb-2.png";
import Two from "public/img/shape/about-thumb-shape.png";

const AboutOne = () => {
  return (
    <div className="about__area p-relative pt-120 pb-60">
      <div className="container">
        <div
          className="row align-items-center "
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="col-xl-6 col-lg-6">
            <div className="about__thumb-wrapper-3 mb-60">
              <div className="about__thumb-3">
                <Image src={One} alt="image not found" />
              </div>
              <div className="about__thumb-shape">
                <Image src={Two} alt="image not found" />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="about__content-wapper mb-60">
              <div className="section__title-wrapper mb-40">
                <div className="section__subtitle-3">
                  <span>ABOUT OUR company</span>
                </div>
                <div className="section__title-3">
                  Dell saw impressive increase in organic traffic.
                </div>
              </div>
              <p>
                SEO.com worked with Dell&apos;s internal team and implemented
                aggressive strategies across multiple countries. This
                reorganized Dell&apos;s search presence and increase its organic
                search rankings traffic and revenue worldwide.
              </p>
              <div className="about__progress">
                <div className="about__progress-item">
                  <div className="about__progress-content">
                    <span>75.25%</span>
                    <p>
                      Increased in organic traffic <br /> in first year!
                    </p>
                  </div>
                </div>
                <div className="about__progress-item">
                  <div className="about__progress-content">
                    <span className="s-2">72%</span>
                    <p>
                      Increased in organic traffic <br /> in first year!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOne;
