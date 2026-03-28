import React from "react";
import Link from "next/link";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text column */}
        <div>
          <h2
            id="about-heading"
            className="font-heading font-bold text-3xl sm:text-4xl text-wisdom-text"
          >
            About Wisdom Integration
          </h2>
          <p className="mt-6 text-wisdom-muted text-lg leading-relaxed">
            We believe every child deserves the opportunity to thrive. Wisdom
            Integration provides compassionate, expert-led therapeutic and
            educational support for children with special needs and their
            families. Our team of dedicated specialists works hand-in-hand with
            families to create personalized care journeys built on trust, hope,
            and healing.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-wisdom-blue font-medium font-body hover:underline focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
            aria-label="Learn more about Wisdom Integration"
          >
            Learn More About Us
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Decorative column */}
        <div
          className="rounded-cardLg bg-gradient-to-br from-blue-100 to-green-100 p-10 flex flex-col items-center justify-center text-center min-h-[280px]"
          aria-hidden="true"
        >
          <div className="w-20 h-20 rounded-full bg-wisdom-blue flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <p className="font-heading font-semibold text-wisdom-blue text-xl">
            Care. Growth. Hope.
          </p>
          <p className="mt-2 text-wisdom-muted text-sm">
            Personalized journeys for every child
          </p>
        </div>
      </div>
    </section>
  );
}
