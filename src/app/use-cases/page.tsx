import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Code, Mail, Database, Shield, Image, Globe, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Base64 Use Cases & Applications - When and Why to Use Base64',
  description: 'Discover practical applications of Base64 encoding: email attachments, data URLs, API tokens, web development, and more. Learn when and why to use Base64.',
  keywords: ['base64 applications', 'base64 use cases', 'when to use base64', 'base64 examples'],
}

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-8 md:py-16 px-4 max-w-4xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Converter
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight">
            Base64 Use Cases & Applications
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover when and why Base64 encoding is essential in modern web development and data processing.
          </p>
        </div>

        {/* What is Base64 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">?</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">What is Base64?</h2>
          </div>
          <div className="card-primary rounded-2xl p-8 space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
                It uses 64 characters (A-Z, a-z, 0-9, +, /) to encode data, making it safe for transmission
                over text-based protocols.
              </p>
            </div>
            <div className="card-accent rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Key Characteristics</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-muted-foreground">Converts binary data to text format</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-muted-foreground">Increases data size by approximately 33%</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-muted-foreground">Safe for text-based transmission protocols</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-muted-foreground">Reversible encoding (can be decoded back to original)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Email Attachments */}
            <div className="surface rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-foreground">Email Attachments</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Email protocols like SMTP only support text. Base64 encoding allows binary files
                to be embedded in email messages.
              </p>
              <div className="bg-muted rounded-lg p-3">
                <code className="text-sm">Content-Transfer-Encoding: base64</code>
              </div>
            </div>

            {/* Data URLs */}
            <div className="surface rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-foreground">Data URLs</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Embed images, fonts, or other files directly in HTML/CSS using data URLs
                to reduce HTTP requests.
              </p>
              <div className="bg-muted rounded-lg p-3">
                <code className="text-sm">data:image/png;base64,iVBORw0KGgoA...</code>
              </div>
            </div>

            {/* API Tokens */}
            <div className="surface rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-foreground">API Authentication</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Encode credentials for HTTP Basic Authentication and API tokens
                for secure transmission.
              </p>
              <div className="bg-muted rounded-lg p-3">
                <code className="text-sm">Authorization: Basic dXNlcjpwYXNz</code>
              </div>
            </div>

            {/* Web Development */}
            <div className="surface rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-foreground">Web Development</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Store binary data in JSON, embed resources in single-file applications,
                and handle file uploads.
              </p>
              <div className="bg-muted rounded-lg p-3">
                <code className="text-sm">{"{ \"file\": \"SGVsbG8gV29ybGQ=\" }"}</code>
              </div>
            </div>

            {/* Database Storage */}
            <div className="surface rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-foreground">Database Storage</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Store binary data in text-based database fields or when binary
                storage is not available.
              </p>
              <div className="bg-muted rounded-lg p-3">
                <code className="text-sm">INSERT INTO files (data) VALUES (&apos;SGVsbG8=&apos;)</code>
              </div>
            </div>

            {/* Configuration Files */}
            <div className="surface rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-foreground">Configuration Files</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Embed certificates, keys, or binary configuration data in
                text-based config files (YAML, JSON, XML).
              </p>
              <div className="bg-muted rounded-lg p-3">
                <code className="text-sm">certificate: LS0tLS1CRUdJTi...</code>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Developer-Specific Applications</h2>
          <div className="space-y-6">

            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">Frontend Development</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Image Optimization</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Inline small images to reduce HTTP requests</li>
                    <li>• Embed icons and logos in CSS</li>
                    <li>• Create single-file HTML applications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">File Handling</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Process file uploads in JavaScript</li>
                    <li>• Preview files before upload</li>
                    <li>• Store files in localStorage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">Backend Development</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">API Development</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Encode binary data in JSON responses</li>
                    <li>• Handle file uploads via REST APIs</li>
                    <li>• Implement authentication tokens</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Data Processing</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Store binary data in text databases</li>
                    <li>• Export/import binary data</li>
                    <li>• Cross-platform data exchange</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Considerations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Security Considerations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="surface rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-medium mb-4 text-foreground">✅ Best Practices</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Base64 is encoding, not encryption</li>
                <li>• Use HTTPS for sensitive data transmission</li>
                <li>• Validate decoded data before processing</li>
                <li>• Consider data size increase (~33%)</li>
                <li>• Use URL-safe Base64 for URLs</li>
              </ul>
            </div>

            <div className="surface rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-medium mb-4 text-foreground">⚠️ Security Notes</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Base64 is easily reversible</li>
                <li>• Don't use for password storage</li>
                <li>• Not suitable for sensitive data hiding</li>
                <li>• Always encrypt sensitive data first</li>
                <li>• Validate input to prevent injection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Practical Examples</h2>
          <div className="space-y-6">

            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">JavaScript File Upload</h3>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm text-foreground overflow-x-auto">
                  {`// Convert file to Base64 for upload
const fileToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(&apos;,&apos;)[1]);
    reader.readAsDataURL(file);
  });
};

// Usage
const base64Data = await fileToBase64(selectedFile);`}
                </pre>
              </div>
            </div>

            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">CSS Data URL</h3>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm text-foreground overflow-x-auto">
                  {`/* Embed small icon in CSS */
.icon-home {
  background-image: url(&apos;data:image/svg+xml;base64,PHN2Zy...&apos;);
  width: 24px;
  height: 24px;
}

/* Inline font for faster loading */
@font-face {
  font-family: &apos;CustomFont&apos;;
  src: url(&apos;data:font/woff2;base64,d09GMgABA...&apos;) format(&apos;woff2&apos;);
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Link
            href="/how-to-use"
            className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            How to Use
          </Link>
          <Link
            href="/faq"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Read FAQ
          </Link>
        </div>
      </div>
    </div>
  )
}
