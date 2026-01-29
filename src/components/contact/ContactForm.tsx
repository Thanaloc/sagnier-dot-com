"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { transitions } from "@/config/theme";
import { Button } from "@/components/ui/Button";

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // Placeholder for future API integration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("sent");
    setFormData(initialFormData);
  }

  return (
    <motion.form
      initial="initial"
      animate="animate"
      variants={transitions.stagger}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-8"
    >
      <motion.div variants={transitions.fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          label="Nom"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </motion.div>

      <motion.div variants={transitions.fadeUp}>
        <FormField
          label="Sujet"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </motion.div>

      <motion.div variants={transitions.fadeUp}>
        <label className="block text-xs tracking-[0.15em] uppercase text-foreground/50 mb-3">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full bg-transparent border-b border-foreground/20 text-foreground py-3 focus:outline-none focus:border-detail transition-colors duration-300 resize-none"
        />
      </motion.div>

      <motion.div variants={transitions.fadeUp} className="pt-4">
        {status === "sent" ? (
          <p className="text-detail tracking-wider text-sm">
            Message envoyé. Je vous repondrai rapidement.
          </p>
        ) : (
          <Button type="submit">
            {status === "sending" ? "Envoi..." : "Envoyer"}
          </Button>
        )}
      </motion.div>
    </motion.form>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs tracking-[0.15em] uppercase text-foreground/50 mb-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border-b border-foreground/20 text-foreground py-3 focus:outline-none focus:border-detail transition-colors duration-300"
      />
    </div>
  );
}
