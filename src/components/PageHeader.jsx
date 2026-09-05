import React from "react";

const PageHeader = ({ dark = false }) => {
  return (
    <header className={`relative z-10 flex w-full items-center justify-between px-4 py-4 sm:px-6 sm:py-5 ${dark ? "text-white" : "text-gray-900"}`}>
      <div className="flex items-center gap-3">
        <img
          src="/img/logo/logo_new-min.png"
          alt="Burger&Burger"
          className="h-10 w-auto object-contain sm:h-12"
        />
        <div className="hidden border-l border-current/20 pl-3 sm:block">
          <p className="text-sm font-bold tracking-wide">BURGER&amp;BURGER</p>
          <p className="text-xs font-medium opacity-60">Dein Bestellterminal</p>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
