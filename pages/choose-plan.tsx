import React, { useState } from "react";
import styles from "../styles/pricing.module.css";
import Image from "next/image";
import {
  FireOutlined,
  SnippetsOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Accordian from "../components/UI/Accordian";
import { useRouter } from "next/router";

import { Stripe, loadStripe } from "@stripe/stripe-js";

interface ChoosePlanProps {}

const ChoosePlan: React.FC<ChoosePlanProps> = () => {
  const [activeSection, setActiveSection] = useState("Premium Plus Yearly");
  const router = useRouter();

  const redirectToCheckout = async (price: string) => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
      );
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error("[error]", error);
    }
  };

  return (
    <div className={styles.planWrap}>
      <div className={styles.planHeaderWrap}>
        <div className={styles.planHeader}>
          <div className={styles.title}>
            Get unlimited access to many amazing books to read
          </div>
          <div className={styles.subTitle}>
            Turn ordinary moments into amazing learning opportunities
          </div>
          <figure className={styles.imgMask}>
            <Image
              src={"/images/pricing-top.png"}
              height={280}
              width={340}
              alt={""}
            />
          </figure>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className={styles.featuresWrap}>
            <div className={styles.planFeatures}>
              <figure className={styles.icon}>
                <SnippetsOutlined />
              </figure>
              <div className={styles.featuresText}>
                <b>Key ideas in a few min</b> with many books to read
              </div>
            </div>
            <div className={styles.planFeatures}>
              <figure className={styles.icon}>
                <TeamOutlined />
              </figure>
              <div className={styles.featuresText}>
                <b>3 million people</b> start growing with Summarist every year
              </div>
            </div>
            <div className={styles.planFeatures}>
              <figure className={styles.icon}>
                <FireOutlined />
              </figure>
              <div className={styles.featuresText}>
                <b>Precise recommendations</b> collections curated by experts
              </div>
            </div>
          </div>
          <div className={styles.sectionTitle}>
            Choose the plan that fits for you
          </div>
          <div
            className={
              activeSection === "Premium Plus Yearly"
                ? styles.planCard__active
                : styles.planCard
            }
            onClick={() => setActiveSection("Premium Plus Yearly")}
          >
            {activeSection === "Premium Plus Yearly" ? (
              <div className={styles.circle}>
                <div className={styles.planCardDot}></div>
              </div>
            ) : (
              <div className={styles.circle}></div>
            )}
            <div className={styles.planContent}>
              <div className={styles.planTitle}>Premium Plus Yearly</div>
              <div className={styles.planPrice}>$99.99/year</div>
              <div className={styles.planText}>7-day free trial included</div>
            </div>
          </div>
          <div className={styles.planCardSeparator}>or</div>
          <div
            className={
              activeSection === "Premium Plus Monthly"
                ? styles.planCard__active
                : styles.planCard
            }
            onClick={() => setActiveSection("Premium Plus Monthly")}
          >
            {activeSection === "Premium Plus Monthly" ? (
              <div className={styles.circle}>
                <div className={styles.planCardDot}></div>
              </div>
            ) : (
              <div className={styles.circle}></div>
            )}
            <div className={styles.planContent}>
              <div className={styles.planTitle}>Premium Plus Monthly</div>
              <div className={styles.planPrice}>$9.99/month</div>
              <div className={styles.planText}>No trial included</div>
            </div>
          </div>
          {activeSection === "Premium Plus Yearly" ? (
            <div className={styles.planCard__cta}>
              <span className={styles.btnWrapper}>
                <button
                  onClick={() => redirectToCheckout("premium_plus")}
                  style={{
                    width: "300px",
                  }}
                >
                  Start your 7- day free trial
                </button>
              </span>
              <div>
                Cancel your trial at any time before it ends, and you won't be
                charged.{" "}
              </div>
            </div>
          ) : (
            <div className={styles.planCard__cta}>
              <span className={styles.btnWrapper}>
                <button
                  onClick={() => redirectToCheckout("premium")}
                  style={{
                    width: "300px",
                  }}
                >
                  Start your first month
                </button>
              </span>
              <div>30-day money back guarantee, no questions asked.</div>
            </div>
          )}
          <div className={styles.faqWrapper}>
            <Accordian />
          </div>
        </div>
      </div>
      <section id="footer">
        <div className="container">
          <div className="row">
            <div className={styles.ftTopWrapper}>
              <div className={styles.ftBlock}>
                <div className={styles.ftTitle}>Actions</div>
                <div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Summarist Magazine</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Cancel Subscription</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Help</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Contact Us</a>
                  </div>
                </div>
              </div>
              <div className={styles.ftBlock}>
                <div className={styles.ftTitle}>Useful Links</div>
                <div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Pricing</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Summarist Business</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Gift Cards</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Authors & Publishers</a>
                  </div>
                </div>
              </div>
              <div className={styles.ftBlock}>
                <div className={styles.ftTitle}>Company</div>
                <div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>About</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Careers</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Sponsorships & Partners</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Code of Conduct</a>
                  </div>
                </div>
              </div>
              <div className={styles.ftBlock}>
                <div className={styles.ftTitle}>Other</div>
                <div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Sitemap</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Legal Notice</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Terms of Service</a>
                  </div>
                  <div className={styles.ftLinkWrapper}>
                    <a className={styles.ftLink}>Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ftCopyrightWrapper}>
              <span>Copyright &copy; 2023 Summarist.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChoosePlan;