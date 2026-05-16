import { useMemo, useState } from "react";

const authMethods = [
  {
    id: "mobile",
    label: "Mobile OTP",
    helper: "Receive a 6-digit OTP on your mobile number.",
    inputLabel: "Mobile number",
    inputType: "tel",
    placeholder: "+91 98765 43210",
    icon: "📱",
  },
  {
    id: "whatsapp",
    label: "WhatsApp OTP",
    helper: "Get your code on WhatsApp for faster seva updates.",
    inputLabel: "WhatsApp number",
    inputType: "tel",
    placeholder: "+91 98765 43210",
    icon: "💬",
  },
  {
    id: "gmail",
    label: "Gmail",
    helper: "Continue with your Gmail account or request an email OTP.",
    inputLabel: "Gmail address",
    inputType: "email",
    placeholder: "name@gmail.com",
    icon: "✉️",
  },
];

const initialFormState = {
  identifier: "",
  otp: "",
};

function AuthAccess() {
  const [activeMethod, setActiveMethod] = useState(authMethods[0].id);
  const [authMode, setAuthMode] = useState("login");
  const [formState, setFormState] = useState(initialFormState);
  const [step, setStep] = useState("request");
  const [message, setMessage] = useState(
    "Choose your preferred sign in method to continue booking sevas.",
  );

  const selectedMethod = useMemo(
    () => authMethods.find((method) => method.id === activeMethod),
    [activeMethod],
  );

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const selectMethod = (methodId) => {
    setActiveMethod(methodId);
    setFormState(initialFormState);
    setStep("request");
    setMessage("Choose your preferred sign in method to continue booking sevas.");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (step === "request") {
      setStep("verify");
      setFormState((current) => ({ ...current, otp: "" }));
      setMessage(
        `Demo ${selectedMethod.label} sent to ${formState.identifier}. Connect your auth API to deliver real OTPs.`,
      );
      return;
    }

    setMessage(
      `You are ready to ${authMode === "login" ? "log in" : "sign up"} with ${selectedMethod.label}. Backend verification can now complete this flow.`,
    );
  };

  const isGmail = selectedMethod.id === "gmail";

  return (
    <section className="section-pad auth-section" id="login">
      <div className="container auth-card">
        <div className="auth-copy">
          <p className="eyebrow">
            <span></span> Devotee access
          </p>
          <h2>Login or signup before your next seva.</h2>
          <p>
            Use mobile OTP, WhatsApp OTP, or Gmail to keep your bookings,
            sankalpa details, live links, and prasadam updates in one secure
            place.
          </p>
          <div className="auth-benefits" aria-label="Account benefits">
            <span>Saved devotee profile</span>
            <span>Quick repeat bookings</span>
            <span>Seva status updates</span>
          </div>
        </div>

        <div className="auth-panel" aria-label="Login or signup form">
          <div
            className="auth-mode-toggle"
            role="group"
            aria-label="Choose login or signup"
          >
            {[
              ["login", "Login"],
              ["signup", "Signup"],
            ].map(([mode, label]) => (
              <button
                className={authMode === mode ? "active" : ""}
                key={mode}
                type="button"
                onClick={() => setAuthMode(mode)}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            className="auth-methods"
            role="tablist"
            aria-label="Authentication methods"
          >
            {authMethods.map((method) => (
              <button
                aria-selected={activeMethod === method.id}
                className={activeMethod === method.id ? "active" : ""}
                key={method.id}
                role="tab"
                type="button"
                onClick={() => selectMethod(method.id)}
              >
                <span>{method.icon}</span>
                {method.label}
              </button>
            ))}
          </div>

          {isGmail && (
            <button className="gmail-button" type="button">
              <span aria-hidden="true">G</span>
              Continue with Gmail
            </button>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              {selectedMethod.inputLabel}
              <input
                autoComplete={isGmail ? "email" : "tel"}
                inputMode={isGmail ? "email" : "tel"}
                name="identifier"
                onChange={updateField}
                placeholder={selectedMethod.placeholder}
                required
                type={selectedMethod.inputType}
                value={formState.identifier}
              />
            </label>

            {step === "verify" && (
              <label>
                Enter OTP
                <input
                  inputMode="numeric"
                  maxLength="6"
                  name="otp"
                  onChange={updateField}
                  pattern="[0-9]{6}"
                  placeholder="6-digit code"
                  required
                  type="text"
                  value={formState.otp}
                />
              </label>
            )}

            <button className="btn btn-primary" type="submit">
              {step === "request"
                ? `Send ${selectedMethod.label}`
                : "Verify & Continue"}
            </button>
            <p className="auth-helper">{selectedMethod.helper}</p>
            <p className="form-note success">{message}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AuthAccess;
