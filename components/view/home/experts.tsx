"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Linkedin } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";

interface Expert {
  id: number;
  name: string;
  role: string;
  image: string;
  linkedin: string;
  description: string;
}

// To add more experts, simply add new objects to this array
// The carousel will automatically handle the navigation
const experts: Expert[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Tax Consultant",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/sarah-johnson",
    description:
      "15+ years of experience in tax planning and compliance. Specializes in small business and individual tax returns.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Accounting Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/michael-chen",
    description:
      "Expert in financial accounting and compliance. Former Big 4 accountant with 12+ years of experience.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Tax Strategy Specialist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/emily-rodriguez",
    description:
      "Specializes in tax optimization strategies for high-net-worth individuals and corporations.",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Senior Accountant",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/david-thompson",
    description:
      "Certified Public Accountant with expertise in real estate and investment tax planning.",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "International Tax Specialist",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/lisa-wang",
    description:
      "Expert in international tax law and cross-border transactions.",
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "Corporate Tax Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/robert-martinez",
    description:
      "Specializes in corporate tax planning and compliance for Fortune 500 companies.",
  },
  {
    id: 7,
    name: "Jennifer Lee",
    role: "Estate Tax Specialist",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/jennifer-lee",
    description:
      "Expert in estate planning and wealth transfer strategies for high-net-worth families.",
  },
  {
    id: 8,
    name: "Alex Turner",
    role: "Technology Tax Consultant",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/alex-turner",
    description:
      "Specializes in tax strategies for technology startups and digital businesses.",
  },
];

export function Experts() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

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
            Meet Our Expert Team
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Our certified professionals bring years of experience and expertise
            to ensure your tax filing is accurate and optimized.
          </p>
        </motion.div>

        {/* Carousel for all screen sizes */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Carousel
            setApi={setApi}
            className="mx-auto w-full max-w-6xl"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4 lg:-ml-6">
              {experts.map((expert, index) => (
                <CarouselItem
                  key={expert.id}
                  className="basis-full cursor-pointer pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/4 lg:pl-6"
                >
                  <motion.div
                    className="h-full rounded-2xl bg-white p-6 text-center shadow-lg"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      scale: 1.02,
                    }}
                  >
                    <motion.div
                      className="relative mb-6"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.img
                        src={expert.image}
                        alt={expert.name}
                        className="mx-auto size-32 rounded-full border-4 border-blue-100 object-cover"
                        whileHover={{
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1)",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    <motion.h3
                      className="mb-2 text-xl font-bold text-gray-900"
                      whileHover={{ color: "#2563eb" }}
                    >
                      {expert.name}
                    </motion.h3>
                    <motion.p
                      className="mb-3 font-medium text-blue-600"
                      whileHover={{ scale: 1.05 }}
                    >
                      {expert.role}
                    </motion.p>
                    <motion.p
                      className="mb-4 text-sm leading-relaxed text-gray-600"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {expert.description}
                    </motion.p>
                    <motion.div
                      className="flex justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => window.open(expert.linkedin, "_blank")}
                      >
                        <motion.div
                          whileHover={{ rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Linkedin className="size-5" color="#0B66C2" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Carousel Indicators */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-2">
              {Array.from({ length: count }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`size-3 rounded-full transition-colors ${
                    index === current - 1
                      ? "bg-blue-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Slide Counter */}
          <motion.div
            className="mt-4 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-sm text-gray-500">
              {current} of {count}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
