// frontend/src/pages/LoginPage.tsx
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};

    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta adresi girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalıdır.";
    }

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section>
      <h2 className="bolum-baslik">Giriş Yap</h2>
      {sent && (
        <p style={{ color: "green", fontWeight: "bold", marginBottom: "1rem" }}>
          Giriş başarılı! (Demo: Gerçek giriş altyapısı sonraki sprintlerde eklenecektir.)
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
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>

        <div>
          <button type="submit">Giriş Yap</button>
        </div>
      </form>

      <div
        style={{
          marginTop: "var(--bosluk-m)",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link to="/forgot-password" className="btn-link">
          Şifremi unuttum
        </Link>
        <Link to="/register" className="btn-link">
          Hesabın yok mu? Kayıt ol
        </Link>
      </div>
    </section>
  );
}