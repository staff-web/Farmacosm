"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent px-8 py-16 sm:px-12 sm:py-20 text-center shadow-lg shadow-primary/10 h-full">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 mb-6">
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
          Message sent successfully!
        </h3>
        <p className="text-base text-gray-600 max-w-md mx-auto mb-8">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-base font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-primary/20 bg-white p-8 sm:p-10 lg:p-12 shadow-2xl w-full h-full flex flex-col"
    >
      <div className="mb-8 border-b border-primary/10 pb-6">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          Send us a message
        </h3>
        <p className="text-base text-gray-600">
          We'll respond within one business day. Fill out the form below and we'll get back to you shortly.
        </p>
      </div>

      <motion.div
        className="flex-1 flex flex-col space-y-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-700"
            >
              First Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-700"
            >
              Last Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-700"
          >
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            placeholder="Enter your company name"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-700"
          >
            Subject <span className="text-primary">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            <option value="" className="text-gray-500">Select a subject</option>
            <option value="product-inquiry" className="text-gray-900">Product Inquiry</option>
            <option value="quote-request" className="text-gray-900">Quote Request</option>
            <option value="oem-odm" className="text-gray-900">OEM / ODM Services</option>
            <option value="partnership" className="text-gray-900">Partnership Opportunities</option>
            <option value="general" className="text-gray-900">General Inquiry</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-700"
          >
            Your Message <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            placeholder="Tell us how we can help you..."
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-600 rounded-lg bg-gradient-to-r from-primary to-primary/80 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/50 hover:from-primary hover:to-primary/70 active:scale-95 sm:w-auto sm:px-12 mt-4 border border-gray-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          viewport={{ once: true }}
        >
          Send Message
        </motion.button>
      </motion.div>
    </form>
  );
}