"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import Link from "next/link"

export function HelpDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/70 hover:text-foreground">
          <HelpCircle className="h-4 w-4" />
          <span className="sr-only">Help</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto text-sm">
        <DialogDescription className="sr-only">Information about how to use this writing application</DialogDescription>

        <div className="space-y-4 py-3 text-foreground">
          <p className="text-base font-medium">
            This is your space to think things through. without pressure or perfection.
          </p>

          <p>
            We all carry thoughts that need somewhere to go. Writing them out is one of the simplest ways to make sense
            of them.
          </p>

          <p className="font-medium">
            This is not a notetaking app, but an app for writing out your ideas and thoughts.
          </p>

          <div className="space-y-2">
            <h3 className="text-base font-medium">How it works</h3>
            <p>
              start by setting the timer and just write freely. dont focus on grammar or structure. just about getting
              your thoughts out of your head and onto the page.
            </p>
            <p>There's no right way to do it. You can:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Dump your thoughts</li>
              <li>Talk through a decision</li>
              <li>Vent, reflect, or wander through your mind</li>
            </ul>
            <p className="font-medium">No backspace. No editing. Just flow.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-medium">Then we talk</h3>
            <p>Once you've written, you can reflect on your thoughts in two ways:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>
                <strong>In-app reflection:</strong> Our built-in AI helps you explore what's underneath
              </li>
              <li>
                <strong>ChatGPT:</strong> Send your writing to ChatGPT if you prefer using your own account
              </li>
            </ul>
            <p>The AI might:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Reflect on what you wrote</li>
              <li>Ask questions to help you see things more clearly</li>
              <li>Offer suggestions or frameworks to move forward</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-medium">Tips to get started</h3>
            <p>If you're not sure what to write, start with a simple question:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>What's on my mind right now?</li>
              <li>What's something I'm grateful for today?</li>
              <li>What do I wish I could say out loud?</li>
              <li>What's feeling heavy. or light?</li>
              <li>If I were being honest with myself, I'd say…</li>
            </ul>
            <p>Still stuck? Just start with "I don't know what to write…" and go from there.</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium">This is your space.</p>
            <p>Let it be messy, honest, quiet, surprising, fun. whatever you need it to be.</p>
            <p className="font-medium">Let's begin.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-medium">Your data & privacy</h3>
            <p>Your writings are stored only on your device:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>All your writings are saved in your browser's local storage</li>
              <li>Nothing is sent to or stored on any server</li>
              <li>Your data stays on your device only</li>
              <li>Writings persist between sessions but are limited to this browser</li>
              <li>If you clear your browser data/cache, your writings will be lost</li>
              <li>
                The only way to save your data is to export the yap when doing a reflection (or copy it and paste it
                into your preferred medium)
              </li>
              <li>
                If you use the ChatGPT option, your writing will be sent to OpenAI according to their privacy policy
              </li>
            </ul>
            <p className="text-xs text-foreground/70 mt-1.5">
              This approach prioritizes your privacy, but means your writings won't sync between different devices or
              browsers.
            </p>
            <p className="text-xs mt-1.5">
              <Link href="/privacy" className="text-primary underline" onClick={() => setOpen(false)}>
                Read our full privacy policy
              </Link>
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-medium">Contact me</h3>
            <p>
              If you have questions or need to get in touch with me, contact me at{" "}
              <Link
                href="https://einar.blog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                einar.blog
              </Link>
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-medium">Learn more</h3>
            <p>
              Read more about this app here:{" "}
              <Link
                href="https://lumowrite.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                about Lumowrite
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
