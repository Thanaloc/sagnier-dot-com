"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const tidal = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const FIELD_AUTOCOMPLETE: Record<keyof FormData, string> = {
  name: "name",
  email: "email",
  subject: "off",
  message: "off",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formspreeId) {
      console.warn("NEXT_PUBLIC_FORMSPREE_ID not configured");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData(initialFormData);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: tidal }}
        className="mb-8"
      >
        <p className="text-xs tracking-[0.5em] uppercase text-detail mb-8">Contact</p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wide text-foreground">
          Écrivez-moi
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: tidal }}
        className="text-base md:text-lg text-foreground/35 leading-loose mb-12 md:mb-16"
      >
        Un projet, une idée, une envie de collaborer — laissez un message, je vous répondrai avec le prochain courant.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7, ease: tidal }}
        onSubmit={handleSubmit}
        className="space-y-12"
        noValidate={false}
        aria-busy={status === "sending"}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <FormField
            label="Nom"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            autoComplete={FIELD_AUTOCOMPLETE.name}
            required
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete={FIELD_AUTOCOMPLETE.email}
            inputMode="email"
            required
          />
        </div>

        <FormField
          label="Sujet"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          autoComplete={FIELD_AUTOCOMPLETE.subject}
          required
        />

        <div>
          <label
            htmlFor="message"
            className="block text-[11px] tracking-[0.25em] uppercase text-foreground/30 mb-5"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            autoComplete={FIELD_AUTOCOMPLETE.message}
            className="w-full bg-transparent border-b border-foreground/10 text-foreground py-4 focus:outline-none focus:border-detail focus:border-b-2 transition-all duration-500 resize-none"
          />
        </div>

        <div className="pt-6" aria-live="polite">
          {status === "sent" ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: tidal }}
              className="text-detail tracking-[0.15em] text-sm"
            >
              Message envoyé. Je vous répondrai rapidement.
            </motion.p>
          ) : (
            <>
              {status === "error" && (
                <p className="text-cta/80 text-sm tracking-wide mb-6">
                  Une erreur est survenue. Réessayez ou contactez-moi directement.
                </p>
              )}
              <Button type="submit" variant="pill" disabled={status === "sending"}>
                {status === "sending" ? "Envoi..." : "Envoyer"}
              </Button>
            </>
          )}
        </div>
      </motion.form>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  name: keyof FormData;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  inputMode?: "text" | "email" | "url" | "tel";
  required?: boolean;
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  autoComplete,
  inputMode,
  required,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-[11px] tracking-[0.25em] uppercase text-foreground/30 mb-5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        className="w-full bg-transparent border-b border-foreground/10 text-foreground py-4 focus:outline-none focus:border-detail focus:border-b-2 transition-all duration-500"
      />
    </div>
  );
}
