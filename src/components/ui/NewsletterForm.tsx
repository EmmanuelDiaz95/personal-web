'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="border border-dashed border-cta-border rounded-[10px] p-5 transition-all duration-300">
      <div className="text-[15px] font-medium mb-1">Stay updated</div>
      <div className="text-[13px] text-text-secondary mb-3.5 transition-colors duration-300">New articles, monthly.</div>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-surface border border-border rounded-md px-3.5 py-2.5 text-[13px] text-text-muted w-full mb-2.5 outline-none font-mono transition-all duration-300"
        required
      />
      <button
        type="submit"
        className="bg-text-primary text-bg border-none rounded-md px-4 py-2.5 text-[13px] font-semibold cursor-pointer w-full font-sans transition-all duration-300"
      >
        Subscribe
      </button>
    </form>
  );
}
