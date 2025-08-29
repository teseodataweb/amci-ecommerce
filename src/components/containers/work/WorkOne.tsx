import React from "react";
import Image from "next/image";
import Link from "next/link";

import one from "public/img/work/1.png";
import two from "public/img/work/2.png";
import three from "public/img/work/3.png";

const WorkOne = () => {
  return (
    <section className="work__area grey-bg pt-120 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__title-wrapper text-center mb-70">
              <div className="section__subtitle-3">
                <span>HOW DOES IT WORKS</span>
              </div>
              <div className="section__title-3 mb-20">Easy setup process</div>
              <p>
                Softim keeps your team&apos;s work on-brand, on message, and on
                time Innovative.
              </p>
            </div>
          </div>
        </div>
        <div className="row " data-aos="fade-up" data-aos-delay="300">
          <div className="work__item-grid">
            <div className="work__item mb-60">
              <div className="work__flow-shape"></div>
              <div className="work__thumb">
                <Image src={one} alt="image not found" />
              </div>
              <div className="work__content">
                <h3>
                  <Link href="/">Install the software</Link>
                </h3>
                <p>
                  We rank among the best in Argentina, and Ukraine Our apps get
                </p>
              </div>
            </div>
            <div className="work__item mb-60">
              <div className="work__flow-shape"></div>
              <div className="work__thumb">
                <Image src={two} alt="image not found" />
              </div>
              <div className="work__content">
                <h3>
                  <Link href="/">Install the software</Link>
                </h3>
                <p>
                  We rank among the best in Argentina, and Ukraine Our apps get
                </p>
              </div>
            </div>
            <div className="work__item mb-60">
              <div className="work__thumb">
                <Image src={three} alt="image not found" />
              </div>
              <div className="work__content">
                <h3>
                  <Link href="/">Install the software</Link>
                </h3>
                <p>
                  We rank among the best in Argentina, and Ukraine Our apps get
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkOne;
