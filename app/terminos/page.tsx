import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Terms and Conditions
            </h1>
            <p className="text-body-large text-slate mb-4">
              Last updated: September 1, 2026
            </p>
            <p className="text-body text-slate">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-slate max-w-none space-y-12 text-body text-slate">
            
            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing and using the WeLens website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use our services.
              </p>
              <p>
                We reserve the right to modify these terms at any time. Changes will take effect immediately upon posting on the website. Your continued use of the services after changes are posted constitutes acceptance of the modified terms.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                2. Description of Service
              </h2>
              <p className="mb-4">
                WeLens offers customized adhesive lenses with prescription that adhere to existing eyewear. Our services include:
              </p>
              <ul className="space-y-2 ml-6 mb-4">
                <li>• Online configurator for customizing prescription</li>
                <li>• Manufacturing and shipping of personalized lenses</li>
                <li>• WeLens Pro membership with exclusive benefits</li>
                <li>• Technical support and customer service</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                3. User Registration and Account
              </h2>
              <p className="mb-4">
                To place orders, you must create an account by providing accurate and complete information. You are responsible for:
              </p>
              <ul className="space-y-2 ml-6 mb-4">
                <li>• Maintaining the confidentiality of your password</li>
                <li>• All activities that occur under your account</li>
                <li>• Notifying us immediately of any unauthorized use</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                4. Orders and Payments
              </h2>
              <p className="mb-4">
                <strong className="text-ink">4.1. Order Process:</strong> When you place an order, you will receive a confirmation email. Order acceptance occurs when we send the shipping confirmation.
              </p>
              <p className="mb-4">
                <strong className="text-ink">4.2. Prices:</strong> All prices are in US dollars ($) and include applicable sales tax where required. We reserve the right to modify prices without prior notice, but changes will not affect confirmed orders.
              </p>
              <p className="mb-4">
                <strong className="text-ink">4.3. Payment:</strong> We accept credit/debit cards and PayPal. Payment is processed securely through PCI-DSS certified providers.
              </p>
              <p>
                <strong className="text-ink">4.4. Prescription:</strong> You are responsible for providing accurate and up-to-date prescription information. We are not responsible for errors in prescription information provided by the user.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                5. Shipping and Delivery
              </h2>
              <p className="mb-4">
                <strong className="text-ink">5.1. Timeframes:</strong> Standard shipping 1-3 weeks. WeLens Pro 1 week. Timeframes are estimates and not guaranteed.
              </p>
              <p className="mb-4">
                <strong className="text-ink">5.2. Costs:</strong> WeLens Pro includes free shipping on all orders.
              </p>
              <p>
                <strong className="text-ink">5.3. Responsibility:</strong> Once the order is delivered to the shipping company, they assume responsibility. You must inspect the package at the time of delivery.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                6. Returns and Refunds
              </h2>
              <p className="mb-4">
                <strong className="text-ink">6.1. Right of Return:</strong> You have 30 days from receipt to return the product without explanation. The product must be in its original condition.
              </p>
              <p className="mb-4">
                <strong className="text-ink">6.2. Process:</strong> Contact support@welens.com to initiate a return. We will provide instructions and a return label.
              </p>
              <p className="mb-4">
                <strong className="text-ink">6.3. Refund:</strong> We will process the refund within 14 days of receiving the return, using the original payment method.
              </p>
              <p>
                <strong className="text-ink">6.4. Exceptions:</strong> Returns are not accepted for products damaged by misuse or customized products if the error was the user's.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                7. Warranty
              </h2>
              <p className="mb-4">
                All products have a 1-year warranty (2 years for WeLens Pro) against manufacturing defects. The warranty does not cover normal wear, misuse, or accidental damage.
              </p>
              <p>
                See the complete warranty policy at /garantia
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                8. WeLens Pro Membership
              </h2>
              <p className="mb-4">
                <strong className="text-ink">8.1. Subscription:</strong> WeLens Pro is a recurring monthly or annual subscription.
              </p>
              <p className="mb-4">
                <strong className="text-ink">8.2. Renewal:</strong> Automatically renews until canceled. We will notify you 7 days before each charge.
              </p>
              <p className="mb-4">
                <strong className="text-ink">8.3. Cancellation:</strong> You can cancel at any time from your control panel. Cancellation will be effective at the end of the current billing period.
              </p>
              <p>
                <strong className="text-ink">8.4. Refunds:</strong> No prorated refunds are provided for early cancellation.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                9. Intellectual Property
              </h2>
              <p className="mb-4">
                All website content (text, images, logos, designs) is the property of WeLens Technologies Inc. and is protected by intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                10. Limitation of Liability
              </h2>
              <p className="mb-4">
                WeLens shall not be liable for indirect, incidental, or consequential damages arising from the use of our products or services.
              </p>
              <p className="mb-4">
                Our maximum liability is limited to the amount paid for the product in question.
              </p>
              <p>
                We do not guarantee that our products are suitable for all eyewear frames or all visual conditions.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                11. Applicable Law and Jurisdiction
              </h2>
              <p className="mb-4">
                These terms are governed by the laws of the State of California and the federal laws of the United States.
              </p>
              <p>
                For the resolution of any dispute, the parties submit to the exclusive jurisdiction of the state and federal courts located in San Francisco County, California.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                12. Contact
              </h2>
              <p>
                For any questions about these terms:
                <br />
                Email: <a href="mailto:legal@welens.com" className="text-pricing-blue hover:text-pricing-blue/80 underline">legal@welens.com</a>
                <br />
                Phone: +1 809 504 2837
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
