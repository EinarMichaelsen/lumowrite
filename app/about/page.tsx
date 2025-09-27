import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Lumowrite - Free Distraction-Free Writing Tool Online | Freewriting App",
  description:
    "Discover Lumowrite, the ultimate distraction-free writing tool online. Perfect for freewriting, calm writing, and stream of consciousness. Start writing freely today with our minimalist writing app.",
  keywords: [
    "freewrite",
    "free write",
    "freewriting",
    "freewriting app",
    "distraction free writing",
    "distraction free writing tool online",
    "calm writing",
    "mindful writing",
    "stream of consciousness writing",
    "writing for clarity",
    "online writing app",
    "minimalist writing tool",
    "focus writing app",
    "digital writing space",
    "therapeutic writing",
    "journaling online",
    "creative writing tool",
    "writing meditation",
    "free online writing tool",
    "distraction-free text editor",
    "simple writing app",
    "clean writing interface",
  ],
  openGraph: {
    title: "About Lumowrite - Free Distraction-Free Writing Tool Online",
    description:
      "The ultimate distraction-free writing tool for freewriting, calm writing, and stream of consciousness. Write freely without distractions.",
    type: "website",
    url: "https://lumowrite.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Lumowrite - Free Distraction-Free Writing Tool Online",
    description:
      "The ultimate distraction-free writing tool for freewriting, calm writing, and stream of consciousness. Write freely without distractions.",
  },
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About Lumowrite - Free Distraction-Free Writing Tool Online",
    description:
      "Discover Lumowrite, the ultimate distraction-free writing tool online. Perfect for freewriting, calm writing, and stream of consciousness writing.",
    url: "https://lumowrite.com/about",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Lumowrite",
      applicationCategory: "Writing Tool",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "A free, distraction-free writing tool online designed for freewriting, calm writing, and mindful writing practices.",
      featureList: [
        "Distraction-free writing interface",
        "Built-in writing timer",
        "AI-powered reflection",
        "Privacy-first design",
        "Multiple export formats",
        "Cross-device compatibility",
      ],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://lumowrite.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://lumowrite.com/about",
        },
      ],
    },
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border/10">
          <div className="max-w-4xl mx-auto p-4 md:p-8">
            <Link href="/">
              <Button variant="ghost" className="p-2 mb-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Writing
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <article className="prose prose-lg max-w-none">
            {/* Hero Section */}
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About Lumowrite</h1>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                We all carry thoughts that need somewhere to go. Writing them out is one of the simplest ways to make
                sense of them.
              </p>
            </header>

            {/* What is this? */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">What is this?</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>Lumowrite is your space to think things through. Without pressure or perfection.</p>
                <p>
                  It's not a note-taking app, but an app for writing out your ideas and thoughts. For processing
                  emotions, working through decisions, or simply letting your mind wander onto the page.
                </p>
                <p>
                  Think of it as having a conversation with yourself - except instead of your thoughts bouncing around
                  in your head, they get to stretch out and breathe on the screen.
                </p>
              </div>
            </section>

            {/* How it works */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">How it works</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>
                  Start by setting the timer and just write freely. Don't focus on grammar or structure. Just about
                  getting your thoughts out of your head and onto the page.
                </p>
                <p>There's no right way to do it. You can:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Dump your thoughts when you're overwhelmed</li>
                  <li>Talk through a decision you're facing</li>
                  <li>Vent about something that's bothering you</li>
                  <li>Explore an idea that's been nagging at you</li>
                  <li>Just see what comes up when you start typing</li>
                </ul>
                <p className="font-medium">No backspace. No editing. Just flow.</p>
              </div>
            </section>

            {/* Then we talk */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Then we talk</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>Once you've written, you can reflect on your thoughts with ChatGPT if you want.</p>
                <p>The AI might:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Reflect on what you wrote</li>
                  <li>Ask questions to help you see things more clearly</li>
                  <li>Offer suggestions or frameworks to move forward</li>
                  <li>Simply be a thoughtful companion to your thoughts</li>
                </ul>
                <p>
                  It's like having a friend who really listens - someone who can help you untangle what you're thinking
                  and feeling.
                </p>
              </div>
            </section>

            {/* Getting started */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Getting started</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>If you're not sure what to write, start with a simple question:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>What's on my mind right now?</li>
                  <li>What's something I'm grateful for today?</li>
                  <li>What do I wish I could say out loud?</li>
                  <li>What's feeling heavy... or light?</li>
                  <li>If I were being honest with myself, I'd say...</li>
                </ul>
                <p>Still stuck? Just start with "I don't know what to write..." and go from there.</p>
              </div>
            </section>

            {/* Your space */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">This is your space</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>Let it be messy, honest, quiet, surprising, fun... whatever you need it to be.</p>
                <p>
                  The magic happens when you stop trying to write "well" and just write honestly. When you let your
                  thoughts exist without judgment.
                </p>
                <p>
                  Sometimes you'll discover things you didn't know you were thinking. Sometimes you'll work through
                  problems just by getting them out of your head. Sometimes you'll just feel lighter afterward.
                </p>
                <p className="font-medium">That's the point.</p>
              </div>
            </section>

            {/* Privacy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Your privacy matters</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>Your writings are stored only on your device:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Everything stays in your browser's local storage</li>
                  <li>Nothing is sent to servers unless you choose to use ChatGPT</li>
                  <li>Your thoughts remain private by default</li>
                  <li>If you clear your browser data, your writings will be lost (so export what matters)</li>
                </ul>
                <p>
                  This approach prioritizes your privacy, but means your writings won't sync between different devices
                  or browsers. We think that's a fair trade.
                </p>
                <p className="text-sm">
                  <Link href="/privacy" className="text-primary underline">
                    Read our full privacy policy
                  </Link>
                </p>
              </div>
            </section>

            {/* Open source */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Built in the open</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>
                  Lumowrite is open source because we believe tools for thinking should be transparent and
                  community-owned.
                </p>
                <p>
                  You can see exactly how it works, contribute improvements, or even run your own version. The code
                  lives on{" "}
                  <a
                    href="https://github.com/yourusername/lumowrite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    GitHub
                  </a>
                  .
                </p>
                <p>
                  If you find this helpful, consider starring the repository or sharing it with other writers who might
                  need a quiet space to think.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Get in touch</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>
                  Questions? Ideas? Just want to say hi? You can reach me at{" "}
                  <Link
                    href="https://einar.blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    einar.blog
                  </Link>
                </p>
                <p>I'd love to hear how you're using Lumowrite and what it means to you.</p>
              </div>
            </section>

            {/* Let's begin */}
            <section className="mb-12 text-center">
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p className="font-medium text-xl">Ready to begin?</p>
                <p>Your thoughts are waiting.</p>
              </div>
              <div className="mt-8">
                <Link href="/">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                    Start Writing
                  </Button>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  )
}
