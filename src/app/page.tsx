import { Calendar, Pill, Shield, ShoppingBag, User, ShoppingCart, CheckCircle, Star, Users, Clock, Award, Heart, Phone, Mail, MapPin, ArrowRight, Play, Smartphone, Lock, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    title: "Appointments",
    description: "Schedule and manage your medical appointments with ease",
    icon: Calendar,
    href: "/appointments/create",
    color: "bg-blue-500",
    features: ["Online booking", "Reminders", "Rescheduling"]
  },
  {
    title: "Medications",
    description: "Track prescriptions and never miss a dose",
    icon: Pill,
    href: "/dashboard",
    color: "bg-green-500",
    features: ["Dose reminders", "Refill alerts", "Drug interactions"]
  },
  {
    title: "Vaccinations",
    description: "Keep your immunization records up to date",
    icon: Shield,
    href: "/dashboard",
    color: "bg-purple-500",
    features: ["Digital records", "Due date alerts", "Travel vaccines"]
  },
  {
    title: "Medical Products",
    description: "Browse and order medical supplies and equipment",
    icon: ShoppingBag,
    href: "/products",
    color: "bg-orange-500",
    features: ["Fast delivery", "Quality assured", "Bulk discounts"]
  }
]

const features = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Access your health information anywhere, anytime with our responsive platform."
  },
  {
    icon: Lock,
    title: "HIPAA Compliant",
    description: "Your medical data is protected with enterprise-grade security and encryption."
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Get instant notifications for appointments, medications, and health reminders."
  },
  {
    icon: Users,
    title: "Family Management",
    description: "Manage health records for your entire family from a single dashboard."
  }
]

const stats = [
  { number: "50K+", label: "Active Users", icon: Users },
  { number: "1M+", label: "Appointments Booked", icon: Calendar },
  { number: "99.9%", label: "Uptime", icon: CheckCircle },
  { number: "24/7", label: "Support Available", icon: Clock }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    image: "/placeholder.jpg?height=60&width=60",
    content: "Techmed has revolutionized how I manage my family's health. The medication reminders alone have been a game-changer.",
    rating: 5
  },
  {
    name: "Dr. Michael Chen",
    role: "Techmedvider",
    image: "/placeholder.jpg?height=60&width=60",
    content: "I recommend Techmed to all my patients. It helps them stay organized and compliant with their treatment plans.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Caregiver",
    image: "/placeholder.jpg?height=60&width=60",
    content: "Managing my elderly parent's medications and appointments has never been easier. The interface is intuitive and reliable.",
    rating: 5
  }
]

const howItWorks = [
  {
    step: "1",
    title: "Create Your Profile",
    description: "Sign up and securely add your medical information, insurance details, and preferences."
  },
  {
    step: "2",
    title: "Connect Your Care",
    description: "Link your Techmedviders, add medications, and schedule appointments."
  },
  {
    step: "3",
    title: "Stay Organized",
    description: "Receive reminders, track your health journey, and access everything in one place."
  }
]

const faqs = [
  {
    question: "Is my medical information secure?",
    answer: "Yes, we use enterprise-grade encryption and are fully HIPAA compliant to protect your sensitive health data."
  },
  {
    question: "Can I manage multiple family members?",
    answer: "You can add and manage health records for your entire family from a single account."
  },
  {
    question: "Do you integrate with my doctor's office?",
    answer: "We work with most major healthcare systems and can sync appointment data with participating providers."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Our platform is fully responsive and works seamlessly on all devices. A dedicated mobile app is coming soon."
  }
]

export default function HomePage() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 lg:py-32 overflow-hidden'>
        <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='text-center lg:text-left'>
              <Badge className='mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100'>🎉 Now serving 50,000+ patients nationwide</Badge>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
                Your Complete
                <span className='text-blue-600 block'>Techmed</span>
              </h1>
              <p className='text-xl text-gray-600 mb-8 max-w-2xl'>Streamline your healthcare journey with our comprehensive platform. Manage medications, book appointments, track vaccinations, and shop medical supplies—all in one secure place.</p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8'>
                <Link href='/auth/register'>
                  <Button size='lg' className='text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700'>
                    Start Free Today
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Button>
                </Link>
                <Button size='lg' variant='outline' className='text-lg px-8 py-4 bg-transparent border-gray-300'>
                  <Play className='mr-2 h-5 w-5' />
                  Watch Demo
                </Button>
              </div>
              <div className='flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500'>
                <div className='flex items-center'>
                  <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
                  HIPAA Compliant
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
                  Free to Start
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
                  24/7 Support
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='relative z-10'>
                <img src='/placeholder.jpg?height=600&width=500' alt='Healthcare Dashboard' className='w-full max-w-lg mx-auto rounded-2xl shadow-2xl' />
              </div>
              <div className='absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'></div>
              <div className='absolute -bottom-8 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className='text-center'>
                  <div className='inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4'>
                    <Icon className='h-6 w-6 text-blue-600' />
                  </div>
                  <div className='text-3xl font-bold text-gray-900 mb-2'>{stat.number}</div>
                  <div className='text-gray-600'>{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id='features' className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <Badge className='mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100'>Core Features</Badge>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Everything You Need for Better Health Management</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>Our comprehensive platform brings together all aspects of your healthcare journey in one intuitive interface.</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Link key={index} href={service.href}>
                  <Card className='h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-white'>
                    <CardHeader className='text-center pb-4'>
                      <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className='h-8 w-8 text-white' />
                      </div>
                      <CardTitle className='text-xl mb-2'>{service.title}</CardTitle>
                      <CardDescription className='text-gray-600 text-base'>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <ul className='space-y-2 mb-4'>
                        {service.features.map((feature, idx) => (
                          <li key={idx} className='flex items-center text-sm text-gray-600'>
                            <CheckCircle className='h-4 w-4 text-green-500 mr-2 flex-shrink-0' />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button variant='ghost' className='w-full justify-center p-0 h-auto font-medium text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-transform'>
                        Learn more <ArrowRight className='ml-2 h-4 w-4' />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div>
              <Badge className='mb-4 bg-green-100 text-green-700 hover:bg-green-100'>Why Choose Us</Badge>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>Built for Modern Healthcare Needs</h2>
              <p className='text-lg text-gray-600 mb-8'>We understand that managing your health shouldn't be complicated. That's why we've built a platform that puts you in control with cutting-edge features and uncompromising security.</p>
              <div className='space-y-6'>
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className='flex items-start space-x-4'>
                      <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <Icon className='h-6 w-6 text-blue-600' />
                      </div>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>{feature.title}</h3>
                        <p className='text-gray-600'>{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='relative'>
              <img src='/placeholder.jpg?height=500&width=600' alt='Healthcare Features' className='w-full rounded-2xl shadow-xl' />
              <div className='absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-2xl flex items-center justify-center'>
                <Award className='h-16 w-16 text-white' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id='how-it-works' className='py-20 bg-gradient-to-br from-blue-50 to-indigo-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <Badge className='mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100'>Simple Process</Badge>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Get Started in 3 Easy Steps</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>Join thousands of patients who have simplified their healthcare management with our platform.</p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {howItWorks.map((step, index) => (
              <div key={index} className='text-center relative'>
                <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6'>{step.step}</div>
                <h3 className='text-xl font-semibold text-gray-900 mb-4'>{step.title}</h3>
                <p className='text-gray-600'>{step.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className='hidden md:block absolute top-8 left-full w-full'>
                    <ArrowRight className='h-6 w-6 text-blue-300 mx-auto' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id='testimonials' className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <Badge className='mb-4 bg-yellow-100 text-yellow-700 hover:bg-yellow-100'>Testimonials</Badge>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Trusted by Patients and Providers</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>See what our users have to say about their experience with Techmed.</p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <Card key={index} className='border-0 shadow-lg'>
                <CardContent className='p-6'>
                  <div className='flex items-center mb-4'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className='h-5 w-5 text-yellow-400 fill-current' />
                    ))}
                  </div>
                  <p className='text-gray-600 mb-6 italic'>"{testimonial.content}"</p>
                  <div className='flex items-center'>
                    <img src={testimonial.image || "/placeholder.jpg"} alt={testimonial.name} className='w-12 h-12 rounded-full mr-4' />
                    <div>
                      <div className='font-semibold text-gray-900'>{testimonial.name}</div>
                      <div className='text-sm text-gray-600'>{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <Badge className='mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100'>FAQ</Badge>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Frequently Asked Questions</h2>
            <p className='text-xl text-gray-600'>Get answers to common questions about our platform and services.</p>
          </div>

          <div className='space-y-6'>
            {faqs.map((faq, index) => (
              <Card key={index} className='border-0 shadow-sm'>
                <CardContent className='p-6'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-3'>{faq.question}</h3>
                  <p className='text-gray-600'>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-r from-blue-600 to-indigo-600'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Ready to Take Control of Your Health?</h2>
          <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>Join thousands of patients who have simplified their healthcare management. Start your free account today and experience the difference.</p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/auth/register'>
              <Button size='lg' className='text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100'>
                Get Started Free
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </Link>
            <Link href='/dashboard'>
              <Button size='lg' variant='outline' className='text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent'>
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
