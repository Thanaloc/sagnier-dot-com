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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("sent");
    setFormData(initialFormData);
  }

  return (
    <div className="w-full">
      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mb-20"
      >
        <p className="text-xs tracking-[0.5em] uppercase text-detail mb-8">Contact</p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wide text-foreground">
          Ecrivez-moi
        </h1>
      </motion.div>

      <motion.form
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={transitions.stagger}
        onSubmit={handleSubmit}
        className="space-y-14"
      >
        <motion.div variants={transitions.slideUp} className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <FormField label="Nom" name="name" type="text" value={formData.name} onChange={handleChange} required />
          <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </motion.div>

        <motion.div variants={transitions.slideUp}>
          <FormField label="Sujet" name="subject" type="text" value={formData.subject} onChange={handleChange} required />
        </motion.div>

        <motion.div variants={transitions.slideUp}>
          <label className="block text-[11px] tracking-[0.25em] uppercase text-foreground/30 mb-5">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-transparent border-b border-foreground/10 text-foreground py-4 focus:outline-none focus:border-detail transition-colors duration-500 resize-none"
          />
        </motion.div>

        <motion.div variants={transitions.slideUp} className="pt-8">
          {status === "sent" ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-detail tracking-[0.15em] text-sm"
            >
              Message envoyé. Je vous repondrai rapidement.
            </motion.p>
          ) : (
            <Button type="submit">
              {status === "sending" ? "Envoi..." : "Envoyer"}
            </Button>
          )}
        </motion.div>
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
      <label htmlFor={name} className="block text-[11px] tracking-[0.25em] uppercase text-foreground/30 mb-5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border-b border-foreground/10 text-foreground py-4 focus:outline-none focus:border-detail transition-colors duration-500"
      />
    </div>
  );
}
