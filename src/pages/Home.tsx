import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Award, Shield } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Award className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">EForge Quiz</h1>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Digital Competency Assessment Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Test and certify your digital skills through our comprehensive
            3-step progressive evaluation system. From A1 to C2 levels, achieve
            your digital competency certification today.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Start Assessment
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="px-8 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Assessment Flow */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            3-Step Assessment Process
          </h3>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <Card className="text-center h-full">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle>Step 1: Foundation</CardTitle>
                <CardDescription>Levels A1 & A2</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{"<25%"}</span>
                    <Badge variant="destructive">Fail</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>25-49.99%</span>
                    <Badge variant="secondary">A1 Certified</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>50-74.99%</span>
                    <Badge variant="secondary">A2 Certified</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>≥75%</span>
                    <Badge className="bg-green-500">A2 + Next Step</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center h-full">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <CardTitle>Step 2: Intermediate</CardTitle>
                <CardDescription>Levels B1 & B2</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{"<25%"}</span>
                    <Badge variant="outline">Remain A2</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>25-49.99%</span>
                    <Badge variant="secondary">B1 Certified</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>50-74.99%</span>
                    <Badge variant="secondary">B2 Certified</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>≥75%</span>
                    <Badge className="bg-green-500">B2 + Next Step</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center h-full">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <CardTitle>Step 3: Advanced</CardTitle>
                <CardDescription>Levels C1 & C2</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{"<25%"}</span>
                    <Badge variant="outline">Remain B2</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>25-49.99%</span>
                    <Badge variant="secondary">C1 Certified</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>≥50%</span>
                    <Badge className="bg-purple-500">C2 Certified</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Platform Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            <div className="text-center h-full flex flex-col items-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Timed Assessments</h4>
              <p className="text-gray-600">
                Countdown timers with auto-submit functionality
              </p>
            </div>
            <div className="text-center h-full flex flex-col items-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Secure Environment</h4>
              <p className="text-gray-600">
                Safe exam browser integration and monitoring
              </p>
            </div>
            <div className="text-center h-full flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Instant Results</h4>
              <p className="text-gray-600">
                Immediate scoring and certification
              </p>
            </div>
            <div className="text-center h-full flex flex-col items-center">
              <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">
                Digital Certificates
              </h4>
              <p className="text-gray-600">Downloadable PDF certificates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-6 w-6" />
                <span className="text-lg font-bold">EForge Quiz</span>
              </div>
              <p className="text-gray-400">
                Professional digital competency assessment platform for modern
                learners.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Assessment</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Digital Skills Test</li>
                <li>Certification Levels</li>
                <li>Progress Tracking</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Technical Support</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EForge Quiz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
