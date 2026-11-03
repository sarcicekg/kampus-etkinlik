// frontend/src/components/layout/Header.tsx
interface HeaderProps {
  title: string;
  text?: string;
}

function Header({ title, text }: HeaderProps) {
  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p style={{ marginTop: "0.25rem", opacity: 0.9 }}>{text}</p>}
    </header>
  );
}

export default Header;