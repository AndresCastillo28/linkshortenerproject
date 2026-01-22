import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Link Shortener - Simplify Your URLs",
  description:
    "Create short, memorable links in seconds. Track clicks, manage your links, and share with ease.",
};

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Shorten Your Links,{" "}
              <span className="text-zinc-600 dark:text-zinc-400">
                Amplify Your Reach
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Create short, memorable links in seconds. Track performance,
              manage your links, and share with confidence.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-3 text-base font-medium rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="#features"
                className="px-8 py-3 text-base font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Powerful features to manage and track your shortened links
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-zinc-900 dark:text-zinc-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Instant Short Links
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Generate short, memorable URLs in seconds. Perfect for sharing
                on social media, emails, or anywhere else.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-zinc-900 dark:text-zinc-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Click Analytics
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Track how many times your links are clicked. Understand your
                audience and measure engagement.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-zinc-900 dark:text-zinc-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Secure & Private
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Your links are protected with industry-standard security. Only
                you can manage and delete your links.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-zinc-900 dark:text-zinc-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Lightning Fast
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Blazing fast redirects ensure your audience reaches their
                destination without delay.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-zinc-900 dark:text-zinc-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Easy Management
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Manage all your links from a simple, intuitive dashboard. Edit,
                delete, or view stats anytime.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-zinc-900 dark:text-zinc-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Mobile Friendly
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Create and manage links on the go. Fully responsive design
                works seamlessly on all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Sign Up
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Create your free account in seconds. No credit card required.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Create Link
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Paste your long URL and get a short link instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Share & Track
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Share your link and monitor clicks in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Join thousands of users who trust us with their links.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3 text-base font-medium rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Start Shortening Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
