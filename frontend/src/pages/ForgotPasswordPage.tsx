// frontend/src/pages/ForgotPasswordPage.tsx
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Geçerli bir e-posta adresi girin.");
      setSent(false);
    } else {
      setError("");
      setSent(true);
    }
  }

  return (
    <section>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p style={{ marginBottom: "var(--bosluk-m)", color: "#666" }}>
        Kayıtlı e-posta adresinizi girin, şifre yenileme bağlantısı gönderelim.
      </p>

      {sent && (
        <p style={{ color: "green", fontWeight: "bold", marginBottom: "1rem" }}>
          Bağlantı ({email}) adresine gönderildi (demo).
        </p>
      )}

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@ogrenci.edu.tr"
            aria-invalid={error ? true : undefined}
          />
          {error && <span className="hata-metni">{error}</span>}
        </div>

        <div>
          <button type="submit">Bağlantı Gönder</button>
        </div>
      </form>

      <div style={{ marginTop: "var(--bosluk-m)" }}>
        <Link to="/login" className="btn-link">
          ← Giriş sayfasına dön
        </Link>
      </div>
    </section>
  );
}