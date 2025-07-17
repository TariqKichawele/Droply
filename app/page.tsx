import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import {
  CloudUpload,
  Shield,
  Folder,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import CloudStorageIllustration from "@/components/CloudStorageIllustration";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-default-50">
      {/* Use the unified Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div>
                  <h1 className="font-heading text-default-900 leading-tight mb-4">
                    Store your <span className="text-primary">images</span> with
                    ease
                  </h1>
                  <p className="text-body-large text-default-600 mb-4">
                    Simple. Secure. Fast.
                  </p>
                  <p className="text-body text-default-600 leading-relaxed mb-4">
                    Droply is your personal cloud storage solution for images. Upload, organize, and access your photos from anywhere with military-grade encryption. Perfect for photographers, designers, and anyone who values their digital memories.
                  </p>
                  
        
                </div>

                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button 
                        size="lg" 
                        variant="solid" 
                        color="primary"
                        className="px-8 py-3"
                      >
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button 
                        size="lg" 
                        variant="bordered" 
                        color="primary"
                        className="px-8 py-3 border-2"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        variant="bordered"
                        color="primary"
                        endContent={<ArrowRight className="h-4 w-4" />}
                        className="px-8 py-3 border-2 border-primary"
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>

              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <CloudStorageIllustration />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-default-50">
          <div className="container mx-auto">
                         <div className="text-center mb-8 md:mb-12">
               <h2 className="font-heading text-default-900 mb-4">
                 What You Get
               </h2>
             </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-6 text-center">
                  <CloudUpload className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-heading text-default-900 mb-2">
                    Quick Uploads
                  </h3>
                  <p className="text-body text-default-600 mb-3">Drag, drop, done.</p>
                  <p className="text-body-small text-default-500 leading-relaxed">
                    Upload images instantly with our intuitive drag-and-drop interface. Supports JPG, PNG, GIF, and WebP formats up to 5MB.
                  </p>
                </CardBody>
              </Card>

              <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-6 text-center">
                  <Folder className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-heading text-default-900 mb-2">
                    Smart Organization
                  </h3>
                  <p className="text-body text-default-600 mb-3">
                    Keep it tidy, find it fast.
                  </p>
                  <p className="text-body-small text-default-500 leading-relaxed">
                    Create custom folders, star your favorites, and manage your files with ease. Everything organized the way you want it.
                  </p>
                </CardBody>
              </Card>

              <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1 mx-auto sm:mx-0 max-w-md sm:max-w-full">
                <CardBody className="p-6 text-center">
                  <Shield className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-heading text-default-900 mb-2">
                    Locked Down
                  </h3>
                  <p className="text-body text-default-600 mb-3">
                    Your images, your eyes only.
                  </p>
                  <p className="text-body-small text-default-500 leading-relaxed">
                    Military-grade encryption keeps your photos private and secure. Only you can access your images with your personal account.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-default-50">
          <div className="container mx-auto text-center">
                         <h2 className="font-heading text-default-900 mb-4">
               Ready?
             </h2>
            <SignedOut>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="solid"
                    color="primary"
                    endContent={<ArrowRight className="h-4 w-4" />}
                    className="px-8 py-3"
                  >
                    Let&apos;s Go
                  </Button>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="bordered"
                  color="primary"
                  endContent={<ArrowRight className="h-4 w-4" />}
                  className="px-8 py-3 border-2 border-primary"
                >
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Simple footer */}
      <footer className="bg-default-50 border-t border-default-200 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-primary" />
                                      <h2 className="text-lg font-heading font-bold">Droply</h2>
            </div>
                          <p className="text-body-small text-default-500">
              &copy; {new Date().getFullYear()} Droply
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
