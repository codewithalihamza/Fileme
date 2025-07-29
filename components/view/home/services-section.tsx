"use client";
import { getServices } from "@/lib/services";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export const ServicesSection = () => {
  const services = getServices();

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Our Professional Services
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Comprehensive financial solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`rounded-2xl border ${service.borderColor} bg-gradient-to-br ${service.gradient} p-8 transition-all duration-300 hover:shadow-xl`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <motion.div
                className={`mb-6 flex size-16 items-center justify-center rounded-xl ${service.iconBg}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-white">{service.icon}</div>
              </motion.div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {service.title}
              </h3>

              <p className="mb-6 leading-relaxed text-gray-600">
                {service.description}
              </p>

              <motion.ul className="space-y-2 text-gray-600">
                {service.features.map((item, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + featureIndex * 0.1,
                    }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="mr-2 size-5 text-green-500" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
