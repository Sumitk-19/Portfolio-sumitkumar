import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const name = form.from_name.value.trim();
    const email = form.from_email.value.trim();
    const message = form.message.value.trim();

    // 🔐 Basic validation
    if (!name || !email || !message) {
      setStatus("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        "service_65mgblo",
        "template_maf9yh9",
        formRef.current,
        "SdEwzo6EyrGgnP_AG"
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setLoading(false);
          form.reset();
        },
        () => {
          setStatus("Failed to send message. Try again later.");
          setLoading(false);
        }
      );
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contact</h2>
      <p className="section-subtitle">
        Feel free to reach out for opportunities or collaborations.
      </p>

      <form ref={formRef} onSubmit={sendEmail} className="contact-form">
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
        />

        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
        />

        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}

export default Contact;
