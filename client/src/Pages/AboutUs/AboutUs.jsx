import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Abstract Background */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 mix-blend-multiply"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              We're <span className="text-emerald-400">CodeVera</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-200">
              Where developers unite to solve, share, and grow together
            </p>
          </div>
        </div>
      </div>

      {/* Platform Definition */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold tracking-wide text-emerald-500 uppercase">
            Collaborative Coding
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            A better way to solve coding challenges
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            CodeVera combines real-time collaboration with community wisdom to
            help you overcome any coding obstacle.
          </p>
        </div>

        {/* Value Propositions */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                name: "Collective Intelligence",
                description:
                  "Tap into the knowledge of thousands of developers worldwide",
                icon: (
                  <svg
                    className="h-8 w-8 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                ),
              },
              {
                name: "Instant Help",
                description:
                  "Get solutions to your coding problems in real-time",
                icon: (
                  <svg
                    className="h-8 w-8 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                name: "Skill Growth",
                description:
                  "Learn from solving real-world problems with peers",
                icon: (
                  <svg
                    className="h-8 w-8 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ),
              },
            ].map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white shadow-md">
                      {feature.icon}
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="lg:mx-auto lg:max-w-2xl lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How CodeVera Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Simple steps to get unstuck and keep learning
            </p>
          </div>

          <div className="mt-20">
            <div className="relative">
              {/* Vertical line */}
              <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

              <div className="relative space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
                {[
                  {
                    name: "Post Your Challenge",
                    description:
                      "Describe your coding problem with relevant details and code snippets",
                    icon: (
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    name: "Get Community Help",
                    description:
                      "Other developers review your problem and propose solutions",
                    icon: (
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    name: "Collaborate in Real-Time",
                    description:
                      "Work together on solutions using our shared coding environment",
                    icon: (
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    name: "Build Your Reputation",
                    description:
                      "Earn recognition by helping others solve their challenges",
                    icon: (
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </div>
                    ),
                  },
                ].map((step, index) => (
                  <div
                    key={step.name}
                    className={`relative lg:flex lg:items-start ${
                      index % 2 === 0
                        ? "lg:text-right lg:mr-8"
                        : "lg:text-left lg:ml-8 lg:mt-20"
                    }`}
                  >
                    <div
                      className={`lg:w-1/2 lg:px-4 ${
                        index % 2 === 0 ? "lg:order-1" : ""
                      }`}
                    >
                      <h3 className="text-lg font-medium text-gray-900">
                        {step.name}
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        {step.description}
                      </p>
                    </div>
                    <div
                      className={`mt-8 flex items-center justify-center h-12 w-12 rounded-md bg-white shadow-md lg:mt-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 ${
                        index % 2 === 0 ? "lg:order-2" : ""
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold tracking-wide text-emerald-500 uppercase">
              Trusted by developers
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              CodeVera in numbers
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Active Developers", value: "250K+" },
                { name: "Problems Solved", value: "1.2M+" },
                { name: "Solutions Shared", value: "3.8M+" },
                { name: "Response Time", value: "<15 min" },
              ].map((stat) => (
                <div key={stat.name} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-emerald-500 rounded-md shadow-lg">
                          <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {stat.name}
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-emerald-400">
              Start solving with CodeVera today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-500 bg-white hover:bg-gray-50"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
