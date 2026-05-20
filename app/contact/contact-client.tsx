'use client';

import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Clock } from "lucide-react";

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
  const { t } = useLanguage();
  
  const contactInfo = [
    {
      icon: MapPin,
      label: t("contact.address"),
      value: "No.B6, Road 01, Russey Keo, Phnom Penh, Cambodia",
      href: null,
    },
    {
      icon: Clock,
      label: t("contact.hours"),
      value: "Monday – Friday, 8:00 AM – 5:00 PM",
      href: null,
    },
  ];
  
  return (
    <section className="relative bg-background py-3 sm:py-3 lg:py-4">

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left - Contact Info Column */}
          <motion.div
            className="w-full lg:col-span-5 order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col h-full gap-6 sm:gap-8">
              {/* Contact Cards - Address & Hours */}
              <motion.div
                className="flex flex-col gap-4 sm:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      variants={itemVariants}
                      className="group rounded-xl sm:rounded-2xl border border-primary/10 bg-white p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/15 w-full"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 lg:gap-5">
                        <div className="flex h-12 sm:h-14 w-12 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                          <Icon className="h-5 sm:h-6 lg:h-7 w-5 sm:w-6 lg:w-7" />
                        </div>
                        <div className="pt-0 sm:pt-1">
                          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary mb-1 sm:mb-1.5">
                            {info.label}
                          </p>
                          <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 leading-relaxed">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Call Action Button */}
              <motion.div
                className="flex flex-col gap-3 sm:gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* <div className="mb-2">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
                    Quick Contact
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Click to call us directly
                  </p>
                </div> */}
                <motion.a
                  href="tel:+85516329930"
                  variants={itemVariants}
                  className="group rounded-xl sm:rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/15 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-12 sm:h-14 w-12 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary/20 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                      <Phone className="h-5 sm:h-6 lg:h-7 w-5 sm:w-6 lg:w-7" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
                        {t("contact.callUs")}
                      </p>
                      <p className="text-sm sm:text-base font-medium text-gray-900">
                        {t("contact.clickToCall")}
                      </p>
                    </div>
                  </div>
                  <div className="text-primary transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </div>
                </motion.a>
              </motion.div>

              {/* Map */}
              {/* <motion.div
                className="overflow-hidden rounded-xl sm:rounded-2xl border border-primary/10 shadow-lg bg-white h-72 sm:h-80 lg:h-96"
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
              </motion.div> */}
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