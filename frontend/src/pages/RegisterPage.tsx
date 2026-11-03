// frontend/src/pages/RegisterPage.tsx
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: RegisterErrors = {};

    if (name.trim().length < 3) {
      found.name = "Ad soyad en az 3 karakter olmalıdır.";
    }
    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta adresi girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalıdır.";
    }
    if (password !== password2) {
      found.password2 = "Şifreler birbiriyle eşleşmiyor.";
    }

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section>
      <h2 className="bolum-baslik">Kayıt Ol</h2>
      {sent && (
        <p style={{ color: "green", fontWeight: "bold", marginBottom: "1rem" }}>
          Kayıt başarılı! (Demo)
        </p>
      )}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Ad Soyad *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ad Soyad"
            aria-invalid={errors.name ? true : undefined}
          />
          {errors.name && <span className="hata-metni">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-posta *</label>
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
          <label htmlFor="password">Şifre *</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password2">Şifre (Tekrar) *</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            aria-invalid={errors.password2 ? true : undefined}
          />
          {errors.password2 && <span className="hata-metni">{errors.password2}</span>}
        </div>

        <div>
          <button type="submit">Kayıt Ol</button>
        </div>
      </form>

      <div style={{ marginTop: "var(--bosluk-m)" }}>
        <Link to="/login" className="btn-link">
          Zaten hesabın var mı? Giriş yap
        </Link>
      </div>
    </section>
  );
}