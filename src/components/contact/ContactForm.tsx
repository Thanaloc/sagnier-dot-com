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

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [isFocused, setIsFocused] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("sent");
    setFormData(initialFormData);
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: tidal }}
        style={{ marginBottom: "2rem" }}
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
        className="text-base md:text-lg text-foreground/35 leading-loose"
        style={{ marginBottom: "4rem" }}
      >
        Un projet, une idée, une envie de collaborer — laissez un message, je vous répondrai avec le prochain courant.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7, ease: tidal }}
        onSubmit={handleSubmit}
        className="space-y-12"
      >
        <motion.div
          animate={{ opacity: isFocused ? 1 : 0.85 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <FormField
              label="Nom"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required
            />
          </div>
        </motion.div>

        <FormField
          label="Sujet"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
        />

        <div>
          <label className="block text-[11px] tracking-[0.25em] uppercase text-foreground/30 mb-5">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required
            rows={6}
            className="w-full bg-transparent border-b border-foreground/10 text-foreground py-4 focus:outline-none focus:border-detail focus:border-b-2 transition-all duration-500 resize-none"
          />
        </div>

        <div style={{ paddingTop: "1.5rem" }}>
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
            <Button type="submit" variant="pill">
              {status === "sending" ? "Envoi..." : "Envoyer"}
            </Button>
          )}
        </div>
      </motion.form>
    </div>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
}) {
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
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        className="w-full bg-transparent border-b border-foreground/10 text-foreground py-4 focus:outline-none focus:border-detail focus:border-b-2 transition-all duration-500"
      />
    </div>
  );
}
