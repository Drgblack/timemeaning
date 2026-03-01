"use client";

import { useState } from "react";
import { PageLayout } from "@/components/page-layout";
import { JsonLd, generateBreadcrumbSchema } from "@/components/json-ld";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "TimeMeaning", url: "https://timemeaning.com" },
  { name: "Contact", url: "https://timemeaning.com/contact" }
]);

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    // TODO: Add server-side honeypot or reCAPTCHA v3 before production
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema} />
      <article className="prose-like">
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-6">
          Contact
        </h1>

        <p className="text-foreground/85 leading-relaxed mb-10">
          TimeMeaning is a small independent utility. We read every message but cannot 
          guarantee a response to all enquiries.
        </p>

        <div className="space-y-8 mb-12">
          <section>
            <h2 className="font-serif text-lg font-medium text-foreground mb-2">
              For general questions or feedback
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              Use the form below or write to{" "}
              <a 
                href="mailto:hello@timemeaning.com" 
                className="text-primary hover:underline"
              >
                hello@timemeaning.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-foreground mb-2">
              For privacy-related requests
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              <a 
                href="mailto:privacy@timemeaning.com" 
                className="text-primary hover:underline"
              >
                privacy@timemeaning.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-foreground mb-2">
              For press or partnership enquiries
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              <a 
                href="mailto:hello@timemeaning.com" 
                className="text-primary hover:underline"
              >
                hello@timemeaning.com
              </a>
              {" "}— please include &ldquo;Press&rdquo; or &ldquo;Partnership&rdquo; in the subject line.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-foreground mb-2">
              For bug reports or incorrect interpretations
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              Please include the exact text you pasted and describe what you expected versus 
              what you received. This is the most useful information for improving the tool.
            </p>
          </section>
        </div>

        {/* Contact Form */}
        <div className="border-t border-border pt-10">
          {isSubmitted ? (
            <div className="bg-secondary/50 border border-border rounded-md p-6">
              <p className="text-foreground font-medium mb-2">Message sent</p>
              <p className="text-foreground/85 text-sm">
                Thank you for reaching out. We&apos;ll review your message and respond if needed.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users, bots will fill it */}
              {/* TODO: Add server-side validation to reject submissions where this field is filled */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px]"
                aria-hidden="true"
              />

              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-card border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-card border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-card border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 font-mono text-sm font-semibold text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110"
                style={{
                  background: 'linear-gradient(to bottom, #d4a040, #a87520)',
                  boxShadow: '0 1px 0 rgba(212,160,64,0.4) inset, 0 3px 10px rgba(168,117,32,0.45), 0 1px 3px rgba(0,0,0,0.25)',
                  border: '1px solid #9a6a10',
                  borderTopColor: '#c8922a',
                }}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>

              <p className="text-muted-foreground text-xs mt-4">
                We do not add you to any mailing list when you contact us.
              </p>
            </form>
          )}
        </div>
      </article>
    </PageLayout>
  );
}
