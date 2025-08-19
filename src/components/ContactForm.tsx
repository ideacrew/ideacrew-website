import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  return (
    <form
      className="space-y-6"
      name="contact-form"
      action="/thank-you"
      netlify-honeypot="website-name"
      netlify
      {...({} as any)}
    >
      <input
        type="hidden"
        name="subject"
        value="Contact Form Submission (%{submissionId})"
      />

      <div className="input-group stanky">
        <Label htmlFor="website-name">What is your website name?</Label>
        <Input type="text" name="website-name" id="website-name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-name">Your Name</Label>
        <Input
          id="contact-name"
          name="contact-name"
          placeholder="John Smith"
          required
          type="text"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Your Email</Label>
        <Input
          id="contact-email"
          name="contact-email"
          type="email"
          inputMode="email"
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-company">Your Company</Label>
        <Input
          id="contact-company"
          name="contact-company"
          placeholder="Company Name"
          type="text"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">
          Let us know what you're looking for and how we can help
        </Label>
        <Textarea
          id="contact-message"
          name="contact-message"
          placeholder="Type your message here..."
          rows={6}
          required
        />
      </div>

      <Button type="submit">Send Message</Button>
    </form>
  );
}
