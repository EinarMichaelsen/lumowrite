import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="p-2">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold mb-3">Introduction</h2>
            <p>
              Welcome to Lumowrite. We respect your privacy and are committed to protecting your personal data.
              This privacy policy explains how we handle your data when you use our application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data We Collect</h2>
            <p>Our approach to data is simple: we collect as little as possible.</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Your writings:</strong> All text you write in the application is stored exclusively in your
                browser's local storage. This means your writings never leave your device unless you explicitly choose
                to share them.
              </li>
              <li>
                <strong>Usage analytics:</strong> We collect anonymous usage data such as page views and feature usage
                to help us improve the application. This data cannot be used to identify you personally.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Your Data</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Local storage:</strong> Your writings are stored in your browser's local storage solely to
                provide the functionality of the application - allowing you to return to your writings later.
              </li>
              <li>
                <strong>AI processing:</strong> When you choose to reflect on your writing with AI, your text is sent to
                OpenAI's API. This transmission is necessary to generate the AI response. We do not store your writings
                on our servers during this process.
              </li>
              <li>
                <strong>ChatGPT option:</strong> If you choose to use the ChatGPT option, your writing will be sent
                directly to OpenAI according to their privacy policy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Storage and Security</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Local storage only:</strong> Your writings are stored exclusively in your browser's local
                storage and are not transmitted to or stored on our servers.
              </li>
              <li>
                <strong>No accounts:</strong> We don't require accounts or collect personal information, so there's no
                risk of personal data breaches.
              </li>
              <li>
                <strong>Browser limitations:</strong> Please note that clearing your browser data/cache will erase your
                writings, as they are only stored locally.
              </li>
              <li>
                <strong>No cross-device sync:</strong> Since data is stored locally, your writings won't sync between
                different devices or browsers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>OpenAI API:</strong> When you use the AI reflection feature, your writing is sent to OpenAI's
                API. Please refer to{" "}
                <a
                  href="https://openai.com/policies/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  OpenAI's Privacy Policy
                </a>{" "}
                for information on how they handle data.
              </li>
              <li>
                <strong>Vercel Analytics:</strong> We use Vercel Analytics to collect anonymous usage data. This helps
                us understand how the application is used and improve it. This data cannot be used to identify you
                personally.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
            <p>
              Since we don't collect or store personal data on our servers, most traditional data rights (like the right
              to access or delete your data) are automatically fulfilled or not applicable. However:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>You can clear your local storage at any time through your browser settings.</li>
              <li>You can export your writings using the export feature before clearing your browser data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new
              privacy policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Me</h2>
            <p>
              If you have any questions about this privacy policy, please contact me at{" "}
              <a href="https://einar.blog" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                einar.blog
              </a>
            </p>
          </section>

          <div className="pt-6 text-sm text-foreground/70">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
