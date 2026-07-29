import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const links = [
  { to: "/", label: "Marketplace" },
  { to: "/community", label: "Community" },
  { to: "/collection", label: "My Collection" },
] as const;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return (
    <div className="pointer-events-none sticky top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav className="pointer-events-auto mx-auto flex max-w-6xl items-center gap-4 rounded-full border border-border/70 bg-card/70 px-4 py-3 shadow-float backdrop-blur-xl sm:px-6 sm:py-4">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
            C
          </span>
          <span className="font-display text-base font-bold tracking-tight">
            CollectorsHub
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-6xl rounded-3xl border border-border bg-card p-3 shadow-float md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
    // <nav className="flex justify-between items-center p-4 shadow">
    //   <h2 className="font-bold text-xl">CollectorsHub</h2>

    //   <div className="flex gap-6">
    //     <Link to="/">Marketplace</Link>

    //     <Link to="/community">Community</Link>

    //     <Link to="/collection">My Collection</Link>
    //   </div>
    // </nav>
  );
};

export default Navbar;
