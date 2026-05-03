import React, { useEffect, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeevadbw";
const verifiedBadgeIcon = "/icons/verified-badge-slate.png";
const billboardNote = "After 2 paid months";

const initialFormValues = {
  fullName: "",
  email: "",
  instagram: "",
  phone: "",
  city: "",
  role: "Model",
  details: "",
};

const comparisonFeatures = [
  { id: "collaboration", label: "Collaboration" },
  { id: "promotion", label: "Promotion" },
  { id: "editorial", label: "Editorial" },
  { id: "placement", label: "Placement" },
  { id: "cover", label: "Cover" },
  { id: "billboard", label: "NYC Billboard" },
  { id: "extras", label: "Discounts" },
];

const plans = [
  {
    id: "growth",
    title: "Growth",
    emoji: "👋",
    price: 49,
    desc: "Build your presence",
    paypalPlanId: "P-6YE201636M3399105NHUJI4Y",
    paypalUrl:
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-0P866796P0337163HNH3EXFA",
    features: {
      collaboration: "Basic",
      promotion: "1-2 posts",
      editorial: "Included",
      placement: "Priority",
      cover: null,
      billboard: null,
      extras: null,
    },
  },
  {
    id: "elite",
    title: "Elite",
    emoji: "💪",
    price: 99,
    desc: "Grow your brand",
    popular: true,
    paypalPlanId: "P-2GS95942VA380420FNHNTIFY",
    paypalUrl:
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3H869064TF125744RNH3ERJA",
    features: {
      collaboration: "Priority",
      promotion: "Strong push",
      editorial: "Included",
      placement: "Priority",
      cover: "Opportunity",
      billboard: null,
      extras: "25% off",
    },
  },
  {
    id: "pro",
    title: "Pro",
    emoji: "💎",
    price: 149,
    desc: "Scale & go premium",
    paypalPlanId: "P-9HJ82138NM274991HNHUJMKQ",
    paypalUrl:
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-1YP444449L590170PNH3EPPY",
    features: {
      collaboration: "Paid access",
      promotion: "Max push",
      editorial: "Included",
      placement: "Top priority",
      cover: "Included",
      billboard: "Starts month 3",
      extras: "35% off",
    },
  },
];

function getFormspreeErrorMessage(result) {
  if (!result || !Array.isArray(result.errors) || result.errors.length === 0) {
    return "We could not save your details right now. Please try again.";
  }

  return result.errors.map((item) => item.message).join(" ");
}

export default function PremiumPricing() {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState("form");
  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitState, setSubmitState] = useState({
    submitting: false,
    error: "",
    success: "",
  });

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) || null;

  const closeCheckout = () => {
    setSelectedPlanId(null);
    setCheckoutStep("form");
    setFormValues(initialFormValues);
    setSubmitState({
      submitting: false,
      error: "",
      success: "",
    });
  };

  useEffect(() => {
    if (!selectedPlan) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeCheckout();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedPlan]);

  const openCheckout = (planId) => {
    setSelectedPlanId(planId);
    setCheckoutStep("form");
    setFormValues(initialFormValues);
    setSubmitState({
      submitting: false,
      error: "",
      success: "",
    });
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedPlan) {
      return;
    }

    if (!selectedPlan.paypalUrl) {
      setSubmitState({
        submitting: false,
        error: `PayPal link missing for the ${selectedPlan.title} plan.`,
        success: "",
      });
      return;
    }

    setSubmitState({
      submitting: true,
      error: "",
      success: "",
    });

    const payload = new FormData();
    payload.append("_subject", `New ${selectedPlan.title} plan lead - $${selectedPlan.price}/month`);
    payload.append("plan_name", selectedPlan.title);
    payload.append("plan_price", `$${selectedPlan.price}/month`);
    payload.append("paypal_plan_id", selectedPlan.paypalPlanId);
    payload.append("paypal_checkout_url", selectedPlan.paypalUrl);
    payload.append("full_name", formValues.fullName.trim());
    payload.append("email", formValues.email.trim());
    payload.append("instagram", formValues.instagram.trim());
    payload.append("phone_number", formValues.phone.trim());
    payload.append("city", formValues.city.trim());
    payload.append("role", formValues.role);
    payload.append("other_details", formValues.details.trim() || "None provided");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setSubmitState({
          submitting: false,
          error: getFormspreeErrorMessage(result),
          success: "",
        });
        return;
      }

      setSubmitState({
        submitting: false,
        error: "",
        success: `Details saved for the ${selectedPlan.title} plan. Continue when you're ready.`,
      });
      setCheckoutStep("payment");
    } catch {
      setSubmitState({
        submitting: false,
        error: "Network error. Please try again.",
        success: "",
      });
    }
  };

  return (
    <>
      <style>{`
        .pricing-section-shell,
        .pricing-section-shell *,
        .checkout-overlay,
        .checkout-overlay * {
          box-sizing: border-box;
          font-family: 'Manrope', sans-serif;
        }

        .checkout-overlay {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(91, 133, 137, 0.24);
          backdrop-filter: blur(12px);
        }

        .checkout-modal {
          position: relative;
          width: min(100%, 760px);
          max-height: min(92vh, 920px);
          overflow-y: auto;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.88);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(244, 250, 250, 0.82) 100%);
          padding: 28px;
          backdrop-filter: blur(26px);
          box-shadow: 0 28px 60px rgba(18, 49, 57, 0.18);
          color: #123139;
        }

        .checkout-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(28, 123, 128, 0.16);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.84);
          color: #31525a;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .checkout-kicker {
          margin: 0 0 8px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #5e7a82;
        }

        .checkout-title {
          margin: 0;
          font-size: clamp(1.7rem, 2vw, 2.2rem);
          font-weight: 600;
          color: #123139;
        }

        .checkout-subtitle {
          margin: 12px 0 0;
          max-width: 560px;
          color: #55727a;
          font-size: 0.96rem;
          line-height: 1.6;
        }

        .checkout-plan-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .checkout-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(28, 123, 128, 0.12);
          color: #0f5a60;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .checkout-chip-muted {
          background: rgba(255, 255, 255, 0.64);
          color: #48656e;
        }

        .checkout-form {
          margin-top: 24px;
        }

        .checkout-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .checkout-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .checkout-field-full {
          grid-column: 1 / -1;
        }

        .checkout-label {
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748b;
        }

        .checkout-field input,
        .checkout-field select,
        .checkout-field textarea {
          width: 100%;
          border: 1px solid rgba(28, 123, 128, 0.12);
          border-radius: 14px;
          padding: 13px 14px;
          background: rgba(255, 255, 255, 0.82);
          color: #123139;
          font-size: 0.96rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .checkout-field input:focus,
        .checkout-field select:focus,
        .checkout-field textarea:focus {
          border-color: rgba(28, 123, 128, 0.34);
          box-shadow: 0 0 0 4px rgba(28, 123, 128, 0.1);
        }

        .checkout-field textarea {
          min-height: 120px;
          resize: vertical;
        }

        .checkout-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
        }

        .checkout-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 14px;
          min-height: 48px;
          padding: 0 18px;
          min-width: 168px;
          font-size: 0.94rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .checkout-button-primary {
          background: linear-gradient(135deg, #1c7b80, #0f5a60);
          color: #ffffff;
        }

        .checkout-button-secondary {
          background: rgba(255, 255, 255, 0.8);
          color: #123139;
          border: 1px solid rgba(28, 123, 128, 0.12);
        }

        .checkout-button:disabled {
          cursor: wait;
          opacity: 0.7;
        }

        .checkout-status {
          margin-top: 18px;
          border-radius: 16px;
          padding: 14px 16px;
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .checkout-status-error {
          background: rgba(254, 226, 226, 0.84);
          color: #991b1b;
          border: 1px solid rgba(248, 113, 113, 0.24);
        }

        .checkout-status-success {
          background: rgba(223, 243, 241, 0.76);
          color: #123139;
          border: 1px solid rgba(28, 123, 128, 0.14);
        }

        .checkout-redirect-wrap {
          margin-top: 24px;
          display: grid;
          gap: 16px;
        }

        .checkout-redirect-panel {
          border-radius: 20px;
          padding: 18px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(237, 248, 247, 0.92));
          border: 1px solid rgba(255, 255, 255, 0.95);
        }

        .checkout-redirect-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #123139;
        }

        .checkout-redirect-copy {
          margin: 8px 0 0;
          color: #55727a;
          font-size: 0.92rem;
          line-height: 1.55;
        }

        @media (max-width: 720px) {
          .checkout-overlay {
            padding: 16px;
          }

          .checkout-modal {
            padding: 22px 18px 18px;
          }

          .checkout-form-grid {
            grid-template-columns: 1fr;
          }

          .checkout-actions {
            flex-direction: column-reverse;
          }

          .checkout-button {
            width: 100%;
            justify-content: center;
            display: inline-flex;
            align-items: center;
          }
        }
      `}</style>

      <section
        className="pricing-section-shell"
        style={{
          background: "transparent",
          padding: "12px 20px 28px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "clamp(24px, 4vw, 34px)",
            borderRadius: "34px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.74), rgba(255,255,255,0.42))",
            backdropFilter: "blur(22px)",
            border: "1px solid rgba(255,255,255,0.82)",
            boxShadow: "0 24px 60px rgba(18,49,57,0.08)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p
              style={{
                margin: 0,
                color: "#5e7a82",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Service Plans
            </p>
            <h1
              style={{
                margin: "10px 0 0",
                fontSize: "clamp(2.6rem, 5vw, 4rem)",
                fontWeight: 600,
                color: "#123139",
                fontFamily: '"Cormorant Garamond", serif',
                lineHeight: 0.98,
              }}
            >
              Plans for magazine-ready growth
            </h1>
            <p
              style={{
                color: "#55727a",
                margin: "12px auto 0",
                maxWidth: "680px",
                lineHeight: 1.7,
              }}
            >
              Choose the level of visibility and support that best matches your brand stage, then
              move forward with a cleaner, more premium WI Thinkers experience.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >
            {plans.map((plan, index) => {
              const isMiddle = index === 1;
              const baseTransform = isMiddle ? "scale(1.06)" : "scale(1)";
              const baseShadow = isMiddle
                ? "0 25px 60px rgba(18,49,57,0.12)"
                : "0 12px 30px rgba(18,49,57,0.08)";

              return (
                <div
                  key={plan.id}
                  style={{
                    width: "320px",
                    padding: "28px",
                    borderRadius: "24px",
                    position: "relative",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    background: "rgba(255,255,255,0.66)",
                    backdropFilter: "blur(18px)",
                    border: "1px solid rgba(255,255,255,0.78)",
                    boxShadow: baseShadow,
                    transform: baseTransform,
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = isMiddle
                      ? "translateY(-4px) scale(1.055)"
                      : "translateY(-4px) scale(1.015)";
                    event.currentTarget.style.boxShadow = "0 18px 40px rgba(18,49,57,0.12)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = baseTransform;
                    event.currentTarget.style.boxShadow = baseShadow;
                  }}
                >
                  {plan.popular && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-14px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(135deg, #1c7b80, #0f5a60)",
                        color: "#fff",
                        fontSize: "12px",
                        padding: "6px 14px",
                        borderRadius: "999px",
                        fontWeight: 600,
                        boxShadow: "0 10px 20px rgba(15,90,96,0.22)",
                      }}
                    >
                      Most popular
                    </div>
                  )}

                  <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#123139" }}>
                    {plan.title}
                  </h3>

                  <p style={{ color: "#55727a", margin: "8px 0 18px", lineHeight: 1.6 }}>
                    {plan.desc}
                  </p>

                  <h2 style={{ fontSize: "44px", marginBottom: "20px", color: "#123139" }}>
                    ${plan.price}
                    <span style={{ fontSize: "14px", color: "#55727a" }}>/month</span>
                  </h2>

                  <ul
                    style={{
                      marginTop: "22px",
                      padding: 0,
                      listStyle: "none",
                      display: "grid",
                      gap: "10px",
                    }}
                  >
                    {comparisonFeatures.map((feature) => {
                      const featureValue = plan.features[feature.id];
                      const isIncluded = Boolean(featureValue);
                      const isSpotlight = feature.id === "billboard" && isIncluded;

                      return (
                        <li
                          key={feature.id}
                          style={{
                            display: "flex",
                            flexDirection: isSpotlight ? "column" : "row",
                            alignItems: isSpotlight ? "stretch" : "center",
                            justifyContent: isSpotlight ? "flex-start" : "space-between",
                            gap: "12px",
                            padding: "10px 12px",
                            borderRadius: "14px",
                            background: isSpotlight
                              ? "linear-gradient(135deg, #14595c, #0f5a60)"
                              : isIncluded
                              ? "linear-gradient(180deg, rgba(255,255,255,0.94), rgba(245,251,251,0.96))"
                              : "rgba(240, 247, 247, 0.82)",
                            border: isSpotlight
                              ? "1px solid rgba(170, 219, 211, 0.28)"
                              : isIncluded
                              ? "1px solid rgba(255,255,255,0.96)"
                              : "1px solid rgba(214,229,228,0.78)",
                            boxShadow: isSpotlight ? "0 14px 28px rgba(15,90,96,0.18)" : "none",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "12px",
                              minWidth: 0,
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                minWidth: 0,
                              }}
                            >
                              {isIncluded ? (
                                <span
                                  aria-hidden="true"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <img
                                    src={verifiedBadgeIcon}
                                    alt=""
                                    style={{
                                      width: "18px",
                                      height: "18px",
                                      display: "block",
                                      opacity: isSpotlight ? 1 : 0.85,
                                    }}
                                  />
                                </span>
                              ) : (
                                <span
                                  aria-hidden="true"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    color: "#94a3b8",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    width: "18px",
                                  }}
                                >
                                  -
                                </span>
                              )}
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: 500,
                                  color: isSpotlight
                                    ? "#f4fbfb"
                                    : isIncluded
                                    ? "#123139"
                                    : "#55727a",
                                  lineHeight: 1.35,
                                }}
                              >
                                {feature.label}
                              </span>
                            </div>

                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: isSpotlight
                                  ? "rgba(235,248,248,0.92)"
                                  : isIncluded
                                  ? "#48656e"
                                  : "#86a0a6",
                                textAlign: "right",
                              }}
                            >
                              {featureValue || "Locked"}
                            </span>
                          </div>

                          {isSpotlight && (
                            <div
                              style={{
                                marginLeft: "28px",
                                width: "fit-content",
                                padding: "4px 10px",
                                borderRadius: "999px",
                                fontSize: "10px",
                                lineHeight: "1.2",
                                fontWeight: 600,
                                letterSpacing: "0.02em",
                                color: "rgba(237,247,247,0.9)",
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(170,219,211,0.2)",
                              }}
                            >
                              {billboardNote}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <button
                    type="button"
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      padding: "12px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "0.3s",
                      background: plan.popular
                        ? "linear-gradient(135deg, #1c7b80, #0f5a60)"
                        : "rgba(255,255,255,0.78)",
                      color: plan.popular ? "#fff" : "#123139",
                      border: plan.popular ? "none" : "1px solid rgba(28,123,128,0.12)",
                    }}
                    onClick={() => openCheckout(plan.id)}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.transform = "scale(1.03)";
                      event.currentTarget.style.opacity = "0.9";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.transform = "scale(1)";
                      event.currentTarget.style.opacity = "1";
                    }}
                  >
                    Select Plan
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedPlan && (
        <div className="checkout-overlay" onClick={closeCheckout} role="presentation">
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="checkout-close"
              type="button"
              aria-label="Close checkout"
              onClick={closeCheckout}
            >
              ×
            </button>

            <p className="checkout-kicker">Secure checkout</p>
            <h2 className="checkout-title" id="checkout-title">
              {selectedPlan.title} plan
            </h2>
            <div className="checkout-plan-row">
              <span className="checkout-chip">${selectedPlan.price}/month</span>
              <span className="checkout-chip checkout-chip-muted">
                {checkoutStep === "form" ? "Step 1 of 2" : "Step 2 of 2"}
              </span>
            </div>
            <p className="checkout-subtitle">
              {checkoutStep === "form"
                ? "Before payment, share your details so the team knows who is joining this plan."
                : "Your details are saved. Review them or open the matching PayPal subscription page when you're ready."}
            </p>

            {checkoutStep === "form" ? (
              <form className="checkout-form" onSubmit={handleFormSubmit}>
                <div className="checkout-form-grid">
                  <label className="checkout-field">
                    <span className="checkout-label">Full name</span>
                    <input
                      type="text"
                      name="fullName"
                      value={formValues.fullName}
                      onChange={handleFieldChange}
                      placeholder="Your full name"
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-label">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleFieldChange}
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-label">Instagram</span>
                    <input
                      type="text"
                      name="instagram"
                      value={formValues.instagram}
                      onChange={handleFieldChange}
                      placeholder="@yourhandle"
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-label">Phone number</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleFieldChange}
                      placeholder="+44..."
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-label">City</span>
                    <input
                      type="text"
                      name="city"
                      value={formValues.city}
                      onChange={handleFieldChange}
                      placeholder="Your city"
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-label">You are a</span>
                    <select name="role" value={formValues.role} onChange={handleFieldChange} required>
                      <option value="Model">Model</option>
                      <option value="Photographer">Photographer</option>
                      <option value="Makeup Artist">Makeup Artist</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label className="checkout-field checkout-field-full">
                    <span className="checkout-label">Other details</span>
                    <textarea
                      name="details"
                      value={formValues.details}
                      onChange={handleFieldChange}
                      placeholder="Share a few details about your profile, goals, or anything the team should know."
                    />
                  </label>
                </div>

                {submitState.error && (
                  <div className="checkout-status checkout-status-error">{submitState.error}</div>
                )}

                <div className="checkout-actions">
                  <button
                    className="checkout-button checkout-button-secondary"
                    type="button"
                    onClick={closeCheckout}
                  >
                    Cancel
                  </button>
                  <button
                    className="checkout-button checkout-button-primary"
                    type="submit"
                    disabled={submitState.submitting}
                  >
                    {submitState.submitting ? "Saving details..." : "Continue to PayPal"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="checkout-redirect-wrap">
                {submitState.success && (
                  <div className="checkout-status checkout-status-success">{submitState.success}</div>
                )}

                <div className="checkout-redirect-panel">
                  <h3 className="checkout-redirect-title">
                    Ready for {selectedPlan.title} - ${selectedPlan.price}/month
                  </h3>
                  <p className="checkout-redirect-copy">
                    Use the button below to open the correct PayPal subscription for this plan.
                  </p>
                </div>

                <div className="checkout-actions">
                  <button
                    className="checkout-button checkout-button-secondary"
                    type="button"
                    onClick={() => setCheckoutStep("form")}
                  >
                    Edit details
                  </button>
                  <a
                    className="checkout-button checkout-button-primary"
                    href={selectedPlan.paypalUrl}
                  >
                    Open PayPal
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
