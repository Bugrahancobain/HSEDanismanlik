"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    ib_ap_al: "",
    testResults: "",
    research: "",
    projects: "",
    internships: "",
    competitions: "",
    volunteerWork: "",
    certifications: "",
    hobbies: "",
    additional: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

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
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setResponseMessage("Form başarıyla gönderildi!");

          // Google Sheets'e veri kaydet
          fetch("/api/proxy", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              school: formData.school,
              ib_ap_al: formData.ib_ap_al,
              testResults: formData.testResults,
              research: formData.research,
              projects: formData.projects,
              internships: formData.internships,
              competitions: formData.competitions,
              volunteerWork: formData.volunteerWork,
              certifications: formData.certifications,
              hobbies: formData.hobbies,
              additional: formData.additional,
            }),
          })
            .then((response) => response.json())
            .then((data) => console.log("Başarılı:", data))
            .catch((error) => console.error("Hata:", error));

          // Form verilerini sıfırla
          setFormData({
            name: "",
            email: "",
            phone: "",
            school: "",
            ib_ap_al: "",
            testResults: "",
            research: "",
            projects: "",
            internships: "",
            competitions: "",
            volunteerWork: "",
            certifications: "",
            hobbies: "",
            additional: "",
          });
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Form gönderilirken bir hata oluştu.");
        }
      );
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">HSEDanışmanlık Bilgi Formu</h1>
        <img className="logo" src="./HSELogo.png" alt="" />
        <div className="form-group">
          <label>Adınız ve Soyadınız:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>E-Posta:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Telefon Numarası:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Hangi okulda ve hangi sınıftasınız?</label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>IB, AP veya A-Level gibi programlardan ders aldınız mı?</label>
          <input
            type="text"
            name="ib_ap_al"
            value={formData.ib_ap_al}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>IELTS, TOEFL veya Duolingo gibi sınavlardan herhangi bir sonuç aldınız mı?</label>
          <input
            type="text"
            name="testResults"
            value={formData.testResults}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Herhangi bir alanda akademik araştırma yaptınız mı?</label>
          <input
            type="text"
            name="research"
            value={formData.research}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Herhangi bir projede yer aldınız mı?</label>
          <input
            type="text"
            name="projects"
            value={formData.projects}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Herhangi bir staj deneyiminiz oldu mu?</label>
          <input
            type="text"
            name="internships"
            value={formData.internships}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ulusal veya uluslararası herhangi bir yarışmaya katıldınız mı?</label>
          <input
            type="text"
            name="competitions"
            value={formData.competitions}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Gönüllü çalışmalarda bulundunuz mu?</label>
          <input
            type="text"
            name="volunteerWork"
            value={formData.volunteerWork}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Herhangi bir alanda sertifikalı ders aldınız mı?</label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>İlgilendiğiniz spor veya sanat dalları var mı?</label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Bunun dışında belirtmek istediğiniz herhangi bir akademik / sosyal çalışma var mı?</label>
          <textarea
            name="additional"
            value={formData.additional}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="form-button" type="submit">
          Gönder
        </button>
      </form>
      {responseMessage && <p className="form-response">{responseMessage}</p>}
    </div>
  );
}