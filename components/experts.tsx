"use client";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Linkedin } from "lucide-react";
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
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/sarah-johnson",
        description: "15+ years of experience in tax planning and compliance. Specializes in small business and individual tax returns."
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Audit Director",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/michael-chen",
        description: "Expert in financial audits and compliance. Former Big 4 auditor with 12+ years of experience."
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Tax Strategy Specialist",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/emily-rodriguez",
        description: "Specializes in tax optimization strategies for high-net-worth individuals and corporations."
    },
    {
        id: 4,
        name: "David Thompson",
        role: "Senior Accountant",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/david-thompson",
        description: "Certified Public Accountant with expertise in real estate and investment tax planning."
    },
    {
        id: 5,
        name: "Lisa Wang",
        role: "International Tax Specialist",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/lisa-wang",
        description: "Expert in international tax law and cross-border transactions."
    },
    {
        id: 6,
        name: "Robert Martinez",
        role: "Corporate Tax Manager",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/robert-martinez",
        description: "Specializes in corporate tax planning and compliance for Fortune 500 companies."
    },
    {
        id: 7,
        name: "Jennifer Lee",
        role: "Estate Tax Specialist",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/jennifer-lee",
        description: "Expert in estate planning and wealth transfer strategies for high-net-worth families."
    },
    {
        id: 8,
        name: "Alex Turner",
        role: "Technology Tax Consultant",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/alex-turner",
        description: "Specializes in tax strategies for technology startups and digital businesses."
    }
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
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Meet Our Expert Team
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Our certified professionals bring years of experience and expertise
                        to ensure your tax filing is accurate and optimized.
                    </p>
                </div>

                {/* Carousel for all screen sizes */}
                <div className="relative">
                    <Carousel
                        setApi={setApi}
                        className="w-full max-w-6xl mx-auto"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-2 md:-ml-4 lg:-ml-6">
                            {experts.map((expert) => (
                                <CarouselItem
                                    key={expert.id}
                                    className="pl-2 md:pl-4 lg:pl-6 basis-full sm:basis-1/2 lg:basis-1/4"
                                >
                                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center h-full">
                                        <div className="relative mb-6">
                                            <img
                                                src={expert.image}
                                                alt={expert.name}
                                                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-100"
                                            />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {expert.name}
                                        </h3>
                                        <p className="text-blue-600 font-medium mb-3">
                                            {expert.role}
                                        </p>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {expert.description}
                                        </p>
                                        <div className="flex justify-center">
                                            <Button
                                                variant="link"
                                                className="p-0"
                                                onClick={() => window.open(expert.linkedin, '_blank')}
                                            >
                                                <Linkedin className="w-5 h-5" color='#0B66C2' />
                                            </Button>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center mt-8">
                        <div className="flex space-x-2">
                            {Array.from({ length: count }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${index === current - 1 ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Slide Counter */}
                    <div className="flex justify-center mt-4">
                        <div className="text-sm text-gray-500">
                            {current} of {count}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 