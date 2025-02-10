"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
  });

  const [popupVisible, setPopupVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // EmailJS ile e-posta gönderimi
    emailjs
      .send(
        "service_xe8tux8", // EmailJS Service ID
        "template_po0tl66", // EmailJS Template ID
        formData,
        "M58aPrjybGLF1BF-t" // EmailJS Public Key
      )
      .then(
        () => {
          setPopupVisible(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            school: "",
          });
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Form gönderilirken bir hata oluştu.");
        }
      );
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">HSEDanışmanlık Bilgi Formu</h1>
        <div className="form-group">
          <label>Adınız ve Soyadınız:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>E-Posta:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Telefon Numarası:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Hangi okulda ve hangi sınıftasınız?</label>
          <input type="text" name="school" value={formData.school} onChange={handleChange} required />
        </div>
        <button className="form-button" type="submit">
          Gönder
        </button>
      </form>

      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>
              <strong>BURS AL, KABUL EDİL!🚀 YURT DIŞI EĞİTİM ÜZERİNE ÜCRETSİZ WEBINAR🎈</strong>
              <br />
              21 Şub Cuma · 20:00–21:00
              <br />
              Google Meet görüşmesine katılma bilgileri:
              <br />
              <a href="https://meet.google.com/bja-gcym-bht" target="_blank" rel="noopener noreferrer">
                https://meet.google.com/bja-gcym-bht
              </a>
            </p>
            <button className="popup-button" onClick={() => setPopupVisible(false)}>Tamam</button>
          </div>
        </div>
      )}
    </div>
  );
}
