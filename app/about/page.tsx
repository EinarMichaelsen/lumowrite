import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit3, Brain, Timer, Sparkles } from "lucide-react"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                About Lumowrite: Your Distraction-Free Writing Tool Online
              </h1>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Lumowrite is a free, distraction-free writing tool designed for freewriting, calm writing, and stream of
                consciousness. Experience the power of focused, mindful writing in a clean, minimalist digital space.
              </p>
            </header>

            {/* What is Lumowrite Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">What is Lumowrite?</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>
                  Lumowrite is a revolutionary <strong>distraction-free writing tool online</strong> that transforms how
                  you approach writing. Whether you&apos;re looking to <strong>freewrite</strong>, practice{" "}
                  <strong>calm writing</strong>, or engage in <strong>stream of consciousness writing</strong>, our
                  platform provides the perfect digital sanctuary for your thoughts.
                </p>
                <p>
                  Unlike traditional word processors cluttered with formatting options and distractions, Lumowrite
                  offers a <strong>minimalist writing tool</strong> that focuses solely on what matters: your words and
                  ideas. This <strong>free online writing tool</strong> is designed to help you write for clarity,
                  creativity, and personal insight.
                </p>
              </div>
            </section>

            {/* Why Freewriting Matters */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Why Freewriting and Distraction-Free Writing?</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>
                  <strong>Freewriting</strong> is a powerful technique where you write continuously without stopping to
                  edit, censor, or perfect your words. This form of <strong>mindful writing</strong> helps unlock
                  creativity, process emotions, and discover insights you never knew you had.
                </p>
                <p>
                  Research shows that <strong>distraction-free writing</strong> environments significantly improve
                  focus, creativity, and writing quality. By removing visual clutter and unnecessary features, writers
                  can enter a state of flow more easily, making <strong>writing meditation</strong> a natural part of
                  their process.
                </p>
                <p>
                  Our <strong>distraction-free writing tool online</strong> creates the ideal conditions for{" "}
                  <strong>therapeutic writing</strong>, helping users process thoughts, solve problems, and gain mental
                  clarity through the simple act of putting words on a page.
                </p>
              </div>
            </section>

            {/* Features Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Features That Support Your Writing Journey</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center mb-3">
                    <Edit3 className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Clean Writing Interface</h3>
                  </div>
                  <p className="text-foreground/80">
                    Our <strong>minimalist writing tool</strong> removes all distractions, providing a clean, calm space
                    for your thoughts. No formatting buttons, no menus – just you and your words.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center mb-3">
                    <Timer className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Built-in Writing Timer</h3>
                  </div>
                  <p className="text-foreground/80">
                    Set focused writing sessions with our integrated timer. Perfect for{" "}
                    <strong>freewriting exercises</strong> and maintaining consistent writing habits.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center mb-3">
                    <Brain className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">AI-Powered Reflection</h3>
                  </div>
                  <p className="text-foreground/80">
                    After your <strong>free write</strong> session, engage with AI to explore your thoughts deeper,
                    gaining insights and clarity from your writing.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center mb-3">
                    <Sparkles className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Privacy-First Design</h3>
                  </div>
                  <p className="text-foreground/80">
                    Your writing stays on your device. This <strong>online writing app</strong> prioritizes your privacy
                    while providing powerful writing tools.
                  </p>
                </div>
              </div>
            </section>

            {/* Who It's For */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Who Benefits from Distraction-Free Writing?</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>
                  Lumowrite serves anyone seeking a better relationship with writing and thinking. Our{" "}
                  <strong>focus writing app</strong> is perfect for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Writers and creatives</strong> looking for a <strong>creative writing tool</strong> that
                    supports flow states
                  </li>
                  <li>
                    <strong>Students and professionals</strong> who need a <strong>simple writing app</strong> for
                    brainstorming and idea development
                  </li>
                  <li>
                    <strong>Journaling enthusiasts</strong> seeking an <strong>online journaling</strong> platform that
                    feels personal and secure
                  </li>
                  <li>
                    <strong>Therapists and coaches</strong> recommending <strong>therapeutic writing</strong> exercises
                    to clients
                  </li>
                  <li>
                    <strong>Anyone</strong> wanting to practice <strong>mindful writing</strong> and{" "}
                    <strong>writing meditation</strong> for mental clarity
                  </li>
                </ul>
              </div>
            </section>

            {/* How to Use */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                How to Use Lumowrite for Effective Freewriting
              </h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Set your intention:</strong> Decide whether you want to vent, reflect, solve a problem, or
                    simply think aloud
                  </li>
                  <li>
                    <strong>Start the timer:</strong> Choose your <strong>freewriting</strong> duration (we recommend
                    10-15 minutes for beginners)
                  </li>
                  <li>
                    <strong>Write continuously:</strong> Don&apos;t stop, don&apos;t edit, don&apos;t judge – just let
                    your thoughts flow in this <strong>distraction-free writing</strong> environment
                  </li>
                  <li>
                    <strong>Reflect with AI:</strong> After writing, use our AI companion to explore your thoughts and
                    gain new insights
                  </li>
                  <li>
                    <strong>Export and save:</strong> Download your writing in various formats or continue the
                    conversation with ChatGPT
                  </li>
                </ol>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                The Science Behind Distraction-Free Writing Tools
              </h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>
                  Research in cognitive psychology demonstrates that <strong>distraction-free writing</strong>{" "}
                  environments significantly improve:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Cognitive clarity:</strong> <strong>Stream of consciousness writing</strong> helps organize
                    thoughts and reduce mental clutter
                  </li>
                  <li>
                    <strong>Emotional processing:</strong> <strong>Therapeutic writing</strong> provides a safe outlet
                    for emotions and stress
                  </li>
                  <li>
                    <strong>Creative breakthrough:</strong> <strong>Freewriting exercises</strong> bypass the inner
                    critic and unlock creative potential
                  </li>
                  <li>
                    <strong>Problem-solving:</strong> <strong>Writing for clarity</strong> helps identify solutions and
                    new perspectives
                  </li>
                  <li>
                    <strong>Mindfulness:</strong> <strong>Calm writing</strong> practices promote present-moment
                    awareness and mental well-being
                  </li>
                </ul>
              </div>
            </section>

            {/* Privacy and Security */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Privacy-First Online Writing Tool</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>
                  Unlike other <strong>online writing apps</strong>, Lumowrite prioritizes your privacy. Your writing is
                  stored locally on your device, ensuring that your personal thoughts and{" "}
                  <strong>freewriting sessions</strong> remain completely private.
                </p>
                <p>
                  This <strong>free online writing tool</strong> only sends data to our servers when you explicitly
                  choose to use the AI reflection feature, and even then, we don&apos;t store your writing permanently.
                  Your <strong>digital writing space</strong> is truly yours.
                </p>
              </div>
            </section>

            {/* Getting Started */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Start Your Distraction-Free Writing Journey</h2>
              <div className="text-foreground/90 space-y-4 text-lg leading-relaxed">
                <p>
                  Ready to experience the power of <strong>distraction-free writing</strong>? Lumowrite is completely
                  free and requires no signup. Simply visit our homepage and start your first{" "}
                  <strong>freewriting session</strong> today.
                </p>
                <p>
                  Whether you&apos;re new to <strong>freewriting</strong> or an experienced practitioner of{" "}
                  <strong>mindful writing</strong>, our <strong>minimalist writing tool</strong> adapts to your needs
                  and supports your unique writing journey.
                </p>
              </div>
              <div className="text-center mt-8">
                <Link href="/">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                    Start Writing Now - It&apos;s Free
                  </Button>
                </Link>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    What makes Lumowrite different from other online writing tools?
                  </h3>
                  <p className="text-foreground/80">
                    Lumowrite is specifically designed for <strong>freewriting</strong> and{" "}
                    <strong>distraction-free writing</strong>. Unlike traditional word processors, we focus on the
                    writing experience itself, removing all distractions and providing AI-powered reflection tools.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Is Lumowrite really free?</h3>
                  <p className="text-foreground/80">
                    Yes! Lumowrite is completely free to use. Our <strong>distraction-free writing tool online</strong>{" "}
                    requires no subscription, no signup, and no hidden fees.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    How does freewriting help with creativity and mental clarity?
                  </h3>
                  <p className="text-foreground/80">
                    <strong>Freewriting</strong> bypasses your inner critic and allows thoughts to flow naturally. This{" "}
                    <strong>stream of consciousness writing</strong> technique helps unlock creativity, process
                    emotions, and discover insights that structured writing might miss.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Can I use Lumowrite on mobile devices?</h3>
                  <p className="text-foreground/80">
                    Our <strong>online writing app</strong> works seamlessly across all devices, providing the same{" "}
                    <strong>distraction-free writing</strong> experience whether you&apos;re on desktop, tablet, or
                    mobile.
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>

        {/* Footer CTA */}
        <div className="bg-primary/5 border-t border-border/10">
          <div className="max-w-4xl mx-auto p-4 md:p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to Transform Your Writing Practice?</h2>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Join thousands of writers who have discovered the power of <strong>distraction-free writing</strong> with
              Lumowrite. Start your <strong>freewriting journey</strong> today.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                Start Your Free Writing Session
              </Button>
            </Link>
          </div>
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
