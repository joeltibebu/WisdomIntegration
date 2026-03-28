import React from "react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

function ExpertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

function ChildIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function SafeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

const features: Feature[] = [
  {
    title: "Experienced Specialists",
    description:
      "Our team brings years of expertise in pediatric therapy and special education.",
    icon: <ExpertIcon />,
    color: "bg-blue-100 text-wisdom-blue",
  },
  {
    title: "Child-Centered Care",
    description:
      "Every care plan is tailored to the individual needs, strengths, and goals of each child.",
    icon: <ChildIcon />,
    color: "bg-green-100 text-wisdom-green",
  },
  {
    title: "Family Involvement",
    description:
      "We partner with families every step of the way, because healing happens together.",
    icon: <FamilyIcon />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Safe and Welcoming",
    description:
      "Our environment is designed to feel safe, warm, and encouraging for every child.",
    icon: <SafeIcon />,
    color: "bg-orange-100 text-orange-500",
  },
];

export function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-heading"
      className="bg-wisdom-bg rounded-cardLg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-12">
        <h2
          id="why-heading"
          className="font-heading font-bold text-3xl sm:text-4xl text-wisdom-text"
        >
          Why Choose Wisdom Integration
        </h2>
      </div>

      <ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 list-none"
        role="list"
      >
        {features.map((feature) => (
          <li key={feature.title} className="flex gap-5">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${feature.color}`}
              aria-hidden="true"
            >
              {feature.icon}
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-wisdom-text mb-1">
                {feature.title}
              </h3>
              <p className="text-wisdom-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
