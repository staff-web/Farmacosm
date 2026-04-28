'use client';

import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@farmacosm.com",
    href: "mailto:info@farmacosm.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "016 329 930 / 076 421 0661",
    href: "tel:+85516329930",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "No.B6, Road 01, Russey Keo, Phnom Penh, Cambodia",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Monday – Friday, 8:00 AM – 5:00 PM",
    href: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ContactPageClient() {
  return (
    <section className="relative bg-background py-3 sm:py-3 lg:py-4">

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left - Contact Info Column */}
          <motion.div
            className="w-full lg:col-span-5 order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col h-full space-y-8">
              {/* Contact Cards - One card per row */}
              <motion.div
                className="flex flex-col space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      variants={itemVariants}
                      className="group rounded-2xl border border-primary/10 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/15 w-full"
                    >
                      <div className="flex items-start">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 mr-5">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className="pt-1">
                          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-1.5">
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-base lg:text-lg font-medium text-gray-900 transition-colors hover:text-primary leading-relaxed"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-base lg:text-lg font-medium text-gray-900 leading-relaxed">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Map */}
              <motion.div
                className="overflow-hidden rounded-2xl border border-primary/10 shadow-lg bg-white h-80 lg:h-96"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-full">
                  <iframe
                    title="Farmacosm Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31254.1!2d104.89!3d11.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sRussey%20Keo%2C%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000"
                    className="absolute inset-0 w-full h-full grayscale transition-all duration-300 hover:grayscale-0"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Form Column */}
          <motion.div
            className="w-full lg:col-span-7 order-1 lg:order-2 h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-full">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}