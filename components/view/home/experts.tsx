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
    name: "Ali Raza",
    role: "Senior Accounting Consultant",
    image: "",
    linkedin: "https://www.linkedin.com/in/syedalirazazaidii/",
    description:
      "4+ years of experience in financial accounting and compliance.",
  },
  {
    id: 2,
    name: "Syed Shahzaib",
    role: "BPO Accounting Specialist",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQFwJDSC7lwTwA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719468687910?e=1756944000&v=beta&t=osxgUxF5pL4RxR9EG3luviZ7vci8ujlpv5c0a0Gp1bs",
    linkedin: "https://www.linkedin.com/in/syed-shahzaib-aca-384796218/",
    description: "Focuses specifically on outsourced accounting tasks.",
  },
  {
    id: 3,
    name: "Muhammad Noman",
    role: "Senior Internal Controls Analyst",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHOTSwXsnFJmg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1709370722420?e=1756944000&v=beta&t=KGp-kbq7ONyzOFPwyO4FtXgHPM5ppD9OUK7FkzUt68s",
    linkedin: "https://www.linkedin.com/in/muhammad-noman-26617a189",
    description: "Internal controls and compliance expert.",
  },
  {
    id: 4,
    name: "Abdul Qayyum",
    role: "SECP & Tax Compliance Expert",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiobScdfU9pwaWTg6A9rXn15rKZ71HEEQj1k-rFYxycBKon-luZmg7mgSRFI9MBDM2y4xDx4CJkgNCLTQd5Gx_f3ChH7lImutz87eVM27Dw0Vrp7_-OR9PE0JDmDrzkJg_WxnkkP3_YyUe7iscgbqGx1_9TWO3sep7A9yz0Nh1F7ZBujeIJ3naLIDeBEfOm/s1599/WhatsApp%20Image%202025-07-28%20at%2011.26.57%20PM.jpeg",
    linkedin: "#",
    description:
      "5+ years of experience in financial accounting and tax consulting.",
  },
  {
    id: 5,
    name: "Danyal Mehdi",
    role: "Marketing Officer",
    image:
      "https://media.licdn.com/dms/image/v2/C5103AQFDvzekCVEzgg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1519248773846?e=1756339200&v=beta&t=radz92-7xS5P2khwCpsVcdNmSx0sPuo34UH2d8Gv-XA",
    linkedin: "https://www.linkedin.com/in/danyal-mehdi-0bb2b515a/",
    description: "5+ years of experience in marketing and sales.",
  },
  {
    id: 6,
    name: "Ali Hamza",
    role: "Software Engineer",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgorcYdz0E5TsArfLwh4CPJJXN-fDeoZfVGqYq1cwYeaSjYQAs6Y_6YHKVCtnvnB_Ojngj6a0h9Kz2VZGFzb9TDb8533T7UqXkHK-5Xd9UwE8Ulsckn-FsifAO76n85Dm8YrLc7sMC1HIO9HeNBc1LiVgkWNJ_nZO5nwzgM-V6K7p_RbhxcRrguw_5-lOU/w320-h320/WhatsApp%20Image%202023-08-01%20at%2011.07.22%20AM-modified.png",
    linkedin: "https://www.linkedin.com/in/syedalihamzaofficial/",
    description:
      "5+ years of experience in software development and web development.",
  },
  {
    id: 7,
    name: "Kashan",
    role: "Estate Tax Specialist",
    image: "",
    linkedin: "#",
    description:
      "Expert in estate planning and wealth transfer strategies for high-net-worth families.",
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
                      {expert.image ? (
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
                      ) : (
                        <motion.div
                          className="mx-auto flex size-32 items-center justify-center rounded-full border-4 border-blue-100 bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl font-bold text-white"
                          whileHover={{
                            borderColor: "#3b82f6",
                            boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {expert.name.charAt(0).toUpperCase()}
                        </motion.div>
                      )}
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
